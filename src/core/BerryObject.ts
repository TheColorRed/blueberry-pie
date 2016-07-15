import { Berry } from './Berry';
import { BerryBehavior } from './BerryBehavior';
import { Item } from './Item';
import { Component } from './Component';
import { BerryManager } from './managers/BerryManager';
import { BerryGroup } from './BerryGroup';
import { Settings } from '../utils/Settings';
import { Color } from '../utils/Color/Color';

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

    /**
     * Converts existing elements into berry elements
     *
     * @static
     * @param {string} selector
     * @returns {BerryGroup}
     */
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
     * Creates a new instance of a berry object
     *
     * @static
     * @param {*} object
     * @returns {BerryObject}
     */
    public static instantiate(object: any): BerryObject {
        let berry: BerryObject;
        if (object instanceof BerryObject) {
            let node: HTMLElement = document.createElement(object.htmlBerry.tagName) as HTMLElement;
            berry = new BerryObject(node);
        } else {
            let node: HTMLElement;
            if ('template' in object) {
                var template: HTMLTemplateElement = document.createElement('template') as HTMLTemplateElement;
                template.innerHTML = object.template;
                node = template.content.firstChild as HTMLElement;
                BerryObject.addTemplateBerries(node);
            } else {
                node = document.createElement(object.tagName) as HTMLElement;
            }
            node.setAttribute('blueberry', 'BerryObject');
            berry = new BerryObject(node);
            if ('name' in object) { berry.name = object.name; }
            if ('tag' in object) { berry.tag = object.tag; }
        }
        return berry;
    }


    protected static addTemplateBerries(baseNode: HTMLElement) {
        if (baseNode.hasAttribute('blueberry') || baseNode.hasAttribute('data-blueberry')) {
            BerryObject.addBerry(baseNode);
        }
        var nodes: NodeListOf<HTMLElement> = baseNode.querySelectorAll('[blueberry],[data-blueberry]') as NodeListOf<HTMLElement>;
        for (var i = 0; i < nodes.length; i++) {
            var node: HTMLElement = nodes.item(i);
            BerryObject.addBerry(node);
        }
    }

    public static addBerry(node: HTMLElement) {
        var berry: BerryObject = new BerryObject(node);
        if (node.hasAttribute('components') || node.hasAttribute('data-components')) {
            var component: string = node.getAttribute('components') || node.getAttribute('data-components') || '';
            component.split(' ').forEach(component => {
                berry.addComponent(component);
            });
        }
        berry.name = node.getAttribute('blueberry') || node.getAttribute('data-blueberry') || '';
        berry.tag = node.getAttribute('tag') || node.getAttribute('data-tag') || '';
        BerryManager.berries.push(berry);
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
        let comp;
        if (component in window) {
            comp = new window[component]() as T;
        } else {
            comp = new BerryBehavior() as T;
        }
        comp.options = options;
        comp.name = component;
        comp.setBerryObject(this);
        comp.behavior = comp;
        comp.isVisible = this.isVisible;
        comp.isEnabled = this.isEnabled;
        this.components.push(comp);
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

    public append() {
        for (var i = 0; i < arguments.length; i++) {
            this.htmlBerry.appendChild(arguments[i].htmlBerry);
        }
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
            if ((comp.hasAwaken && message == 'awake') || (comp.hasStarted && message == 'start') || !comp.isEnabled) {
                return;
            }
            if (!comp.hasAwaken && !comp.hasStarted && (message == 'update' || message == 'lateUpdate')) {
                return;
            }
            if (typeof comp.behavior[message] == 'function' && comp.isEnabled) {
                if (message == 'click') {
                    options.event.preventDefault();
                }
                if (message == 'keyup' || message == 'keydown' || message == 'keypress' || message == 'change') {
                    comp.behavior[message](options.event);
                } else {
                    comp.behavior[message](options);
                }
            }
            if (message == 'awake') {
                comp.hasAwaken = true;
            }
            if (message == 'start') {
                comp.hasStarted = true;
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

    public css(property: string, value: any = null): this {
        if (typeof value == 'number') {
            value = value + Settings.units;
        } else if (value instanceof Color) {
            value = '#' + value.hex();
        }
        if (value != null) {
            this.htmlBerry.style[property] = value;
        } else {
            return this.htmlBerry.style[property];
        }
        return this;
    }

    public addClass(name: any): this {
        if (typeof name == 'object') {
            name.forEach(n => {
                this.htmlBerry.classList.add(n);
            })
        } else {
            this.htmlBerry.classList.add(name);
        }
        return this;
    }

    public removeClass(name): this {
        if (typeof name == 'object') {
            name.forEach(n => {
                this.htmlBerry.classList.remove(n);
            })
        } else {
            this.htmlBerry.classList.remove(name);
        }
        return this;
    }

    public html(html: string): this {
        this.htmlBerry.innerHTML = html;
        return this;
    }

    public text(text: string): this {
        this.htmlBerry.innerText = text;
        return this;
    }

}