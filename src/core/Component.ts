import { Berry } from './Berry';
import { BerryBehavior } from './BerryBehavior';

export class Component extends Berry {

    public options: any;
    public behavior: BerryBehavior;

    public hasStarted: boolean = false;
    public hasAwaken: boolean = false;

    public constructor(componentName?: string) {
        super();
        this.componentName = componentName;
    }

}