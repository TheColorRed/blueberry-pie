import { Berry } from './Berry';
import { BerryBehavior } from './BerryBehavior';
import { Item } from './Item';
import { Component } from './Component';
import { BerryManager } from './managers/BerryManager';

export class BerryObject extends Item {

    public constructor(berry?: Element) {
        super();
        this.berry = berry;
    }

    /**
     * Finds an onbject in the dom that is a blueberry object
     *
     * @static
     * @param {string} selector
     * @returns {BerryObject[]}
     */
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

    /**
     * Finds all blueberry objects with a particular name
     *
     * @static
     * @param {string} name
     * @returns {BerryObject[]}
     */
    public static findObjectsWithName(name: string): BerryObject[] {
        let objs: BerryObject[] = [];
        for (var i in BerryManager.berries) {
            if (BerryManager.berries[i].name == name) {
                objs.push(BerryManager.berries[i]);
            }
        }
        return objs;
    }

    /**
     * Finds all blueberry objects with a particular tag
     *
     * @static
     * @param {string} name
     * @returns {BerryObject[]}
     */
    public static findObjectsWithTag(tag: string): BerryObject[] {
        let objs: BerryObject[] = [];
        for (var i in BerryManager.berries) {
            if (BerryManager.berries[i].tag == tag) {
                objs.push(BerryManager.berries[i]);
            }
        }
        return objs;
    }

    /**
     * Finds the first blueberry object with a particular name
     *
     * @static
     * @param {string} name
     * @returns {BerryObject}
     */
    public static findWithName(name: string): BerryObject {
        for (var i in BerryManager.berries) {
            if (BerryManager.berries[i].name == name) {
                return BerryManager.berries[i];
            }
        }
        return null;
    }


    /**
     * Finds the first blueberry object with a particular tag
     *
     * @static
     * @param {string} name
     * @returns {BerryObject}
     */
    public static findWithTag(tag: string): BerryObject {
        for (var i in BerryManager.berries) {
            if (BerryManager.berries[i].tag == tag) {
                return BerryManager.berries[i];
            }
        }
        return null;
    }

    /**
     * Adds a component to a blueberry object
     *
     * @param {string} component
     * @param {{any}} [options]
     * @returns {Component}
     */
    public addComponent<T extends BerryBehavior>(component: string, options?: { any }): Component {
        let comp = this.createComponent<T>(component, options);
        this.components.push(comp);
        return comp;
    }

    /**
     * Gets a component from a blueberry object
     *
     * @param {any} component
     * @returns {Component}
     */
    public getComponent(component): Component {
        for (var i in this.components) {
            var comp = this.components[i];
            if (component == comp) {
                return comp;
            }
        }
        return null;
    }

    /**
     * Creates a blueberry component on an object
     *
     * @private
     * @param {string} component
     * @param {{any}} [options]
     * @returns {Component}
     */
    private createComponent<T extends BerryBehavior>(component: string, options?: {any}): Component {
        let comp = new window[component]() as T;
        comp.options = options;
        comp.setBerryObject(this);
        comp.behavior = comp;
        if (typeof comp.awake == 'function') {
            comp.awake();
        }
        if (typeof comp.onEnable == 'function') {
            comp.onEnable();
        }
        return comp;
    }
}