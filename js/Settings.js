var texture = new THREE.TextureLoader().load('mats/stone.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);

// immediately use the texture for material creation
// var material = new THREE.MeshBasicMaterial( { map: texture } );

var Settings = {
    radius: 250,
    height: 150,
    width: 5,
    material: new THREE.MeshPhongMaterial({ map: texture })
}

// material: new THREE.MeshNormalMaterial({
//     side: THREE.DoubleSide,
//     wireframe: false,
//     transparent: true,
//     opacity: 1
// }),