export abstract class Watcher {

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

    public listen() {
        return this.proxy;
    }

}

export function watch(object: any = {}, handler: ProxyHandler<any> = null) {
    return new Watch(object, handler);
}

export class Watch extends Watcher {

    public changed(watch: string, callback: Function): this {
        this.watching.push(new WatcherItem(watch, WatcherType.Changed, callback));
        if (!(watch in this.proxy)) {
            Object.defineProperty(this.proxy, watch, { configurable: true, enumerable: true, value: null });
        }
        return this;
    }

    public destroyed(watch: string, callback: Function): this {
        this.watching.push(new WatcherItem(watch, WatcherType.Destroyed, callback));
        if (!(watch in this.proxy)) {
            Object.defineProperty(this.proxy, watch, { configurable: true, enumerable: true, value: null });
        }
        return this;
    }

}

enum WatcherType { Changed, Destroyed }

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