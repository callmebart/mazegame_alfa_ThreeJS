function Model(){
    var container = new THREE.Object3D()
    var mixer;

    this.loadModel = function(url, callback){
        var loader = new THREE.JSONLoader();
     
        loader.load(url, function (geometry) {
            var modelMaterial = new THREE.MeshPhongMaterial(
                {
                    map: THREE.ImageUtils.loadTexture("models/scarlet.png"),
                    morphTargets: true // odpowiada za animację materiału modelu
        
                });
            var meshModel = new THREE.Mesh(geometry,modelMaterial)
            meshModel.name="name";
            meshModel.rotation.y = -Math.PI /2;
            meshModel.position.y = 40;
            meshModel.scale.set(3, 3, 3);

            mixer = new THREE.AnimationMixer(meshModel);
            mixer.clipAction("stand").play();

            container.add(meshModel);
            callback(container);
        });
}
//update mixer

var delta = 0.015;
this.updateModel = function(){
    if(mixer) mixer.update(delta);
}

//animowanie postaci
this.setAnimation = function(){
    mixer.clipAction("run").play();
}
this.resetAnimation = function(){
    if(mixer) mixer.clipAction("run").stop();
}
}