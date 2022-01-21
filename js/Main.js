tab_allies = [];
$(document).ready(function () {
    var x = $(window).width();
    var y = $(window).height();
    var scene = new THREE.Scene();
    var mixers = [];
    var camera = new THREE.PerspectiveCamera(
        45, // kąt patrzenia kamery (FOV - field of view)
        x / y, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1, // minimalna renderowana odległość
        10000 // maxymalna renderowana odległość
    );
    var wybrano = false;

    var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000/*0Xfffffff*/);
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(x, y);
    console.log(x, y)
    $("#root").append(renderer.domElement);


    camera.position.set(0, 2000, 0)
    camera.lookAt(scene.position)

    var player = new Player();
    player.name = "player";

    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)

    var klik = [];
    var clickedVect; // wektor określający punkt kliknięcia
    var directionVect; // wektor określający kierunek ruchu playera
    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D

    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    var cel = new THREE.Mesh(geometry, material);
    cel.position.x = 0;
    cel.position.z = 0;
    scene.add(cel);
    
        $(document).mousedown(function (event) {

            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;

            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);
            klik.pop()
            // console.log(intersects.length)
            if (intersects.length > 0) {

                klik.push(intersects[0].object);
                console.log(klik)
                if (intersects[0].object.name != "gleba" && intersects[0].object.name != "sciany") {
                    console.log("WYBRANY ALLY")
                    wybrano = true;

                } else {
                    clickedVect = intersects[0].point
                    // console.log(clickedVect)
                    directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize()
                    //console.log(directionVect)
                    player.getPlayerCont().position.clone().distanceTo(clickedVect)


                    var angle = Math.atan2(
                        player.getPlayerCont().position.clone().x - clickedVect.x,
                        player.getPlayerCont().position.clone().z - clickedVect.z,


                    )

                    player.getPlayerMesh().rotation.y = angle;
                    player.getAxesMesh().rotation.y = angle + Math.PI;

                    ally.getAllyMesh().rotation.y = angle;

                    ally.getAxesMesh().rotation.y = angle + Math.PI;

                }
            }




        })
    



    //------------------------------------------------------------

    var geo = new THREE.PlaneGeometry(5000, 5000, 10, 10);
    // var material = new THREE.MeshNormalMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true,
    //     map: new THREE.TextureLoader().load('mats/stone.png') ,
    //  });
    var texture = new THREE.TextureLoader().load('mats/stone2.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 100);
    var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: texture,
        transparent: false,
        opacity: 0.8,

    })
    var plane = new THREE.Mesh(geo, material);
    plane.name = "gleba"
    plane.receiveShadow = true;
    plane.rotation.x += (Math.PI / 2);
    scene.add(plane);

    var lvl = new Level();
    lvl.name = "sciany"
    lvl.getLevel().position.y += 50;
    scene.add(lvl.getLevel())

    //Model----------------------------------------------------------------



    scene.add(player.getPlayerCont());


    var ally = new Ally();
    ally.getAllyCont().position.set(50, 0, 30);
    ally.name = "Ally"
    scene.add(ally.getAllyCont());


    var fire = new Fire();
    fire.getFireCont().position.set(0, 0, 0);
    scene.add(fire.getFireCont());
    function render() {
       

        fire.updateFire();
        requestAnimationFrame(render);

        renderer.render(scene, camera);

        ddd = player.getPlayerCont().position.clone().distanceTo(clickedVect)
        dyp = ally.getAllyCont().position.clone().distanceTo(player.getPlayerCont().position);


        if (ddd > 5) {
            player.getPlayerCont().translateOnAxis(directionVect, 5) // 5 - speed      
            player.model.setAnimation();

        } else {
            player.getPlayerCont().translateOnAxis(directionVect, 0)
            player.model.resetAnimation();
        }

        if (wybrano && dyp > 10) {
            ally.getAllyCont().translateOnAxis(directionVect, 5)
            ally.model.setAnimation();
        } else {
            ally.getAllyCont().translateOnAxis(directionVect, 0)
            ally.model.resetAnimation();
        }

        player.model.updateModel();
        ally.model.updateModel();



        cel.position.x = clickedVect.x;
        cel.position.z = clickedVect.z;
        scene.add(cel);

        camera.position.x = player.getPlayerCont().position.x
        camera.position.z = player.getPlayerCont().position.z + 400
        camera.position.y = player.getPlayerCont().position.y + 400
        camera.lookAt(player.getPlayerCont().position)



    }

 
           
                var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
                orbitControl.addEventListener('change', function () {
                    renderer.render(scene, camera)
                });
                
      






    render();

});

