import { Berry } from './Berry';
import { BerryBehavior } from './BerryBehavior';
import { Item } from './Item';
import { Component } from './Component';
import { BerryManager } from './managers/BerryManager';
import { BerryGroup } from './BerryGroup';
import { Settings } from '../utils/Settings';

export class BerryObject extends Item {

    public constructor(berry?: HTMLElement) {
        super();
        this.berry = berry;
    }

    public static destroy(item: Item, delay: number = 0) {
        Item.destroy(item, delay);
    }

    /**
     * Finds an onbject in the dom that is a blueberry object
     *
     * @static
     * @param {string} selector
     * @returns {BerryObject[]}
     */
    public static find(selector: string): BerryObject[] {
        let nodes: NodeListOf<HTMLElement> = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
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

    public static convert(selector: string): BerryGroup {
        let nodes: NodeListOf<HTMLElement> = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
        let berryGroup: BerryGroup = new BerryGroup();
        for (let i = 0; i < nodes.length; i++) {
            let node: HTMLElement = nodes.item(i);
            if (!node.hasAttribute('blueberry') && !node.hasAttribute('data-blueberry')) {
                let berryObject = new BerryObject(node);
                node.setAttribute('blueberry', 'BerryObject');
                berryGroup.add(berryObject);
            }
        }
        return berryGroup;
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
        let comp = new window[component]() as T;
        comp.options = options;
        comp.setBerryObject(this);
        comp.behavior = comp;
        comp.isVisible = this.isVisible;
        comp.isEnabled = this.isEnabled;
        this.components.push(comp);
        this.sendMessage('awake');
        return comp;
    }

    /**
     * Gets a component from a blueberry object
     *
     * @param {any} component
     * @returns {Component}
     */
    public getComponent(component: string): Component {
        for (var i in this.components) {
            var comp = this.components[i];
            if (component == comp.name) {
                return comp;
            }
        }
        return null;
    }

    public setActive(value: boolean): void {
        this.shouldDisable = !value;
    }

    /**
     * Sends a message to all the enabled components on the current object
     * If the object itself is disabled so are all of it's components
     *
     * @param {string} message
     */
    public sendMessage(message: string, options?: any): void {
        if (!this.isEnabled) {
            return;
        }
        this.components.forEach(comp => {
            if (typeof comp.behavior[message] == 'function' && comp.isEnabled) {
                if (message == 'click') {
                    options.event.preventDefault();
                }
                comp.behavior[message]();
            }
            if (message == 'awake') {
                comp.behavior.hasAwaken = true;
                this.hasAwaken = true;
            }
            if (message == 'start') {
                comp.behavior.hasStarted = true;
                this.hasStarted = true;
            }
            if (message == 'onEnable') {
                comp.behavior.isEnabled = true;
                this.isEnabled = true;
            }
            if (message == 'onDisable') {
                comp.behavior.isEnabled = false;
                this.isEnabled = false;
            }
        });
    }

    public css(property: string, value: any): this {
        if (typeof value == 'number') {
            value = value + Settings.units;
        }
        this.htmlBerry.style[property] = value;
        return this;
    }
}