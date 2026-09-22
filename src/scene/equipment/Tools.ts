import * as THREE from 'three';
import { MaterialLibrary } from '../../materials/MaterialLibrary';

export function createTools(materials: MaterialLibrary): THREE.Group {
    const group = new THREE.Group();

    // Platinum Wire Loop
    const wireGroup = new THREE.Group();
    
    // Long thin metal handle
    const handleGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.20, 16);
    const handle = new THREE.Mesh(handleGeo, materials.darkMetal); // Metal handle as requested
    handle.position.x = -0.10;
    handle.rotation.z = Math.PI / 2;
    wireGroup.add(handle);

    // Thin platinum wire
    const wireGeo = new THREE.CylinderGeometry(0.0015, 0.0015, 0.10, 16);
    const wire = new THREE.Mesh(wireGeo, materials.metal);
    wire.position.x = 0.05;
    wire.rotation.z = Math.PI / 2;
    wireGroup.add(wire);

    // Small circular loop at the tip
    const loopGeo = new THREE.TorusGeometry(0.005, 0.0015, 8, 24);
    const loop = new THREE.Mesh(loopGeo, materials.metal);
    loop.position.x = 0.105;
    loop.rotation.x = Math.PI / 2; // Flat so it's highly visible from above
    wireGroup.add(loop);

    // Position clearly on the workstation
    wireGroup.position.set(-0.35, 0.855, -0.35); // Very prominent front-left placement
    wireGroup.rotation.y = Math.PI / 4;
    wireGroup.scale.set(1.5, 1.5, 1.5);
    wireGroup.userData.isGrabbable = true; // Added for VR grabbing
    wireGroup.name = "PlatinumWire";
    group.add(wireGroup);

    // Safety Goggles
    const gogglesGroup = new THREE.Group();
    const lensGeo = new THREE.BoxGeometry(0.15, 0.06, 0.02);
    const lens = new THREE.Mesh(lensGeo, materials.glass);
    gogglesGroup.add(lens);

    const frameGeo = new THREE.BoxGeometry(0.16, 0.07, 0.01);
    const frame = new THREE.Mesh(frameGeo, materials.plasticBase);
    frame.position.z = -0.01;
    gogglesGroup.add(frame);

    gogglesGroup.position.set(0.6, 0.86, -0.7);
    gogglesGroup.rotation.x = -Math.PI / 2;
    group.add(gogglesGroup);

    // Laboratory Gloves (Nitrile)
    const glovesGroup = new THREE.Group();
    const gloveGeo = new THREE.CapsuleGeometry(0.04, 0.1, 8, 16);
    // Left glove
    const gloveL = new THREE.Mesh(gloveGeo, materials.rubber);
    gloveL.position.set(-0.06, 0, 0);
    gloveL.rotation.z = Math.PI / 16;
    glovesGroup.add(gloveL);
    // Right glove
    const gloveR = new THREE.Mesh(gloveGeo, materials.rubber);
    gloveR.position.set(0.06, 0, 0);
    gloveR.rotation.z = -Math.PI / 16;
    glovesGroup.add(gloveR);

    glovesGroup.position.set(0.8, 0.86, -0.7);
    glovesGroup.rotation.x = Math.PI / 2;
    group.add(glovesGroup);

    // Test Tube Holder (Wooden Clamp/Peg)
    const clampGroup = new THREE.Group();
    const pegGeo = new THREE.BoxGeometry(0.02, 0.2, 0.015);
    const peg1 = new THREE.Mesh(pegGeo, materials.wood);
    peg1.position.set(-0.005, 0, 0);
    peg1.rotation.z = 0.05;
    clampGroup.add(peg1);

    const peg2 = new THREE.Mesh(pegGeo, materials.wood);
    peg2.position.set(0.005, 0, 0);
    peg2.rotation.z = -0.05;
    clampGroup.add(peg2);

    const springGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.02, 8);
    const spring = new THREE.Mesh(springGeo, materials.metal);
    spring.rotation.z = Math.PI / 2;
    clampGroup.add(spring);

    clampGroup.position.set(0.35, 0.865, -0.35); // Prominent front-right placement
    clampGroup.rotation.x = Math.PI / 2;
    clampGroup.rotation.z = -Math.PI / 4;
    clampGroup.scale.set(1.5, 1.5, 1.5);
    group.add(clampGroup);

    return group;
}
