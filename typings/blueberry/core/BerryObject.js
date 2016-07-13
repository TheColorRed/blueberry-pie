import { Item } from './Item';
import { BerryManager } from './managers/BerryManager';
import { BerryGroup } from './BerryGroup';
import { Settings } from '../utils/Settings';
import { Color } from '../utils/Color/Color';
export class BerryObject extends Item {
    constructor(berry) {
        super();
        this.berry = berry;
    }
    static destroy(item, delay = 0) {
        Item.destroy(item, delay);
    }
    /**
     * Finds an onbject in the dom that is a blueberry object
     *
     * @static
     * @param {string} selector
     * @returns {BerryObject[]}
     */
    static find(selector) {
        let nodes = document.querySelectorAll(selector);
        let berries = [];
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
    static findObjectsWithName(name) {
        let objs = [];
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
    static findObjectsWithTag(tag) {
        let objs = [];
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
    static findWithName(name) {
        for (var i in BerryManager.berries) {
            if (BerryManager.berries[i].name == name) {
                return BerryManager.berries[i];
            }
        }
        return null;
    }
    static convert(selector) {
        let nodes = document.querySelectorAll(selector);
        let berryGroup = new BerryGroup();
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes.item(i);
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
    static findWithTag(tag) {
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
    addComponent(component, options) {
        let comp = new window[component]();
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
    getComponent(component) {
        for (var i in this.components) {
            var comp = this.components[i];
            if (component == comp.name) {
                return comp;
            }
        }
        return null;
    }
    setActive(value) {
        this.shouldDisable = !value;
    }
    /**
     * Sends a message to all the enabled components on the current object
     * If the object itself is disabled so are all of it's components
     *
     * @param {string} message
     */
    sendMessage(message, options) {
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
                comp.behavior[message]();
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
    css(property, value = null) {
        if (typeof value == 'number') {
            value = value + Settings.units;
        }
        else if (value instanceof Color) {
            value = '#' + value.hex();
        }
        if (value != null) {
            this.htmlBerry.style[property] = value;
        }
        else {
            return this.htmlBerry.style[property];
        }
        return this;
    }
}
