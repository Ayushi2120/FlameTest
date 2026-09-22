import * as THREE from 'three';

export class MaterialLibrary {
    public glass: THREE.MeshPhysicalMaterial;
    public metal: THREE.MeshStandardMaterial;
    public plasticBase: THREE.MeshStandardMaterial;
    public darkMetal: THREE.MeshStandardMaterial;
    public wall: THREE.MeshStandardMaterial;
    public floor: THREE.MeshStandardMaterial;
    public wood: THREE.MeshStandardMaterial;
    public ceramic: THREE.MeshStandardMaterial;
    public rubber: THREE.MeshStandardMaterial;

    constructor() {
        this.glass = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.1,
            transmission: 0.9, // glass-like transparency
            thickness: 0.05,
            transparent: true,
            side: THREE.DoubleSide
        });

        this.rubber = new THREE.MeshStandardMaterial({
            color: 0x55aaff, // Nitrile blue
            metalness: 0.0,
            roughness: 0.7
        });

        this.metal = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 0.9,
            roughness: 0.2
        });
        
        this.darkMetal = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.8,
            roughness: 0.4
        });

        this.plasticBase = new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.1,
            roughness: 0.6
        });

        this.wall = new THREE.MeshStandardMaterial({
            color: 0xf0f4f8,
            metalness: 0.0,
            roughness: 0.9
        });

        this.floor = new THREE.MeshStandardMaterial({
            color: 0x8899a6,
            metalness: 0.1,
            roughness: 0.4
        });

        this.wood = new THREE.MeshStandardMaterial({
            color: 0x8b5a2b,
            metalness: 0.0,
            roughness: 0.8
        });

        this.ceramic = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.0,
            roughness: 0.2
        });
    }

    public getChemicalMaterial(colorHex: number): THREE.MeshStandardMaterial {
        return new THREE.MeshStandardMaterial({
            color: colorHex,
            metalness: 0.0,
            roughness: 0.9
        });
    }
}
