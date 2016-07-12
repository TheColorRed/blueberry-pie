export class Color {

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    public constructor(r: any, g: number, b: number, a: number = 1) {
        if (typeof r == 'string') {
            var c: Color = Color.rgb(r);
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = a;
        } else {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
    }

    public hex(): string {
        var hexr = this.r.toString(16);
        var hexg = this.g.toString(16);
        var hexb = this.b.toString(16);
        var r = hexr.length == 1 ? "0" + hexr : hexr;
        var g = hexg.length == 1 ? "0" + hexg : hexg;
        var b = hexb.length == 1 ? "0" + hexb : hexb;
        return r + g + b;
    }

    public static rgb(hex: string): Color {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return new Color(
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        );

    }

    public static get red(): Color { return new Color(255, 0, 0); }
    public static get green(): Color { return new Color(0, 255, 0); }
    public static get blue(): Color { return new Color(0, 0, 255); }
    public static get black(): Color { return new Color(0, 0, 0); }
    public static get white(): Color { return new Color(255, 255, 255); }
    public static get yellow(): Color { return new Color(255, 255, 0); }
    public static get pink(): Color { return new Color(255, 0, 255); }
    public static get cyan(): Color { return new Color(0, 255, 255); }

}