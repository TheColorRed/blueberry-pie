import { Watch } from './Watcher';

export class When extends Watch {

    private a: string = null;
    private b: string = null;

    private aPrev: any = null;
    private bPrev: any = null;

    private equalsCallback: Function;
    private notEqualCallback: Function;
    private greaterThanCallback: Function;
    private greaterThanOrEqualCallback: Function;
    private lessThanCallback: Function;
    private lessThanOrEqualCallback: Function;

    private ranEqualCallback: boolean = false;
    private ranNotEqualCallback: boolean = false;
    private ranGreaterThanCallback: boolean = false;
    private ranGreaterThanOrEqualCallback: boolean = false;
    private ranLessThanCallback: boolean = false;
    private ranLessThanOrEqualCallback: boolean = false;

    public constructor(masterObject: any, a: string, defaultValue: any) {
        super(masterObject, {
            set: function (obj, prop, value, receiver): boolean {
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
            },
            defineProperty: function (obj, prop, value): boolean {
                obj[prop] = value;
                return true;
            }
        });
        var $this = this;

        this.a = a;
        this.proxy[a] = defaultValue;
    }

    public equals(b: string, defaultValue: any, callback: Function): this {
        this.b = b;
        this.proxy[b] = defaultValue;
        this.equalsCallback = callback;
        return this;
    }

    public notEqual(b: string, defaultValue: any, callback: Function): this {
        this.b = b;
        this.proxy[b] = defaultValue;
        this.notEqualCallback = callback;
        return this;
    }

    public greaterThan(b: string, defaultValue: any, callback: Function): this {
        this.b = b;
        this.proxy[b] = defaultValue;
        this.greaterThanCallback = callback;
        return this;
    }

    public greaterThanOrEqual(b: string, defaultValue: any, callback: Function): this {
        this.b = b;
        this.proxy[b] = defaultValue;
        this.greaterThanOrEqualCallback = callback;
        return this;
    }

    public lessThan(b: string, defaultValue: any, callback: Function): this {
        this.b = b;
        this.proxy[b] = defaultValue;
        this.lessThanCallback = callback;
        return this;
    }

    public lessThanOrEqual(b: string, defaultValue: any, callback: Function): this {
        this.b = b;
        this.proxy[b] = defaultValue;
        this.lessThanOrEqualCallback = callback;
        return this;
    }

}