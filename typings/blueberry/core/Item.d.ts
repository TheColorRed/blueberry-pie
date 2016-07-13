import { BerryObject } from './BerryObject';
import { Component } from './Component';
import { Vector2 } from '../utils/Vector';
import { Color } from '../utils/Color/Color';
export declare class Item {
    name: string;
    tag: string;
    protected componentName: string;
    protected components: Component[];
    protected berry: HTMLElement;
    protected _berryObject: BerryObject;
    isEnabled: boolean;
    shouldDisable: boolean;
    shouldEnable: boolean;
    lastFrameEnabled: boolean;
    isVisible: boolean;
    shouldDestroy: boolean;
    destroyDelay: number;
    berryObject: BerryObject;
    setBerry(berry: HTMLElement): void;
    htmlBerry: HTMLElement;
    setBerryObject(berryObject: BerryObject): void;
    getComponents(): Component[];
    localPosition: Vector2;
    localScale: Vector2;
    backgroundColor: Color;
    static destroy(item: Item, delay?: number): void;
    private clientRect();
}
