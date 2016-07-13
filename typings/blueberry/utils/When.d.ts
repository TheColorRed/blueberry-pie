import { Watch } from './Watcher';
export declare function when(key: any, startValue: any): When;
export declare class When extends Watch {
    private a;
    private b;
    private aPrev;
    private bPrev;
    private equalsCallback;
    private notEqualCallback;
    private greaterThanCallback;
    private greaterThanOrEqualCallback;
    private lessThanCallback;
    private lessThanOrEqualCallback;
    private ranEqualCallback;
    private ranNotEqualCallback;
    private ranGreaterThanCallback;
    private ranGreaterThanOrEqualCallback;
    private ranLessThanCallback;
    private ranLessThanOrEqualCallback;
    constructor(masterObject: any, a: string, defaultValue: any);
    /**
     * When a == b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    equals(b: string, defaultValue: any, callback: Function): this;
    /**
     * When a != b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    notEqual(b: string, defaultValue: any, callback: Function): this;
    /**
     * When a > b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    greaterThan(b: string, defaultValue: any, callback: Function): this;
    /**
     * When a >= b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    greaterThanOrEqual(b: string, defaultValue: any, callback: Function): this;
    /**
     * When a < b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    lessThan(b: string, defaultValue: any, callback: Function): this;
    /**
     * When a <= b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    lessThanOrEqual(b: string, defaultValue: any, callback: Function): this;
}
