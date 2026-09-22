import * as THREE from 'three';

export function createLighting(scene: THREE.Scene) {
    // Drastically reduced ambient and hemisphere lighting for a darker room
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); 
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 0.1);
    hemiLight.position.set(0, 3, 0);
    scene.add(hemiLight);

    const createOverheadLight = (x: number, z: number) => {
        // Reduced overhead light intensity so the burner flame is more prominent
        const pointLight = new THREE.PointLight(0xffeedd, 0.2, 10);
        pointLight.position.set(x, 2.8, z);
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 1024;
        pointLight.shadow.mapSize.height = 1024;
        pointLight.shadow.bias = -0.002;
        scene.add(pointLight);
        
        const fixtureGeo = new THREE.BoxGeometry(1.2, 0.1, 0.4);
        const fixtureMat = new THREE.MeshBasicMaterial({color: 0xffffff});
        const fixture = new THREE.Mesh(fixtureGeo, fixtureMat);
        fixture.position.set(x, 2.95, z);
        scene.add(fixture);
    };

    createOverheadLight(0, -1);
    createOverheadLight(-2, 1);
    createOverheadLight(2, 1);
}
