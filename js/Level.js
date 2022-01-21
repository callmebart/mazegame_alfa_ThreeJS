function Level() {
    var container = new THREE.Object3D()


    for (var i = 0; i < data.level.length; ++i) {

        if (typeof data.level[i - 1] == "undefined") {
            var hex = new Hex(data.level[i].x, data.level[i].z, null, data.level[i].dirOut, data.level[i].type);
            container.add(hex)
        }

        else {
            var hex = new Hex(data.level[i].x, data.level[i].z, data.level[i - 1].dirIn, data.level[i].dirOut, data.level[i].type);
            container.add(hex)
        }

    }

    this.getLevel = function () {
        return container
    }

}