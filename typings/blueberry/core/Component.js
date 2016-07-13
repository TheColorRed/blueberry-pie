import { Berry } from './Berry';
export class Component extends Berry {
    constructor(componentName) {
        super();
        this.hasStarted = false;
        this.hasAwaken = false;
        this.componentName = componentName;
    }
}
