import { BerryObject } from './BerryObject';
export declare class BerryGroup {
    private berries;
    add(berry: BerryObject): this;
    name(value: string): this;
    tag(value: string): this;
    addComponent(value: string, options?: {
        any: any;
    }): this;
    private setAttribute(key, value);
}
