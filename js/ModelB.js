function Model(){
    var container = new THREE.Object3D()
    var mixer;
    this.loadModel = function(url, callback){
        var loader = new THREE.JSONLoader();
     
        loader.load(url, function (geometry) {
            var modelMaterial = new THREE.MeshPhongMaterial(
                {
                    map: THREE.ImageUtils.loadTexture("models/baul.png"),
                    morphTargets: true // odpowiada za animację materiału modelu
        
                });
            var meshModel = new THREE.Mesh(geometry,modelMaterial)
            meshModel.name="Ally";
            meshModel.rotation.y = -Math.PI /2;
            meshModel.position.y = 60;
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
    console.log("baul",geometry.animations[i].name)
    if(mixer) mixer.update(delta);
}

//animowanie postaci
this.setAnimation = function(){
    mixer.clipAction("run").play();
}
this.wybranyAnimation = function(){
    mixer.clipAction("flip").play();
}
this.wybranyStopAnimation = function(){
    mixer.clipAction("flip").stop();
}
this.resetAnimation = function(){
    if(mixer) mixer.clipAction("run").stop();
}
}