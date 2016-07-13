export declare class Settings {
    /**
     * The number of ticks per second
     *
     * @static
     * @type {number}
     */
    static fps: number;
    /**
     * The type of unit to use by default
     *
     * @static
     * @type {string}
     */
    static units: string;
    /**
     * Creates a new setting or updates an existing one
     *
     * @static
     * @param {string} key
     * @param {*} value
     * @returns {Settings}
     */
    static set(key: string, value: any): Settings;
    /**
     * Resets a builtin setting to its original value
     *
     * @static
     * @param {string} [key=null]
     * @returns {Settings}
     */
    static reset(key?: string): Settings;
}
