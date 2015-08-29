function animate() {
    requestAnimationFrame(animate);
    SUNSET_WATER.update();
}

window.onload = function () {
    WINDOW.initialize();

    var parameters = {
        //alea: RAND_MT,
        //generator: PN_GENERATOR,
        width: 2000,
        height: 2000,
        widthSegments: 250,
        heightSegments: 250,
        depth: 1500,
        param: 4,
        filterparam: 1,
        //filter: [CIRCLE_FILTER],
        //postgen: [MOUNTAIN_COLORS],
        //effect: [DESTRUCTURE_EFFECT]
    };

    SUNSET_WATER.initialize('sunset-canvas', parameters);

    WINDOW.resizeCallback = function (width, height) { SUNSET_WATER.resize(width, height); };
    SUNSET_WATER.resize(WINDOW.width, WINDOW.height);

    animate();
}

var aboutContainer = document.getElementById('about');
Ps.initialize(aboutContainer);
Ps.update(aboutContainer);

var portfolioContainer = document.getElementById('portfolio');
Ps.initialize(portfolioContainer);
Ps.update(portfolioContainer);