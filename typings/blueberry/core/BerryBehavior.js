import { Component } from './Component';
import { BerryManager } from './managers/BerryManager';
export class BerryBehavior extends Component {
    constructor(...args) {
        super(...args);
        this._becameEnabled = false;
        this.isEnabled = false;
        this.lastFrameEnabled = false;
    }
    get becameEnabled() {
        return this._becameEnabled;
    }
    each(callback) {
        BerryManager.berries.forEach(berry => {
            callback(berry);
        });
        return this;
    }
}
