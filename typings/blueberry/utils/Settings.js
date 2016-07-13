export class Settings {
    /**
     * Creates a new setting or updates an existing one
     *
     * @static
     * @param {string} key
     * @param {*} value
     * @returns {Settings}
     */
    static set(key, value) {
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
    static reset(key = null) {
        if (key === 'fps' || key === null) {
            Settings.fps = 240;
        }
        if (key === 'units' || key === null) {
            Settings.units = 'px';
        }
        return Settings;
    }
}
////////////////////////////////////////////////////////////////////////////
// Runtime settings
////////////////////////////////////////////////////////////////////////////
/**
 * The number of ticks per second
 *
 * @static
 * @type {number}
 */
Settings.fps = 240;
////////////////////////////////////////////////////////////////////////////
// Display settings
////////////////////////////////////////////////////////////////////////////
/**
 * The type of unit to use by default
 *
 * @static
 * @type {string}
 */
Settings.units = 'px';
