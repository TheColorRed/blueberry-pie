import { Watch } from './Watcher';
export function when(key, startValue) {
    return new When({}, key, startValue);
}
export class When extends Watch {
    constructor(masterObject, a, defaultValue) {
        super(masterObject, {
            set: function (obj, prop, value, receiver) {
                if (obj[$this.a] == obj[$this.b] && !$this.ranEqualCallback) {
                    if (typeof $this.equalsCallback == 'function') {
                        $this.equalsCallback();
                    }
                    $this.ranEqualCallback = true;
                }
                if (obj[$this.a] != obj[$this.b] && !$this.ranNotEqualCallback) {
                    if (typeof $this.notEqualCallback == 'function') {
                        $this.notEqualCallback();
                    }
                    $this.ranNotEqualCallback = true;
                }
                if (obj[$this.a] > obj[$this.b] && !$this.ranGreaterThanCallback) {
                    if (typeof $this.greaterThanCallback == 'function') {
                        $this.greaterThanCallback();
                    }
                    $this.ranGreaterThanCallback = true;
                }
                if (obj[$this.a] >= obj[$this.b] && !$this.ranGreaterThanOrEqualCallback) {
                    if (typeof $this.greaterThanOrEqualCallback == 'function') {
                        $this.greaterThanOrEqualCallback();
                    }
                    $this.ranGreaterThanOrEqualCallback = true;
                }
                if (obj[$this.a] < obj[$this.b] && !$this.ranLessThanCallback) {
                    if (typeof $this.lessThanCallback == 'function') {
                        $this.lessThanCallback();
                    }
                    $this.ranLessThanCallback = true;
                }
                if (obj[$this.a] <= obj[$this.b] && !$this.ranLessThanOrEqualCallback) {
                    if (typeof $this.lessThanOrEqualCallback == 'function') {
                        $this.lessThanOrEqualCallback();
                    }
                    $this.ranLessThanOrEqualCallback = true;
                }
                return true;
            }
        });
        this.a = null;
        this.b = null;
        this.aPrev = null;
        this.bPrev = null;
        this.ranEqualCallback = false;
        this.ranNotEqualCallback = false;
        this.ranGreaterThanCallback = false;
        this.ranGreaterThanOrEqualCallback = false;
        this.ranLessThanCallback = false;
        this.ranLessThanOrEqualCallback = false;
        var $this = this;
        this.a = a;
        this.create(a, defaultValue);
    }
    /**
     * When a == b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    equals(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.equalsCallback = callback;
        return this;
    }
    /**
     * When a != b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    notEqual(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.notEqualCallback = callback;
        return this;
    }
    /**
     * When a > b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    greaterThan(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.greaterThanCallback = callback;
        return this;
    }
    /**
     * When a >= b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    greaterThanOrEqual(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.greaterThanOrEqualCallback = callback;
        return this;
    }
    /**
     * When a < b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    lessThan(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.lessThanCallback = callback;
        return this;
    }
    /**
     * When a <= b
     *
     * @param {string} b
     * @param {*} defaultValue
     * @param {Function} callback
     * @returns {this}
     */
    lessThanOrEqual(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.lessThanOrEqualCallback = callback;
        return this;
    }
}
