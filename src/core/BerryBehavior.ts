import { Berry } from './Berry.ts';
import { Object } from './Object.ts';
import { Component } from './Component.ts'
import { BerryManager } from './managers/BerryManager.ts'

export class BerryBehavior extends Component {

    public each(callback: Function): this {
        BerryManager.berries.forEach(berry => {
            callback(berry);
        });
        return this;
    }

    public sendMessage(name: string) {

    }

}





