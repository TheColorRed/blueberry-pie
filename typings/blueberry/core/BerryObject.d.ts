import { BerryBehavior } from './BerryBehavior';
import { Item } from './Item';
import { Component } from './Component';
import { BerryGroup } from './BerryGroup';
export declare class BerryObject extends Item {
    constructor(berry?: HTMLElement);
    static destroy(item: Item, delay?: number): void;
    /**
     * Finds an onbject in the dom that is a blueberry object
     *
     * @static
     * @param {string} selector
     * @returns {BerryObject[]}
     */
    static find(selector: string): BerryObject[];
    /**
     * Finds all blueberry objects with a particular name
     *
     * @static
     * @param {string} name
     * @returns {BerryObject[]}
     */
    static findObjectsWithName(name: string): BerryObject[];
    /**
     * Finds all blueberry objects with a particular tag
     *
     * @static
     * @param {string} name
     * @returns {BerryObject[]}
     */
    static findObjectsWithTag(tag: string): BerryObject[];
    /**
     * Finds the first blueberry object with a particular name
     *
     * @static
     * @param {string} name
     * @returns {BerryObject}
     */
    static findWithName(name: string): BerryObject;
    static convert(selector: string): BerryGroup;
    /**
     * Finds the first blueberry object with a particular tag
     *
     * @static
     * @param {string} name
     * @returns {BerryObject}
     */
    static findWithTag(tag: string): BerryObject;
    /**
     * Adds a component to a blueberry object
     *
     * @param {string} component
     * @param {{any}} [options]
     * @returns {Component}
     */
    addComponent<T extends BerryBehavior>(component: string, options?: {
        any;
    }): Component;
    /**
     * Gets a component from a blueberry object
     *
     * @param {any} component
     * @returns {Component}
     */
    getComponent(component: string): Component;
    setActive(value: boolean): void;
    /**
     * Sends a message to all the enabled components on the current object
     * If the object itself is disabled so are all of it's components
     *
     * @param {string} message
     */
    sendMessage(message: string, options?: any): void;
    css(property: string, value?: any): this;
}
