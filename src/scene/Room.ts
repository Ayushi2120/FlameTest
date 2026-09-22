import * as THREE from 'three';
import { MaterialLibrary } from '../materials/MaterialLibrary';

export function createRoom(materials: MaterialLibrary): THREE.Group {
    const group = new THREE.Group();

    // Floor
    const floorGeo = new THREE.PlaneGeometry(8, 6);
    const floor = new THREE.Mesh(floorGeo, materials.floor);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    group.add(floor);

    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(8, 6);
    const ceiling = new THREE.Mesh(ceilingGeo, materials.wall);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 3;
    group.add(ceiling);

    // Walls
    const wallGeoFrontBack = new THREE.PlaneGeometry(8, 3);
    const wallGeoLeftRight = new THREE.PlaneGeometry(6, 3);

    const backWall = new THREE.Mesh(wallGeoFrontBack, materials.wall);
    backWall.position.set(0, 1.5, -3);
    backWall.receiveShadow = true;
    group.add(backWall);

    const frontWall = new THREE.Mesh(wallGeoFrontBack, materials.wall);
    frontWall.position.set(0, 1.5, 3);
    frontWall.rotation.y = Math.PI;
    frontWall.receiveShadow = true;
    group.add(frontWall);

    const leftWall = new THREE.Mesh(wallGeoLeftRight, materials.wall);
    leftWall.position.set(-4, 1.5, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    group.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeoLeftRight, materials.wall);
    rightWall.position.set(4, 1.5, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    group.add(rightWall);
    
    // Add simple door
    const doorGeo = new THREE.BoxGeometry(1.2, 2.1, 0.1);
    const doorMat = new THREE.MeshStandardMaterial({color: 0x5c3a21, roughness: 0.8});
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(3, 1.05, 2.95);
    group.add(door);
    
    // Add whiteboards/posters for detail
    const boardGeo = new THREE.PlaneGeometry(3, 1.5);
    const boardMat = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.2});
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.set(-2, 1.6, -2.99);
    group.add(board);

    return group;
}
