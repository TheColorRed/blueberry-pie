import { BerryObject } from './BerryObject';
import { Component } from './Component';

interface IItem {
    setBerryObject(berryObject: BerryObject): void;
}

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
    public hasStarted: boolean = false;
    public hasAwaken: boolean = false;
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

    public static destroy(item: Item, delay: number = 0) {
        item.shouldDestroy = true;
        item.destroyDelay = delay;
    }
}