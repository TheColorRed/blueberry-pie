import { Berry } from './Berry';
import { Item } from './Item';
import { Component } from './Component'
import { BerryManager } from './managers/BerryManager'

export class BerryBehavior extends Component {

    public each(callback: Function): this {
        BerryManager.berries.forEach(berry => {
            callback(berry);
        });
        return this;
    }

    public sendMessage(name: string) {
        this.behavior.components.forEach(comp => {
            // if (typeof comp.behavior[name] == 'function') {
                comp.behavior[name]();
            // }
        });
    }

    // Automatic events
    public awake() { }
    public onEnable() { }
    public start() { }

    // User generated events
    public click(button?: number) { }
    public mouseover() { }
    public mouseout() { }
    public hover() { }

}





