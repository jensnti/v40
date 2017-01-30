function showHide(eId) {
    'use strict';
    var all = document.getElementsByTagName('div');
    var el = document.getElementById(eId);
    if (el.hidden === true) {
        for (var i = 0; i < all.length; i++) {
            all[i].hidden = true;
        }
        el.hidden = false;
    } else {
        el.hidden = true;
    }
}

// element onclick

window.onload = function() {
    'use strict';
    var all = document.getElementsByTagName('div');
    for (var i = 0; i < all.length; i++) {
        all[i].hidden = true;
    }
};