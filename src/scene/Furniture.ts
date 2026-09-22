import * as THREE from 'three';
import { MaterialLibrary } from '../materials/MaterialLibrary';

export function createFurniture(materials: MaterialLibrary): THREE.Group {
    const group = new THREE.Group();

    // Main Workbench
    const benchGeo = new THREE.BoxGeometry(2.4, 0.05, 0.8);
    const benchTop = new THREE.Mesh(benchGeo, materials.plasticBase);
    benchTop.position.set(0, 0.85, -1);
    benchTop.receiveShadow = true;
    benchTop.castShadow = true;
    group.add(benchTop);

    // Workbench Legs/Base
    const legGeo = new THREE.BoxGeometry(0.1, 0.85, 0.7);
    const legL = new THREE.Mesh(legGeo, materials.darkMetal);
    legL.position.set(-1.1, 0.425, -1);
    legL.castShadow = true;
    group.add(legL);

    const legR = new THREE.Mesh(legGeo, materials.darkMetal);
    legR.position.set(1.1, 0.425, -1);
    legR.castShadow = true;
    group.add(legR);

    // Sink Area
    const sinkGeo = new THREE.BoxGeometry(0.6, 0.2, 0.5);
    const sink = new THREE.Mesh(sinkGeo, materials.ceramic);
    sink.position.set(1.5, 0.8, -1);
    sink.receiveShadow = true;
    group.add(sink);

    const faucetGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.2);
    const faucet = new THREE.Mesh(faucetGeo, materials.metal);
    faucet.position.set(1.5, 1.0, -1.2);
    group.add(faucet);

    // Stool
    const createStool = (x: number, z: number) => {
        const stoolGroup = new THREE.Group();
        const seatGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
        const seat = new THREE.Mesh(seatGeo, materials.wood);
        seat.position.y = 0.5;
        seat.castShadow = true;
        stoolGroup.add(seat);

        const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45);
        const pole = new THREE.Mesh(poleGeo, materials.metal);
        pole.position.y = 0.25;
        stoolGroup.add(pole);

        const baseGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.05, 16);
        const base = new THREE.Mesh(baseGeo, materials.darkMetal);
        base.position.y = 0.025;
        stoolGroup.add(base);

        stoolGroup.position.set(x, 0, z);
        return stoolGroup;
    };

    group.add(createStool(-0.5, -0.2));
    group.add(createStool(0.5, -0.2));

    // Wall Shelves
    const shelfGeo = new THREE.BoxGeometry(1.5, 0.05, 0.3);
    const shelf1 = new THREE.Mesh(shelfGeo, materials.wood);
    shelf1.position.set(-1.5, 1.8, -2.85);
    shelf1.castShadow = true;
    group.add(shelf1);

    const shelf2 = new THREE.Mesh(shelfGeo, materials.wood);
    shelf2.position.set(-1.5, 2.1, -2.85);
    shelf2.castShadow = true;
    group.add(shelf2);

    return group;
}
