function Player() {

    var container = new THREE.Object3D() 
    var player = new THREE.Object3D() 
   
    this.model = new Model();
    this.model.loadModel("models/tris.js",function(data){
        player = data;
        container.add(player);
    })
    
    var axes = new THREE.AxesHelper(200) // osie do kontroli kierunku ruchu
    container.add(axes)

    //funkcja zwracająca kontener
    this.getPlayerCont = function () {
        return container
    }

    //funkcja zwracająca playera
    this.getPlayerMesh = function () {
        return player
    }

    this.getAxesMesh = function () {
        return axes
    }

}
