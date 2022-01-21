function Hex(x, z, dirIn, dirOut, type) {

    //pobranie wartości radius z Settings.js
    var radius = Settings.radius
    var height = Settings.height
    var width = Settings.width
    var material = Settings.material
    var container = new THREE.Object3D()

    


    //ZMIENNE MATEMATYCZNE
    var H = (radius * Math.sqrt(3)) / 2
    Math.radians = function (degrees) {
        return degrees * Math.PI / 180;
    };

    function init() {

        // console.log("uruchomiono Hex.init()")

        var geometry_hex = new THREE.BoxGeometry(radius, height, width)
        var geometry_door = new THREE.BoxGeometry(radius / 4, height, width);
        var wall = new THREE.Mesh(geometry_hex, material);


        for (var i = 0; i < 6; i++) {

            if (i === dirIn || i === dirOut) {
                var door = new THREE.Object3D();
                door.position.x = -H * Math.sin(-i * Math.radians(60))
                door.position.z = -H * Math.cos(-i * Math.radians(60))
                door.lookAt(container.position);

                var wallDoor = new THREE.Mesh(geometry_door, material);
                wallDoor.position.x = -radius / 2.7;
                door.add(wallDoor);

                var sideDoor = wallDoor.clone();
                sideDoor.position.x = radius / 2.7;
                door.add(sideDoor);

                container.add(door);
            }

            else {
                var side = wall.clone()
                side.position.x = -H * Math.sin(-i * Math.radians(60))
                side.position.z = -H * Math.cos(-i * Math.radians(60))
                side.lookAt(container.position)
                container.add(side)
            }
        }



        if (z % 2 == 0) {
            container.position.z = radius * Math.sqrt(3) * x;
        }
        else {
            container.position.z = radius * Math.sqrt(3) * x + (radius * Math.sqrt(3)) / 2;
        }

        container.position.x = ((3 * radius) / 2) * z;
        container.position.y = 25;
        //scene.add(container);
    }
    init()

    return container

    // this.getHex = function () {
    //     return container
    // }
}
