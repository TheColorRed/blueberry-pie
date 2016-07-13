/**
 * Creates a new watch object
 *
 * @export
 * @param {*} [object={}]
 * @param {ProxyHandler<any>} [handler=null]
 * @returns {Watch}
 */
export function watch(object = {}, handler = null) {
    return new Watch(object, handler);
}
/**
 * The main watch object, the place where the magic happens
 *
 * @abstract
 * @class Watcher
 */
export class Watcher {
    constructor(masterObject, handler) {
        this.watching = [];
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
            defineProperty: function (obj, prop, value) {
                obj[prop] = value.value;
                return true;
            },
            deleteProperty: function (obj, prop) {
                self.watching.forEach(item => {
                    if (prop == item.name) {
                        item.callback();
                        var idx = self.watching.indexOf(item);
                        self.watching.splice(idx, 1);
                    }
                });
                return true;
            }
        };
        this.proxy = new Proxy(masterObject, mainHandler);
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
    create(watch, defaultValue = null, callback = null, type = WatcherType.Default) {
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
    listen() {
        return this.proxy;
    }
}
/**
 * The type of watch object
 *
 * @export
 * @enum {number}
 */
export var WatcherType;
(function (WatcherType) {
    WatcherType[WatcherType["Changed"] = 0] = "Changed";
    WatcherType[WatcherType["Default"] = 1] = "Default";
})(WatcherType || (WatcherType = {}));
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
    changed(watch, callback) {
        return this.create(watch, null, callback, WatcherType.Changed);
    }
    /**
     * This event gets triggered when a value gets destroyed
     *
     * @param {string} watch
     * @param {Function} callback
     * @returns {this}
     */
    destroyed(watch, callback) {
        return this.create(watch, null, callback);
    }
}
export class WatcherItem {
    constructor(name, type, callback) {
        this.name = name;
        this.type = type;
        this.callback = callback;
    }
}
