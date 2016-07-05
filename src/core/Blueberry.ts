import { BerryBehavior } from './BerryBehavior.ts'
import { Berry } from './Berry.ts'
import { BerryObject } from './BerryObject.ts'
import { BerryManager } from './managers/BerryManager.ts'

export class Blueberry extends BerryBehavior {

    protected loadSequence: Function[] = [];

    public constructor() {
        super();
        this.init();
        let $this = this;
        window.onload = function () {
            $this.loadSequence.forEach(callback => {
                callback();
            });
        }
    }

    protected init() {
        let $this = this;
        this.load(() => {
            let nodes: NodeListOf<Element> = document.querySelectorAll('[blueberry]');
            let berries: BerryObject[] = [];
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes.item(i);
                if (node.hasAttribute('blueberry')) {
                    let berry = new BerryObject(node);
                    berry.name = node.getAttribute('blueberry');
                    berries.push(berry);
                }
            }
            BerryManager.setBerries(berries);
        });
    }

    public load(callback: Function) {
        this.loadSequence.push(callback);
    }

    public start(callback: Function) {
        this.load(callback);
    }
}