import { Berry } from './Berry.ts';
import { BerryBehavior } from './BerryBehavior.ts';
import { Object } from './Object.ts';
import { Component } from './Component.ts';
import { BerryManager } from './managers/BerryManager.ts';

export class BerryObject extends Object {

    protected components: Component[] = [];
    protected berry: Element;

    public constructor(berry?: Element) {
        super();
        this.berry = berry;
    }

    public static find(selector: string): BerryObject[] {
        let nodes: NodeListOf<Element> = document.querySelectorAll(selector);
        let berries: BerryObject[] = [];
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes.item(i);
            if (node.hasAttribute('blueberry')) {
                for (let j = 0; j < BerryManager.berries.length; j++) {
                    let berry = BerryManager.berries[j];
                    if (node == berry.berry) {
                        berries.push(berry);
                    }
                }
            }
        }
        return berries;
    }

    public static findObjectsWithName(name: string): BerryObject[] {
        let objs: BerryObject[] = [];
        for (var i in BerryManager.berries) {
            if (BerryManager.berries[i].name == name) {
                objs.push(BerryManager.berries[i]);
            }
        }
        return objs;
    }

    public static findWithName(name: string): BerryObject {
        for (var i in BerryManager.berries) {
            if (BerryManager.berries[i].name == name) {
                return BerryManager.berries[i];
            }
        }
        return null;
    }

    public addComponent(component: BerryBehavior, options?: {any}): Component {
        var comp = component;
        comp.behavior = component;
        comp.options = options;
        comp.sendMessage('awake');
        this.components.push(comp);
        return comp;
    }

    public getComponent(component): Component {
        for (var i in this.components) {
            var comp = this.components[i];
            if (component == comp) {
                return comp;
            }
        }
        return null;
    }
}