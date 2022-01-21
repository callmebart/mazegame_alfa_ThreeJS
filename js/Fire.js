function Fire() {
    var tab = [];
    var x = 0, y = 0, z = 0;
    var opacity = 0.5;
    var container = new THREE.Object3D()
    var geometry = new THREE.BoxGeometry(2, 2, 2);
    //materia cząsteczki
    var material = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie kolorów poszczególnych cząsteczek
    });

    var axes = new THREE.AxesHelper(200) // osie do kontroli kierunku ruchu
    container.add(axes)

    //funkcja zwracająca kontener
    generate = function () {

        for (var i = 0; i < 50; i++) {
            console.log("dodanie do kontenera")
            var skala = Math.floor((Math.random() * 5) + 1);
            var particle = new THREE.Mesh(geometry, material.clone())
            // x = Math.floor((Math.random() * 20) + 1);
            // z = Math.floor((Math.random() * 20) + 1);
            particle.position.set(0, 0, 0)
            particle.scale.set(skala, skala, skala)

            tab.push(particle);
            container.add(particle);
        }
    }
    generate();


    var geometryd = new THREE.BoxGeometry(40, 20, 40);
    var textured = new THREE.TextureLoader().load('mats/log_b.jpg');

    var materiald = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: textured,
        transparent: false,
        opacity: 0.8,

    })
    var cube = new THREE.Mesh(geometryd, materiald);
    cube.position.set(12, -5, 20)
    container.add(cube);

    var light = new Light();
    container.add(light.getLightCont())

    this.getFireCont = function () {
        return container
    }

    this.updateFire = function () {
        //y=0
        for (var i = 0; i < tab.length; i++) {

            x = Math.floor((Math.random() * 30) + 1);
            z = Math.floor((Math.random() * 30) + 1);

            tab[i].position.y += Math.floor((Math.random() * 30) + 1);
            tab[i].position.x = x;
            tab[i].position.z = z;
            tab[i].material.opacity -= 0.1;

            if (tab[i].position.y > 150) {
                tab[i].position.y = 0;
                tab[i].material.opacity = 1;
            }



        }
    }

    this.getAxesMesh = function () {
        return axes
    }

}
