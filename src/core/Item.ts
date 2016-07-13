import { BerryObject } from './BerryObject';
import { Component } from './Component';
import { Vector2 } from '../utils/Vector';
import { Color } from '../utils/Color/Color';

export class Item {

    public name: string = '';
    public tag: string = '';

    protected componentName: string;
    protected components: Component[] = [];
    protected berry: HTMLElement;
    protected _berryObject: BerryObject;

    public isEnabled: boolean = true;
    public shouldDisable: boolean = false;
    public shouldEnable: boolean = false;
    public lastFrameEnabled: boolean = false;
    public isVisible: boolean = false;

    public shouldDestroy: boolean = false;
    public destroyDelay: number = 0;

    public get berryObject(): BerryObject {
        return this._berryObject;
    }

    public setBerry(berry: HTMLElement): void {
        this.berry = berry;
    }

    public get htmlBerry(): HTMLElement {
        return this.berry;
    }


    public setBerryObject(berryObject: BerryObject): void {
        this._berryObject = berryObject;
    }

    public getComponents(): Component[] {
        return this.components;
    }

    public get localPosition(): Vector2 {
        var rect = this.clientRect();
        return new Vector2(rect.left, rect.top);
    }

    public get localScale(): Vector2 {
        var rect = this.clientRect();
        return new Vector2(rect.width, rect.height);
    }

    public get backgroundColor(): Color {
        var element: HTMLElement;
        try {
            element = this.htmlBerry;
        } catch (e) {
            element = this.berryObject.htmlBerry;
        }
        var color: string = window.getComputedStyle(element).backgroundColor;
        var c = color.replace(/[a-z \(\)]/g, '').split(',');
        return new Color(parseInt(c[0]), parseInt(c[1]), parseInt(c[2]));
    }

    public static destroy(item: Item, delay: number = 0) {
        item.shouldDestroy = true;
        item.destroyDelay = delay;
    }

    private clientRect(): ClientRect {
        var rect: ClientRect;
        try {
            rect = this.htmlBerry.getBoundingClientRect();
        } catch (e) {
            rect = this.berryObject.htmlBerry.getBoundingClientRect();
        }
        return rect;
    }

}