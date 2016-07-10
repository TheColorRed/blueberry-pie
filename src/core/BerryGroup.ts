import { BerryObject } from './BerryObject'
import { BerryManager } from './managers/BerryManager'

export class BerryGroup {

    private berries: BerryObject[] = [];

    public add(berry: BerryObject): this {
        this.berries.push(berry);
        BerryManager.addBerry(berry);
        return this;
    }

    public name(value: string): this {
        this.setAttribute('blueberry', value);
        this.berries.forEach(berry => {
            berry.name = value;
        });
        return this;
    }

    public tag(value: string): this {
        this.setAttribute('tag', value);
        this.berries.forEach(berry => {
            berry.tag = value;
        });
        return this;
    }

    public addComponent(value: string, options?: {any:any}): this {
        this.berries.forEach(berry => {
            berry.addComponent(value, options);
        });
        return this;
    }

    private setAttribute(key: string, value: string): void {
        this.berries.forEach(berry => {
            berry.htmlBerry.setAttribute(key, value);
        });
    }

}