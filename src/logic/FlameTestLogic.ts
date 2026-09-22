import * as THREE from 'three';

export class FlameTestLogic {
    private scene: THREE.Scene;
    private wireGroup: THREE.Group | null = null;
    private bunsenBurner: THREE.Group | null = null;
    private chemicalSamples: any[] = [];
    
    // State
    private currentChemical: number | null = null;
    private defaultFlameColor = 0x4488ff;
    private burnTimer = 0;
    private isBurning = false;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        // Delay finding references slightly to ensure scene is built
        setTimeout(() => this.findReferences(), 100);
    }

    private findReferences() {
        this.scene.traverse((child) => {
            if (child.name === 'PlatinumWire') this.wireGroup = child as THREE.Group;
            if (child.userData?.flameMesh) this.bunsenBurner = child as THREE.Group;
            if (child.userData?.saltSamples) this.chemicalSamples = child.userData.saltSamples;
        });
    }

    public update(delta: number) {
        if (!this.wireGroup || !this.bunsenBurner) return;

        // Get world position of the wire loop tip
        const loopLocalPos = new THREE.Vector3(0.105, 0, 0);
        const loopWorldPos = loopLocalPos.applyMatrix4(this.wireGroup.matrixWorld);

        // 1. Check dipping collision
        if (!this.currentChemical && !this.isBurning) {
            for (const sample of this.chemicalSamples) {
                const saltPos = new THREE.Vector3();
                sample.mesh.getWorldPosition(saltPos);
                
                // If tip is within 5cm of the salt mesh center
                if (loopWorldPos.distanceTo(saltPos) < 0.05) {
                    this.currentChemical = sample.color;
                    
                    // Visually change the wire loop mesh color to show it picked up powder
                    this.wireGroup.children.forEach(c => {
                        if (c instanceof THREE.Mesh && c.geometry.type === 'TorusGeometry') {
                            (c.material as THREE.MeshStandardMaterial).color.setHex(sample.color);
                        }
                    });
                    break;
                }
            }
        }

        // 2. Check heating collision
        const flamePos = new THREE.Vector3();
        this.bunsenBurner.userData.flameMesh.getWorldPosition(flamePos);

        const flameMesh = this.bunsenBurner.userData.flameMesh as THREE.Mesh;
        const flameLight = this.bunsenBurner.userData.flameLight as THREE.PointLight;
        const flameMat = flameMesh.material as THREE.MeshBasicMaterial;

        // If tip is in the flame (distance < 10cm)
        if (loopWorldPos.distanceTo(flamePos) < 0.1) {
            if (this.currentChemical && !this.isBurning) {
                this.isBurning = true;
                this.burnTimer = 3.0; // Burn for 3 seconds
            }
        }

        // 3. Process Burning state
        if (this.isBurning && this.currentChemical) {
            this.burnTimer -= delta;

            // Lerp flame color to chemical color
            const targetColor = new THREE.Color(this.currentChemical);
            flameMat.color.lerp(targetColor, 0.1);
            flameLight.color.lerp(targetColor, 0.1);

            if (this.burnTimer <= 0) {
                this.isBurning = false;
                this.currentChemical = null;
                
                // Reset wire loop color
                this.wireGroup.children.forEach(c => {
                    if (c instanceof THREE.Mesh && c.geometry.type === 'TorusGeometry') {
                        (c.material as THREE.MeshStandardMaterial).color.setHex(0xcccccc);
                    }
                });
            }
        } else {
            // Lerp back to default blue flame
            const defaultColor = new THREE.Color(this.defaultFlameColor);
            flameMat.color.lerp(defaultColor, 0.05);
            flameLight.color.lerp(defaultColor, 0.05);
        }
    }
}
