import { Berry } from './Berry';
import { Item } from './Item';
import { Component } from './Component'
import { BerryManager } from './managers/BerryManager'
import { When } from '../utils/When'

export class BerryBehavior extends Component {

    private _becameEnabled: boolean = false;

    public isEnabled: boolean = false;
    public lastFrameEnabled: boolean = false;

    public get becameEnabled(): boolean {
        return this._becameEnabled;
    }

    public each(callback: Function): this {
        BerryManager.berries.forEach(berry => {
            callback(berry);
        });
        return this;
    }

}





