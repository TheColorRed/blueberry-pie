import { BerryObject } from '../BerryObject';


export class BerryManager {

    protected static _berries: BerryObject[] = [];

    public static get berries(): BerryObject[] {
        return BerryManager._berries;
    }

    public static setBerries(berries: BerryObject[]) {
        BerryManager._berries = berries;
    }

    public static addBerry(berry: BerryObject) {
        BerryManager._berries.push(berry);
    }
}