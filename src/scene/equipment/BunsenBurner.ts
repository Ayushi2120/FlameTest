import * as THREE from 'three';
import { MaterialLibrary } from '../../materials/MaterialLibrary';

export function createBunsenBurner(materials: MaterialLibrary): THREE.Group {
    const group = new THREE.Group();

    // Base
    const baseGeo = new THREE.CylinderGeometry(0.04, 0.045, 0.02, 16);
    const base = new THREE.Mesh(baseGeo, materials.darkMetal);
    base.position.y = 0.01;
    base.castShadow = true;
    group.add(base);

    // Tube
    const tubeGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.12, 16);
    const tube = new THREE.Mesh(tubeGeo, materials.metal);
    tube.position.y = 0.08;
    tube.castShadow = true;
    group.add(tube);

    // Air collar
    const collarGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.02, 16);
    const collar = new THREE.Mesh(collarGeo, materials.metal);
    collar.position.y = 0.04;
    group.add(collar);

    // Gas inlet
    const inletGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.03);
    const inlet = new THREE.Mesh(inletGeo, materials.metal);
    inlet.rotation.z = Math.PI / 2;
    inlet.position.set(0.015, 0.03, 0);
    group.add(inlet);

    // Flame (unlit state but slightly visible for demo)
    const flameGeo = new THREE.ConeGeometry(0.015, 0.05, 16);
    const flameMat = new THREE.MeshBasicMaterial({
        color: 0x4488ff, // Default blue flame
        transparent: true,
        opacity: 0.8 // Visible for the first phase
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.165;
    flame.name = "Flame";
    
    // Add point light for flame
    const flameLight = new THREE.PointLight(0x4488ff, 0.5, 1);
    flameLight.position.y = 0.165;
    group.add(flameLight);
    group.add(flame);

    // Position on desk
    group.position.set(0, 0.875, -0.9);
    
    // Attach references to group for logic system
    group.userData.flameMesh = flame;
    group.userData.flameLight = flameLight;
    group.userData.defaultFlameColor = 0x4488ff;

    return group;
}
