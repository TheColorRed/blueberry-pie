import { ColorBlend, BlendType } from './ColorBlend';
export class Color {
    constructor(r, g, b, a = 1) {
        if (typeof r == 'string') {
            var c = Color.rgb(r);
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = a;
        }
        else {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
    }
    hex() {
        var hexr = this.r.toString(16);
        var hexg = this.g.toString(16);
        var hexb = this.b.toString(16);
        var r = hexr.length == 1 ? "0" + hexr : hexr;
        var g = hexg.length == 1 ? "0" + hexg : hexg;
        var b = hexb.length == 1 ? "0" + hexb : hexb;
        return r + g + b;
    }
    static rgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16));
    }
    blend(color, blendType) {
        return Color.blend(this, color, blendType);
    }
    static blend(color1, color2, blendType) {
        var r, g, b;
        switch (blendType) {
            case BlendType.Normal:
                r = ColorBlend.normal(color1.r, color2.r);
                g = ColorBlend.normal(color1.g, color2.g);
                b = ColorBlend.normal(color1.b, color2.b);
                break;
            case BlendType.Lighten:
                r = ColorBlend.lighten(color1.r, color2.r);
                g = ColorBlend.lighten(color1.g, color2.g);
                b = ColorBlend.lighten(color1.b, color2.b);
                break;
            case BlendType.Darken:
                r = ColorBlend.darken(color1.r, color2.r);
                g = ColorBlend.darken(color1.g, color2.g);
                b = ColorBlend.darken(color1.b, color2.b);
                break;
            case BlendType.Multiply:
                r = ColorBlend.multiply(color1.r, color2.r);
                g = ColorBlend.multiply(color1.g, color2.g);
                b = ColorBlend.multiply(color1.b, color2.b);
                break;
            case BlendType.Average:
                r = ColorBlend.average(color1.r, color2.r);
                g = ColorBlend.average(color1.g, color2.g);
                b = ColorBlend.average(color1.b, color2.b);
                break;
            case BlendType.Add:
                r = ColorBlend.add(color1.r, color2.r);
                g = ColorBlend.add(color1.g, color2.g);
                b = ColorBlend.add(color1.b, color2.b);
                break;
            case BlendType.Subtract:
                r = ColorBlend.subtract(color1.r, color2.r);
                g = ColorBlend.subtract(color1.g, color2.g);
                b = ColorBlend.subtract(color1.b, color2.b);
                break;
            case BlendType.Difference:
                r = ColorBlend.difference(color1.r, color2.r);
                g = ColorBlend.difference(color1.g, color2.g);
                b = ColorBlend.difference(color1.b, color2.b);
                break;
            case BlendType.Negation:
                r = ColorBlend.negation(color1.r, color2.r);
                g = ColorBlend.negation(color1.g, color2.g);
                b = ColorBlend.negation(color1.b, color2.b);
                break;
            case BlendType.Screen:
                r = ColorBlend.screen(color1.r, color2.r);
                g = ColorBlend.screen(color1.g, color2.g);
                b = ColorBlend.screen(color1.b, color2.b);
                break;
            case BlendType.Exclusion:
                r = ColorBlend.exclusion(color1.r, color2.r);
                g = ColorBlend.exclusion(color1.g, color2.g);
                b = ColorBlend.exclusion(color1.b, color2.b);
                break;
            case BlendType.Overlay:
                r = ColorBlend.overlay(color1.r, color2.r);
                g = ColorBlend.overlay(color1.g, color2.g);
                b = ColorBlend.overlay(color1.b, color2.b);
                break;
            case BlendType.SoftLight:
                r = ColorBlend.softLight(color1.r, color2.r);
                g = ColorBlend.softLight(color1.g, color2.g);
                b = ColorBlend.softLight(color1.b, color2.b);
                break;
            case BlendType.HardLight:
                r = ColorBlend.hardLight(color1.r, color2.r);
                g = ColorBlend.hardLight(color1.g, color2.g);
                b = ColorBlend.hardLight(color1.b, color2.b);
                break;
            case BlendType.ColorDodge:
                r = ColorBlend.colorDodge(color1.r, color2.r);
                g = ColorBlend.colorDodge(color1.g, color2.g);
                b = ColorBlend.colorDodge(color1.b, color2.b);
                break;
            case BlendType.ColorBurn:
                r = ColorBlend.colorBurn(color1.r, color2.r);
                g = ColorBlend.colorBurn(color1.g, color2.g);
                b = ColorBlend.colorBurn(color1.b, color2.b);
                break;
            case BlendType.LinearDodge:
                r = ColorBlend.linearDodge(color1.r, color2.r);
                g = ColorBlend.linearDodge(color1.g, color2.g);
                b = ColorBlend.linearDodge(color1.b, color2.b);
                break;
            case BlendType.LinearBurn:
                r = ColorBlend.linearBurn(color1.r, color2.r);
                g = ColorBlend.linearBurn(color1.g, color2.g);
                b = ColorBlend.linearBurn(color1.b, color2.b);
                break;
            case BlendType.LinearLight:
                r = ColorBlend.linearLight(color1.r, color2.r);
                g = ColorBlend.linearLight(color1.g, color2.g);
                b = ColorBlend.linearLight(color1.b, color2.b);
                break;
            case BlendType.VividLight:
                r = ColorBlend.vividLight(color1.r, color2.r);
                g = ColorBlend.vividLight(color1.g, color2.g);
                b = ColorBlend.vividLight(color1.b, color2.b);
                break;
            case BlendType.PinLight:
                r = ColorBlend.pinLight(color1.r, color2.r);
                g = ColorBlend.pinLight(color1.g, color2.g);
                b = ColorBlend.pinLight(color1.b, color2.b);
                break;
            case BlendType.HardMix:
                r = ColorBlend.hardMix(color1.r, color2.r);
                g = ColorBlend.hardMix(color1.g, color2.g);
                b = ColorBlend.hardMix(color1.b, color2.b);
                break;
            case BlendType.Reflect:
                r = ColorBlend.reflect(color1.r, color2.r);
                g = ColorBlend.reflect(color1.g, color2.g);
                b = ColorBlend.reflect(color1.b, color2.b);
                break;
            case BlendType.Glow:
                r = ColorBlend.glow(color1.r, color2.r);
                g = ColorBlend.glow(color1.g, color2.g);
                b = ColorBlend.glow(color1.b, color2.b);
                break;
            case BlendType.Phoenix:
                r = ColorBlend.phoenix(color1.r, color2.r);
                g = ColorBlend.phoenix(color1.g, color2.g);
                b = ColorBlend.phoenix(color1.b, color2.b);
                break;
        }
        return new Color(r, g, b);
    }
    get invert() {
        var r = Math.abs(this.r - 255);
        var g = Math.abs(this.g - 255);
        var b = Math.abs(this.b - 255);
        return new Color(r, g, b);
    }
    get luminance() {
        return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b;
    }
    get grayscale() {
        return (this.r + this.g + this.b) / 3;
    }
    get maxColorComponent() {
        return Math.max(this.r, this.g, this.b);
    }
    // Reds
    static get indianRed() { return new Color(205, 92, 92); }
    static get lightCoral() { return new Color(240, 128, 128); }
    static get salmon() { return new Color(250, 128, 114); }
    static get darkSalmon() { return new Color(233, 150, 122); }
    static get crimson() { return new Color(220, 20, 60); }
    static get red() { return new Color(255, 0, 0); }
    static get firebrick() { return new Color(178, 34, 34); }
    static get darkRed() { return new Color(139, 0, 0); }
    // Pinks
    static get pink() { return new Color(255, 192, 203); }
    static get lightPink() { return new Color(255, 182, 193); }
    static get hotPink() { return new Color(255, 105, 180); }
    static get deepPink() { return new Color(255, 20, 147); }
    static get mediumViolet() { return new Color(199, 21, 133); }
    static get paleViolet() { return new Color(219, 112, 147); }
    //Oranges
    static get lightSalmon() { return new Color(255, 160, 122); }
    static get coral() { return new Color(255, 127, 80); }
    static get tomato() { return new Color(255, 99, 71); }
    static get orangeRed() { return new Color(255, 69, 0); }
    static get darkOrange() { return new Color(255, 140, 0); }
    static get orange() { return new Color(255, 165, 0); }
    // Yellows
    static get gold() { return new Color(255, 215, 0); }
    static get yellow() { return new Color(255, 215, 0); }
    static get lightYellow() { return new Color(255, 255, 224); }
    static get lemonChiffon() { return new Color(255, 250, 205); }
    static get lightGoldenRodYellow() { return new Color(250, 250, 210); }
    static get papayWhip() { return new Color(255, 239, 213); }
    static get moccasin() { return new Color(255, 228, 181); }
    static get peachPuff() { return new Color(255, 218, 185); }
    static get paleGoldenRod() { return new Color(238, 232, 170); }
    static get khaki() { return new Color(240, 230, 140); }
    static get darkKhaki() { return new Color(189, 183, 107); }
    // Purples
    static get lavender() { return new Color(230, 230, 250); }
    static get thistle() { return new Color(216, 191, 216); }
    static get plum() { return new Color(221, 160, 221); }
    static get violet() { return new Color(238, 130, 238); }
    static get orchid() { return new Color(218, 112, 214); }
    static get fuchsia() { return new Color(255, 0, 255); }
    static get magenta() { return new Color(255, 0, 255); }
    static get mediumOrchid() { return new Color(186, 85, 211); }
    static get mediumPurple() { return new Color(147, 112, 219); }
    static get rebeccaPurple() { return new Color(102, 51, 153); }
    static get blueViolet() { return new Color(138, 43, 226); }
    static get darkViolet() { return new Color(148, 0, 211); }
    static get darkOrchid() { return new Color(153, 50, 204); }
    static get darkMagenta() { return new Color(139, 0, 139); }
    static get purple() { return new Color(128, 0, 128); }
    static get indigo() { return new Color(75, 0, 130); }
    static get slateBlue() { return new Color(106, 90, 205); }
    static get darkSlateBlue() { return new Color(72, 61, 139); }
    // Greens
    static get greenYellow() { return new Color(173, 255, 47); }
    static get chartreuse() { return new Color(127, 255, 0); }
    static get lawnGreen() { return new Color(124, 252, 0); }
    static get lime() { return new Color(0, 255, 0); }
    static get limeGreen() { return new Color(50, 205, 50); }
    static get paleGreen() { return new Color(152, 251, 152); }
    static get lightGreen() { return new Color(144, 238, 144); }
    static get mediumSpringGreen() { return new Color(0, 250, 154); }
    static get springGreen() { return new Color(0, 255, 127); }
    static get mediumSeaGreen() { return new Color(60, 179, 113); }
    static get seaGreen() { return new Color(60, 179, 113); }
    static get forestGreen() { return new Color(34, 139, 34); }
    static get green() { return new Color(0, 128, 0); }
    static get darkGreen() { return new Color(0, 100, 0); }
    static get yellowGreen() { return new Color(154, 205, 50); }
    static get oliveDrab() { return new Color(107, 142, 35); }
    static get olive() { return new Color(128, 128, 0); }
    static get darkOliveGreen() { return new Color(85, 107, 47); }
    static get mediumAquaMarine() { return new Color(102, 205, 170); }
    static get darkSeaGreen() { return new Color(143, 188, 139); }
    static get lightSeaGreen() { return new Color(32, 178, 170); }
    static get darkCyan() { return new Color(0, 139, 139); }
    static get teal() { return new Color(0, 128, 128); }
    // Blues
    static get cyan() { return new Color(0, 255, 255); }
    static get lightCyan() { return new Color(224, 255, 255); }
    static get paleTurquoise() { return new Color(175, 238, 238); }
    static get aquaMarine() { return new Color(127, 255, 212); }
    static get turquoise() { return new Color(64, 224, 208); }
    static get mediumTurquoise() { return new Color(72, 209, 204); }
    static get darkTurquoise() { return new Color(0, 206, 209); }
    static get cadetBlue() { return new Color(95, 158, 160); }
    static get steelBlue() { return new Color(70, 130, 180); }
    static get lightSteelBlue() { return new Color(176, 196, 222); }
    static get powderBlue() { return new Color(176, 224, 230); }
    static get lightBlue() { return new Color(173, 216, 230); }
    static get skyBlue() { return new Color(135, 206, 235); }
    static get lightSkyBlue() { return new Color(135, 206, 250); }
    static get deepSkyBlue() { return new Color(0, 191, 255); }
    static get dodgerBlue() { return new Color(30, 144, 255); }
    static get cornFlowerBlue() { return new Color(100, 149, 237); }
    static get mediumSlateBlue() { return new Color(123, 104, 238); }
    static get royalBlue() { return new Color(65, 105, 225); }
    static get blue() { return new Color(0, 0, 255); }
    static get mediumBlue() { return new Color(0, 0, 205); }
    static get darkBlue() { return new Color(0, 0, 139); }
    static get navy() { return new Color(0, 0, 128); }
    static get midnighBlue() { return new Color(25, 25, 112); }
    // Browns
    static get cornSilk() { return new Color(255, 248, 220); }
    static get blanchedAlmond() { return new Color(255, 235, 205); }
    static get bisque() { return new Color(255, 228, 196); }
    static get navajoWhite() { return new Color(255, 222, 173); }
    static get wheat() { return new Color(245, 222, 179); }
    static get burlyWood() { return new Color(222, 184, 135); }
    static get tan() { return new Color(210, 180, 140); }
    static get rosyBrown() { return new Color(188, 143, 143); }
    static get sandyBrown() { return new Color(244, 164, 96); }
    static get goldenRod() { return new Color(218, 165, 32); }
    static get darkGoldenRod() { return new Color(184, 134, 11); }
    static get peru() { return new Color(205, 133, 63); }
    static get chocolate() { return new Color(210, 105, 30); }
    static get saddleBrown() { return new Color(139, 69, 19); }
    static get sienna() { return new Color(160, 82, 45); }
    static get brown() { return new Color(165, 42, 42); }
    static get maroon() { return new Color(128, 0, 0); }
    // Whites
    static get white() { return new Color(255, 255, 255); }
    static get snow() { return new Color(255, 250, 250); }
    static get honeyDew() { return new Color(240, 255, 240); }
    static get mintCream() { return new Color(245, 255, 250); }
    static get azure() { return new Color(240, 255, 255); }
    static get aliceBlue() { return new Color(240, 248, 255); }
    static get ghostWhite() { return new Color(248, 248, 255); }
    static get whiteSmoke() { return new Color(245, 245, 245); }
    static get seaShell() { return new Color(255, 245, 238); }
    static get beige() { return new Color(245, 245, 220); }
    static get oldLace() { return new Color(253, 245, 230); }
    static get floralWhite() { return new Color(255, 250, 240); }
    static get ivory() { return new Color(255, 255, 240); }
    static get antiqueWhite() { return new Color(250, 235, 215); }
    static get linen() { return new Color(250, 240, 230); }
    static get lavenderBlush() { return new Color(255, 240, 245); }
    static get mistyRose() { return new Color(255, 228, 225); }
    // Grays
    static get gainsBoro() { return new Color(220, 220, 220); }
    static get lightGray() { return new Color(211, 211, 211); }
    static get silver() { return new Color(192, 192, 192); }
    static get darkGray() { return new Color(169, 169, 169); }
    static get gray() { return new Color(128, 128, 128); }
    static get dimGray() { return new Color(105, 105, 105); }
    static get lightSlateGray() { return new Color(119, 136, 153); }
    static get slateGray() { return new Color(112, 128, 144); }
    static get darkSlateGray() { return new Color(47, 79, 79); }
    static get black() { return new Color(0, 0, 0); }
}
