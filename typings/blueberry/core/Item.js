import { Vector2 } from '../utils/Vector';
import { Color } from '../utils/Color/Color';
export class Item {
    constructor() {
        this.name = '';
        this.tag = '';
        this.components = [];
        this.isEnabled = true;
        this.shouldDisable = false;
        this.shouldEnable = false;
        this.lastFrameEnabled = false;
        this.isVisible = false;
        this.shouldDestroy = false;
        this.destroyDelay = 0;
    }
    get berryObject() {
        return this._berryObject;
    }
    setBerry(berry) {
        this.berry = berry;
    }
    get htmlBerry() {
        return this.berry;
    }
    setBerryObject(berryObject) {
        this._berryObject = berryObject;
    }
    getComponents() {
        return this.components;
    }
    get localPosition() {
        var rect = this.clientRect();
        return new Vector2(rect.left, rect.top);
    }
    get localScale() {
        var rect = this.clientRect();
        return new Vector2(rect.width, rect.height);
    }
    get backgroundColor() {
        var element;
        try {
            element = this.htmlBerry;
        }
        catch (e) {
            element = this.berryObject.htmlBerry;
        }
        var color = window.getComputedStyle(element).backgroundColor;
        var c = color.replace(/[a-z \(\)]/g, '').split(',');
        return new Color(parseInt(c[0]), parseInt(c[1]), parseInt(c[2]));
    }
    static destroy(item, delay = 0) {
        item.shouldDestroy = true;
        item.destroyDelay = delay;
    }
    clientRect() {
        var rect;
        try {
            rect = this.htmlBerry.getBoundingClientRect();
        }
        catch (e) {
            rect = this.berryObject.htmlBerry.getBoundingClientRect();
        }
        return rect;
    }
}
