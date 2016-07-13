import { BerryManager } from './managers/BerryManager';
export class BerryGroup {
    constructor() {
        this.berries = [];
    }
    add(berry) {
        this.berries.push(berry);
        BerryManager.addBerry(berry);
        return this;
    }
    name(value) {
        this.setAttribute('blueberry', value);
        this.berries.forEach(berry => {
            berry.name = value;
        });
        return this;
    }
    tag(value) {
        this.setAttribute('tag', value);
        this.berries.forEach(berry => {
            berry.tag = value;
        });
        return this;
    }
    addComponent(value, options) {
        this.berries.forEach(berry => {
            berry.addComponent(value, options);
        });
        return this;
    }
    setAttribute(key, value) {
        this.berries.forEach(berry => {
            berry.htmlBerry.setAttribute(key, value);
        });
    }
}
