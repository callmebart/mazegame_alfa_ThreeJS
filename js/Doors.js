/*function Doors(){
    
    
    var container = new THREE.Object3D()
    var radius = Settings.radius   
    var geometry = new THREE.BoxGeometry(30, 150, 5)
    var material = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
    });
    var wall = new THREE.Mesh(geometry, material);
    var wall2 = new THREE.Mesh(geometry, material);

        wall.position.x = 0;
        wall2.position.x = -100;
        container.add(wall)
        container.add(wall2)
    

    this.getDoorsCont = function(){
        return container;
    }
}
*/