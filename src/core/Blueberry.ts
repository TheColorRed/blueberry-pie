import { BerryBehavior } from './BerryBehavior'
import { Berry } from './Berry'
import { BerryObject } from './BerryObject'
import { BerryManager } from './managers/BerryManager'

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
            let nodes: NodeListOf<Element> = document.querySelectorAll('[blueberry],[data-blueberry]');
            let berries: BerryObject[] = [];
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes.item(i);
                if (node.hasAttribute('blueberry') || node.hasAttribute('data-blueberry')) {
                    let berry = new BerryObject(node);
                    berry.name = node.getAttribute('blueberry') || node.getAttribute('data-blueberry') || '';
                    berry.tag = node.getAttribute('tag') || node.getAttribute('data-tag') || '';
                    node.addEventListener('click', e => {
                        berry.getComponents().forEach(comp => {
                            if (typeof comp.behavior.click == 'function') {
                                e.preventDefault();
                                comp.behavior.click();
                            }
                        });
                    });
                    if (node.hasAttribute('component') || node.hasAttribute('data-component')) {
                        var component: string = node.getAttribute('component') || node.getAttribute('data-component') || '';
                        component.split(' ').forEach(component => {
                            berry.addComponent(component);
                        });
                    }
                    berries.push(berry);
                }
            }
            BerryManager.setBerries(berries);
            berries.forEach(berry => {
                berry.getComponents().forEach(comp => {
                    comp.behavior.start();
                });
            });
        });
    }

    public load(callback: Function) {
        this.loadSequence.push(callback);
    }

}