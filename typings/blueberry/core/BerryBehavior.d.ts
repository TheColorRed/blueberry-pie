import { Component } from './Component';
export declare class BerryBehavior extends Component {
    private _becameEnabled;
    isEnabled: boolean;
    lastFrameEnabled: boolean;
    becameEnabled: boolean;
    each(callback: Function): this;
}
