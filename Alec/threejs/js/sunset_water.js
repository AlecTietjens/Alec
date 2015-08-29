var SUNSET_WATER = {
    canvas: null,
    renderer: null,
    camera: null,
    scene: null,
    controls: null,
    water: null,
    skyBox: null,
    projector: null,
    enable: (function () {
        try {
            var canvas = document.createElement('canvas');
            return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        }
        catch (e) {
            return false;
        }
    })(),
    initialize: function (elementID, parameters) {
        this.canvas = document.getElementById(elementID);

        // Initialize renderer, camera, projector, and scene
        this.renderer = this.enable ? new THREE.WebGLRenderer({ canvas: this.canvas }) : new THREE.CanvasRenderer({ canvas: this.canvas });
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(55.0, WINDOW.width / WINDOW.height, 0.5, 3000000);
        this.camera.position.set(0, Math.max(parameters.width * 1.5, parameters.height) / 8, -parameters.height);
        this.camera.lookAt(new THREE.Vector3(100, 100, 200));

        //this.projector = new THREE.Projector();

        // Initialize control
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.userPan = false;
        this.controls.userPanSpeed = 0.0;
        this.controls.maxDistance = 5000.0;
        this.controls.maxPolarAngle = Math.PI * 0.495;

        // Add light
        var directionalLight = new THREE.DirectionalLight(0xffff55, 1);
        directionalLight.position.set(-600, 300, 600);
        this.scene.add(directionalLight);

        // Load textures
        var waterNormals = new THREE.ImageUtils.loadTexture('/threejs/images/waternormals.jpg');
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

        // Create the water effect
        this.water = new THREE.Water(this.renderer, this.camera, this.scene, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            alpha: 1.0,
            sunDirection: directionalLight.position.normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 50.0
        });
        var meshMirror = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(parameters.width * 500, parameters.height * 500, 10, 10),
            this.water.material
            );
        meshMirror.add(this.water);
        meshMirror.rotation.x = -Math.PI * 0.5;
        this.scene.add(meshMirror);

        this.loadSkyBox();
    },
    loadSkyBox: function () {
        var cubeMap = THREE.ImageUtils.loadTextureCube([
            '/threejs/images/bpx.png',
            '/threejs/images/bnx.png',
            '/threejs/images/bpy.png',
            '/threejs/images/bny.png',
            '/threejs/images/bpz.png',
            '/threejs/images/bnz.png'
        ]);
        cubeMap.format = THREE.RGBFormat;

        var shader = THREE.ShaderLib['cube'];
        shader.uniforms['tCube'].value = cubeMap;

        var skyBoxMaterial = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });

        var skyBox = new THREE.Mesh(
            new THREE.BoxGeometry(1000000, 1000000, 1000000),
            skyBoxMaterial
            );
        this.scene.add(skyBox);
    },
    display: function () {
        this.water.render();
        this.renderer.render(this.scene, this.camera);
    },
    update: function () {
        this.water.material.uniforms.time.value += 1.0 / 60.0;
        this.controls.update();
        this.display();
    },
    resize: function (width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.renderer.domElement = this.canvas;
        this.display();
    }
}