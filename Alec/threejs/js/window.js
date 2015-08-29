/// <reference path="../../scripts/main.js" />
var WINDOW = {
    width: 0,
    height: 0,
    callbacks: {
        70: "WINDOW.toggleFullScreen()"
    },
    initialize: function () {
        this.updateSize();

        // Fullscreen listener for the 'f' key
        document.addEventListener('keydown', function (evt) { WINDOW.callAction(evt.keyCode); });

        // Resize listener for window
        window.addEventListener('resize', function (evt) {
            WINDOW.updateSize();
            WINDOW.resizeCallback(WINDOW.width, WINDOW.height);
        });
    },
    updateSize: function () {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    },
    callAction: function (keyCode) {
        if (keyCode in this.callbacks) {
            eval(this.callbacks[keyCode]);
            return false;
        }
    },
    toggleFullScreen: function () {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            if (document.documentElement.requestFullscreen)
                document.documentElement.requestFullscreen();
            else if (document.documentElement.mozRequestFullScreen)
                document.documentElement.mozRequestFullScreen();
            else if (document.documentElement.webkitRequestFullscreen)
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        else {
            if (document.cancelFullScreen)
                document.cancelFullScreen();
            else if (document.mozCancelFullScreen)
                document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen)
                document.webkitCancelFullScreen();
        }
    },
    resizeCallback: function (inWidth, inHeight) { /* Nothing here for now */ }
};