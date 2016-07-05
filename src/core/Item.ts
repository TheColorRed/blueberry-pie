import { BerryObject } from './BerryObject';
import { Component } from './Component';

interface IItem {
    setBerryObject(berryObject: BerryObject): void;
}

export class Item implements IItem {

    public name: string = '';
    public tag: string = '';

    protected componentName: string;
    protected components: Component[] = [];
    protected berry: Element;
    protected _berryObject: BerryObject;

    public get berryObject(): BerryObject {
        return this._berryObject;
    }

    public setBerry(berry: Element): void {
        this.berry = berry;
    }

    public setBerryObject(berryObject: BerryObject): void {
        this._berryObject = berryObject;
    }

    public getComponents(): Component[] {
        return this.components;
    }

    // protected static berries: Berry[] = [];

    // public setBerries(berries: Berry[]): this {
    //     Object.berries = berries;
    //     return this;
    // }

    // public addBerry(berry: Berry): this {
    //     Object.berries.push(berry);
    //     return this;
    // }

}