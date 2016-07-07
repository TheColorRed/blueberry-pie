// /// <reference path="../../build/blueberry.min.js" />

var i = j = 0;
var durationA = 2;
var durationB = 1;

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

    update() {
        var a = Mathf.lerp(0, 500, i);
        var b = Mathf.lerp(0, 100, j);

        this.berryObject
            .css('padding-left', a + 'px')
            .css('padding-top', b + 'px')
            .css('padding-bottom', b + 'px')
            .css('display', 'inline-block');
        i += Time.deltaTime / durationA;
        j += Time.deltaTime / durationB;
    }

    // click() {
    //     // if (this.berryObject.tag == 'test 1') {
    //     //     window.location = 'http://google.com';
    //     // }
    //     alert(berryObject.findObjectsWithTag('test 1').length)
    // }

}

window.test = Test;