/// <reference path="../../build/blueberry.min.js" />

class Test extends BerryBehavior {

    awake() {

    }

    start() {

    }

    click() {
        if (berryObject.tag == 'test 1') {
            window.location = 'http://google.com';
        }
        alert(berryObject.findObjectsWithTag('test 1').length)
    }

}

window.test = Test;