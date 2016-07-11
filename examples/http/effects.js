class Master extends BerryBehavior {

    start() {
        BerryObject.convert('p:nth-child(odd)').tag('odd').addComponent('test');
        BerryObject.convert('p:nth-child(even)').tag('even').addComponent('test');
    }

}

class Test extends BerryBehavior {

    // awake() {
    //     // Create some comoponent variables
    //     this.i        = 0;
    //     this.j        = 0;
    //     this.duration = this.berryObject.tag == 'odd' ? 1 : 2;

    //     // Define some variables for use in our watcher
    //     var defaultAmt = this.berryObject.tag == 'odd' ? 500 : 250;
    //     var self = this;

    //     // Create a comparison watcher to watch some additional variables
    //     this.watch = this.when('a', 0).equals('amount', defaultAmt, function () {
    //         // When 'a == amount' destroy the current object after 3 seconds
    //         BerryObject.destroy(self.berryObject, 3);
    //     }).watch();
    // }

    // update() {
    //     this.watch.a = Mathf.lerp(0, this.watch.amount, this.i);
    //     this.i += Time.deltaTime / this.duration;

    //     this.berryObject
    //         .css('padding-left', this.watch.a + 'px')
    //         .css('display', 'block');
    // }

    awake() {
        var self = this;
        this.watcher = watch().changed('a', function (oldVal, newVal) {
            console.log(`${oldVal} -> ${newVal}`);
            if (newVal == 5) {
                delete self.watcher.a;
            }
        }).destroyed('a', function () {
            console.log('a was destroyed')
        }).listen();
    }

    start() {
        var self = this;
        setInterval(function () {
            self.watcher.a += 1;
        }, 1000);
    }

}

window.master = Master;
window.test = Test;