export class Settings {

    ////////////////////////////////////////////////////////////////////////////
    // Runtime settings
    ////////////////////////////////////////////////////////////////////////////
    /**
     * The number of ticks per second
     *
     * @static
     * @type {number}
     */
    public static fps: number = 240;

    ////////////////////////////////////////////////////////////////////////////
    // Display settings
    ////////////////////////////////////////////////////////////////////////////
    /**
     * The type of unit to use by default
     *
     * @static
     * @type {string}
     */
    public static units: string = 'px';

    /**
     * Creates a new setting or updates an existing one
     *
     * @static
     * @param {string} key
     * @param {*} value
     * @returns {Settings}
     */
    public static set(key: string, value: any): Settings {
        Settings[key] = value;
        return Settings;
    }

    /**
     * Resets a builtin setting to its original value
     *
     * @static
     * @param {string} [key=null]
     * @returns {Settings}
     */
    public static reset(key: string = null): Settings {
        if (key === 'fps' || key === null) { Settings.fps = 240; }
        if (key === 'units' || key === null) { Settings.units = 'px'; }
        return Settings;
    }

}