import { BerryBehavior } from '../core/BerryBehavior.ts'

export class Effects extends BerryBehavior {

    public awake() {
        alert('Effects have awaken!');
    }

}