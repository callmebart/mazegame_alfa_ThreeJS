function Ally() {

    var container = new THREE.Object3D() 
    var ally = new THREE.Object3D() 

    var ringGeo = new THREE.RingGeometry(25, 28, 32);
    var ringMat = new THREE.MeshBasicMaterial({ color: 0xff00aa, side: THREE.DoubleSide });
    var ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotateX(Math.PI / 2);
    ring.position.set(0, -9, 0);
    ring.visible = false;
    container.add(ring);
   
    this.model = new Model();
    this.model.loadModel("models/TRISB.js",function(data){
        ally = data;
        container.add(ally);
    })

    tab_allies.push(this)
    
    var axes = new THREE.AxesHelper(200) // osie do kontroli kierunku ruchu
    container.add(axes)

    //funkcja zwracająca kontener
    this.getAllyCont = function () {
        return container
    }

    //funkcja zwracająca playera
    this.getAllyMesh = function () {
        return ally
    }

    this.getAxesMesh = function () {
        return axes
    }
    this.showSelection = function () {
        ring.visible = true;
    }

    this.deselect = function () {
        ring.visible = false;
    }

}
