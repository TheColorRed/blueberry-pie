class Master extends BerryBehavior {

    start() {
        berryObject.convert('p:nth-child(odd)').tag('odd').addComponent('test');
        berryObject.convert('p:nth-child(even)').tag('even').addComponent('test');
    }

}

class Test extends BerryBehavior {

    awake() {
        // Create some comoponent variables
        this.i        = 0;
        this.j        = 0;
        this.duration = this.berryObject.tag == 'odd' ? 1 : 2;

        // Define some variables for use in our watcher
        var defaultAmt = this.berryObject.tag == 'odd' ? 500 : 250;
        var self = this;

        // Create a comparison watcher to watch some additional variables
        this.watch = this.when('a', 0).equals('amount', defaultAmt, function () {
            // When 'a == amount' destroy the current object after 3 seconds
            berryObject.destroy(self.berryObject, 3);
        });
    }

    update() {
        this.watch.a = Mathf.lerp(0, this.watch.amount, this.i);
        this.i += Time.deltaTime / this.duration;

        this.berryObject
            .css('padding-left', this.watch.a + 'px')
            .css('display', 'block');
    }

}

window.master = Master;
window.test = Test;