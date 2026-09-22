import * as THREE from 'three';
import { MaterialLibrary } from '../materials/MaterialLibrary';

export function createChemicalSamples(materials: MaterialLibrary): THREE.Group {
    const group = new THREE.Group();

    const samples = [
        { name: "Sodium Chloride (NaCl)", color: 0xffaa00 },
        { name: "Potassium Chloride (KCl)", color: 0xddaaff },
        { name: "Copper Sulfate (CuSO₄)", color: 0x00ffaa },
        { name: "Calcium Chloride (CaCl₂)", color: 0xff4422 },
        { name: "Strontium Chloride (SrCl₂)", color: 0xff4444 }
    ];

    const dishGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.015, 16);
    dishGeo.translate(0, 0.0075, 0);
    
    group.userData.saltSamples = [];

    samples.forEach((sample, index) => {
        const dish = new THREE.Mesh(dishGeo, materials.ceramic);
        const xOffset = -0.5 + index * 0.15; // Spread out widely
        dish.position.set(xOffset, 0.85, -0.45); // Very front of the desk
        dish.castShadow = true;
        group.add(dish);

        const saltGeo = new THREE.SphereGeometry(0.03, 8, 8); // Larger salt piles
        const positions = saltGeo.attributes.position;
        for(let i=0; i<positions.count; i++) {
            const y = positions.getY(i);
            if (y < 0) {
                positions.setY(i, 0);
            } else {
                positions.setY(i, y * (0.5 + Math.random() * 0.5));
                positions.setX(i, positions.getX(i) * (0.8 + Math.random() * 0.4));
                positions.setZ(i, positions.getZ(i) * (0.8 + Math.random() * 0.4));
            }
        }
        saltGeo.computeVertexNormals();

        const saltMat = materials.getChemicalMaterial(sample.color);
        const salt = new THREE.Mesh(saltGeo, saltMat);
        salt.position.set(xOffset, 0.857, -0.45);
        group.add(salt);

        // Store reference for logic
        group.userData.saltSamples.push({
            mesh: salt,
            color: sample.color,
            name: sample.name
        });

        // Create wider 3D Canvas label for longer text
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 32;
        const ctx = canvas.getContext('2d')!;
        
        // Dark black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 256, 32);
        
        // White text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sample.name, 128, 16);

        const tex = new THREE.CanvasTexture(canvas);
        const labelGeo = new THREE.PlaneGeometry(0.12, 0.015);
        const labelMat = new THREE.MeshBasicMaterial({map: tex});
        const label = new THREE.Mesh(labelGeo, labelMat);
        
        label.position.set(xOffset, 0.851, -0.38);
        label.rotation.x = -Math.PI / 2;
        group.add(label);
    });

    return group;
}
