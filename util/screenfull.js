
define([], function() {
    var element = document.documentElement;
    var fullScreenStatus = false;

    function toggle(id, cb) {
        if (id) {
            element = document.getElementById(id);
        }
        fullScreen();
        cb(fullScreenStatus)
    }

    function close(id, cb) {
        fullScreenStatus = true;
        if (id) {
            element = document.getElementById(id);
        }
        fullScreen();
        cb(fullScreenStatus)
    }

    function fullScreen() {
        if (fullScreenStatus) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) { //Chrome等
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) { //FireFox
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) { // IE11
                document.msExitFullscreen();
            }
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) { //Chrome等
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) { //FireFox
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) { // IE11
                element.msRequestFullscreen();
            }
        }
        fullScreenStatus = !fullScreenStatus;
    }
    
    return {
        toggle: toggle,
        close: close
    }
});