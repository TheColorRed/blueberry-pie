import { BerryObject } from '../BerryObject';
export declare class BerryManager {
    protected static _berries: BerryObject[];
    static berries: BerryObject[];
    static setBerries(berries: BerryObject[]): void;
    static addBerry(berry: BerryObject): void;
    static removeBerry(berry: BerryObject): void;
}
