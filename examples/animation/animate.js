class Master extends BerryBehavior {

    start() {
        BerryObject.convert('div:nth-child(odd)').tag('odd').addComponent('test');
        BerryObject.convert('div:nth-child(even)').tag('even').addComponent('test');
    }

}

class Test extends BerryBehavior {

    awake() {
        Tween.colorTo({
            target: this.berryObject,
            endColor: Color.pink,
            loopType: Tween.Looping.PingPong,
            // easeType: Tween.Easing.EaseInOutBounce,
        });
        // Tween.moveTo({
        //     target: this.berryObject,
        //     endPosition: new Vector2(500, 525),
        //     easeType: Tween.Easing.EaseInOutElastic,
        //     loopType: Tween.Looping.PingPong,
        // });

        // Tween.scaleTo({
        //     target: this.berryObject,
        //     endScale: new Vector2(50, 50),
        //     easeType: Tween.Easing.EaseInOutBounce,
        //     loopType: Tween.Looping.PingPong,
        // });
    }

}

window.master = Master;
window.test = Test;