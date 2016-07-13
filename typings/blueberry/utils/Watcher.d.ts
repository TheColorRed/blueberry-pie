/**
 * Creates a new watch object
 *
 * @export
 * @param {*} [object={}]
 * @param {ProxyHandler<any>} [handler=null]
 * @returns {Watch}
 */
export declare function watch(object?: any, handler?: ProxyHandler<any>): Watch;
/**
 * The main watch object, the place where the magic happens
 *
 * @abstract
 * @class Watcher
 */
export declare abstract class Watcher {
    protected proxy: any;
    protected watching: WatcherItem[];
    constructor(masterObject: any, handler: ProxyHandler<any>);
    /**
     * Creates a new item to watch
     *
     * @protected
     * @param {string} watch
     * @param {*} [defaultValue=null]
     * @param {Function} [callback=null]
     * @param {WatcherType} [type=WatcherType.Default]
     * @returns {this}
     */
    protected create(watch: string, defaultValue?: any, callback?: Function, type?: WatcherType): this;
    /**
     * Starts listening for changes
     *
     * @returns {*}
     */
    listen(): any;
}
/**
 * The type of watch object
 *
 * @export
 * @enum {number}
 */
export declare enum WatcherType {
    Changed = 0,
    Default = 1,
}
/**
 * A watch object that can watch an object
 *
 * @export
 * @class Watch
 * @extends {Watcher}
 */
export declare class Watch extends Watcher {
    /**
     * This this event gets triggered every time a particular value has changed
     *
     * @param {string} watch
     * @param {Function} callback
     * @returns {this}
     */
    changed(watch: string, callback: Function): this;
    /**
     * This event gets triggered when a value gets destroyed
     *
     * @param {string} watch
     * @param {Function} callback
     * @returns {this}
     */
    destroyed(watch: string, callback: Function): this;
}
export declare class WatcherItem {
    name: string;
    type: WatcherType;
    callback: Function;
    constructor(name: string, type: WatcherType, callback: Function);
}
