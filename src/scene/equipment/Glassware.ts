import * as THREE from 'three';
import { MaterialLibrary } from '../../materials/MaterialLibrary';

export function createGlassware(materials: MaterialLibrary): THREE.Group {
    const group = new THREE.Group();

    // Test tube rack
    const rackGeo = new THREE.BoxGeometry(0.2, 0.08, 0.05);
    const rack = new THREE.Mesh(rackGeo, materials.wood);
    rack.position.set(-0.3, 0.89, -1.0);
    rack.castShadow = true;
    group.add(rack);

    // Test tubes (arrayed)
    const tubeGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.15, 16);
    // Move origin to bottom of tube
    tubeGeo.translate(0, 0.075, 0);

    for (let i = 0; i < 4; i++) {
        const tube = new THREE.Mesh(tubeGeo, materials.glass);
        const xOffset = -0.375 + i * 0.05;
        tube.position.set(xOffset, 0.85, -1.0);
        tube.castShadow = true;
        group.add(tube);
        
        // Add some colored liquid inside
        const liquidGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.05, 16);
        liquidGeo.translate(0, 0.025, 0);
        const liquidColor = [0xaaaaff, 0xffaaaa, 0xaaffaa, 0xffffff][i];
        const liquidMat = new THREE.MeshPhysicalMaterial({
            color: liquidColor, transmission: 0.8, opacity: 0.9, transparent: true
        });
        const liquid = new THREE.Mesh(liquidGeo, liquidMat);
        liquid.position.set(xOffset, 0.852, -1.0);
        group.add(liquid);
    }

    // Beaker
    const beakerGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.1, 16);
    beakerGeo.translate(0, 0.05, 0);
    const beaker = new THREE.Mesh(beakerGeo, materials.glass);
    beaker.position.set(0.25, 0.85, -1.05);
    beaker.castShadow = true;
    group.add(beaker);

    // Reagent Bottle
    const bottleGroup = new THREE.Group();
    const bodyGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.08, 16);
    const body = new THREE.Mesh(bodyGeo, materials.glass);
    body.position.y = 0.04;
    bottleGroup.add(body);
    
    const neckGeo = new THREE.CylinderGeometry(0.01, 0.03, 0.03, 16);
    const neck = new THREE.Mesh(neckGeo, materials.glass);
    neck.position.y = 0.095;
    bottleGroup.add(neck);

    const capGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.02, 16);
    const cap = new THREE.Mesh(capGeo, materials.plasticBase);
    cap.position.y = 0.12;
    bottleGroup.add(cap);

    bottleGroup.position.set(0.35, 0.85, -1.1);
    group.add(bottleGroup);

    // Empty sample dishes (Exactly 2 as requested, scaled up for clarity)
    const dishGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.015, 16);
    dishGeo.translate(0, 0.0075, 0);
    
    for (let i = 0; i < 2; i++) {
        const dish = new THREE.Mesh(dishGeo, materials.ceramic);
        dish.position.set(0.1 + i * 0.12, 0.85, -0.65);
        dish.castShadow = true;
        group.add(dish);
    }

    return group;
}
