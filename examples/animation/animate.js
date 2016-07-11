class Master extends BerryBehavior {

    start() {
        BerryObject.convert('p:nth-child(odd)').tag('odd').addComponent('test');
        BerryObject.convert('p:nth-child(even)').tag('even').addComponent('test');
    }

}

class Test extends BerryBehavior {

    update() {
        Settings.units = 'vh';
        this.berryObject.css('height', Tween.animate(0, 100, 1, Tween.EaseType.EaseOutBounce));
        Settings.units = 'px';
        // if (this.berryObject.tag == 'odd') {
        //     this.berryObject
        //         .css('padding-left', Tween.animate(0, 1000, 2, Tween.EaseType.EaseOutElastic))
        //         // .css('padding-top', Tween.animate(0, 250, 5, Tween.EaseType.EaseOutBounce));
        // } else {
        //     this.berryObject
        //         .css('padding-left', Tween.animate(0, 1000, 2, Tween.EaseType.EaseOutBounce))
        //         // .css('padding-top', Tween.animate(0, 250, 2, Tween.EaseType.EaseOutExpo));
        // }
    }

}

window.master = Master;
window.test = Test;