function Light(){

    var container = new THREE.Object3D()
    var light = new THREE.PointLight(0xff6600);
   // mesh.castShadow = true
    light.castShadow = true
    light.intensity = 2
    light.distance = 800

    light.position.set(5, 150, 5)
    light.rotation.y = 35
    light.angle = 1

    container.add(light);


 

    this.getLightCont = function () {
        return container
    }
   
}