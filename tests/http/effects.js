// /// <reference path="../../build/blueberry.min.js" />

class Test extends BerryBehavior {

    awake() {
        console.log('awake');
    }

    onEnable() {
        console.log('enable');
    }

    start() {
        console.log('start');
        // this.berryObject.setActive(false);
    }

    onDisable() {
        console.log('disable');
        // this.berryObject.setActive(true);
    }

    onEnterViewport() {
        console.log('enter viewport');
    }

    onExitViewport() {
        console.log('exit viewport');
    }

    // update() {
    //     // console.log('update');
    //     // berryObject.destroy(this.berryObject);
    //     // this.berryObject.setActive(false);
    // }

    // click() {
    //     if (this.berryObject.tag == 'test 1') {
    //         window.location = 'http://google.com';
    //     }
    //     alert(berryObject.findObjectsWithTag('test 1').length)
    // }

}

window.test = Test;