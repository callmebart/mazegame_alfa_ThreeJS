function LightPlayer(){

    var container = new THREE.Object3D()
    var light = new THREE.PointLight(0xff6600);
   // mesh.castShadow = true
    light.castShadow = true
    light.intensity = 1
    light.distance = 50
    light.position.y = 100

    light.rotation.y = 35
    light.angle = 1

    container.add(light);

    this.getPlayerLightCont = function () {
        return container
    }
   
}