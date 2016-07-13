import { Berry } from './Berry';
import { BerryBehavior } from './BerryBehavior';
export declare class Component extends Berry {
    options: any;
    behavior: BerryBehavior;
    hasStarted: boolean;
    hasAwaken: boolean;
    constructor(componentName?: string);
}
