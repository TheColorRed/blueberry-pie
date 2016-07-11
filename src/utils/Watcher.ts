/**
 * Creates a new watch object
 *
 * @export
 * @param {*} [object={}]
 * @param {ProxyHandler<any>} [handler=null]
 * @returns {Watch}
 */
export function watch(object: any = {}, handler: ProxyHandler<any> = null): Watch {
    return new Watch(object, handler);
}


/**
 * The main watch object, the place where the magic happens
 *
 * @abstract
 * @class Watcher
 */
abstract class Watcher {

    protected proxy: any;

    protected watching: WatcherItem[] = [];

    public constructor(masterObject: any, handler: ProxyHandler<any>) {
        var self = this;
        var mainHandler = {
            get: function (obj, prop) {
                return prop in obj ? obj[prop] : null;
            },
            set: function (obj, prop, value, receiver) {
                if (prop in obj) {
                    if (obj[prop] != value) {
                        self.watching.forEach(item => {
                            if (prop == item.name && WatcherType.Changed == item.type) {
                                item.callback(obj[prop], value);
                            }
                        });
                    }
                    obj[prop] = value;
                    if (handler && typeof handler.set == 'function') {
                        handler.set(obj, prop, value, receiver);
                    }
                }
                return true;
            },
            defineProperty: function (obj, prop, value): boolean {
                obj[prop] = value.value;
                return true;
            },
            deleteProperty: function (obj, prop): boolean {
                self.watching.forEach(item => {
                    if (prop == item.name) {
                        item.callback();
                        var idx = self.watching.indexOf(item);
                        self.watching.splice(idx, 1);
                    }
                });
                return true;
            }
        }
        this.proxy = new Proxy<any>(masterObject, mainHandler);
    }

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
    protected create(watch: string, defaultValue: any = null, callback: Function = null, type: WatcherType = WatcherType.Default): this {
        this.watching.push(new WatcherItem(watch, type, callback));
        if (!(watch in this.proxy)) {
            Object.defineProperty(this.proxy, watch, { value: defaultValue });
        }
        return this;
    }

    /**
     * Starts listening for changes
     *
     * @returns {*}
     */
    public listen(): any {
        return this.proxy;
    }

}

/**
 * The type of watch object
 *
 * @export
 * @enum {number}
 */
export enum WatcherType { Changed, Default }

/**
 * A watch object that can watch an object
 *
 * @export
 * @class Watch
 * @extends {Watcher}
 */
export class Watch extends Watcher {

    /**
     * This this event gets triggered every time a particular value has changed
     *
     * @param {string} watch
     * @param {Function} callback
     * @returns {this}
     */
    public changed(watch: string, callback: Function): this {
        return this.create(watch, null, callback, WatcherType.Changed);
    }

    /**
     * This event gets triggered when a value gets destroyed
     *
     * @param {string} watch
     * @param {Function} callback
     * @returns {this}
     */
    public destroyed(watch: string, callback: Function): this {
        return this.create(watch, null, callback);
    }

}

class WatcherItem {

    public name: string;
    public type: WatcherType;
    public callback: Function;

    public constructor(name: string, type: WatcherType, callback: Function) {
        this.name = name;
        this.type = type;
        this.callback = callback;
    }

}