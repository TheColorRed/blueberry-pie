import { Berry } from './Berry.ts';
import { BerryBehavior } from './BerryBehavior.ts';

export class Component extends Berry {

    public options: any;
    public behavior: Component;

    public constructor(componentName?: string) {
        super();
        this.componentName = componentName;
    }

}