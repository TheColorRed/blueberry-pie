import { Berry } from './Berry';
import { Item } from './Item';
import { Component } from './Component'
import { BerryManager } from './managers/BerryManager'

export class BerryBehavior extends Component {

    private _becameEnabled: boolean = false;
    private _deltaTime: number = 0;

    public hasAwaken: boolean = false;
    public hasStarted: boolean = false;
    public isEnabled: boolean = false;
    public lastFrameEnabled: boolean = false;

    protected get deltaTime(): number {
        return this._deltaTime;
    }


    public get becameEnabled(): boolean {
        return this._becameEnabled;
    }

    public each(callback: Function): this {
        BerryManager.berries.forEach(berry => {
            callback(berry);
        });
        return this;
    }

    public setDeltaTime(delta: number): void {
        this._deltaTime = delta;
    }

}





