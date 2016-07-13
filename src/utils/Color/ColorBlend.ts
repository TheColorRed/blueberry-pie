import { Color } from './Color';

export enum BlendType {
    Normal, Lighten, Darken, Multiply,
    Average, Add, Subtract, Difference,
    Negation, Screen, Exclusion, Overlay,
    SoftLight, HardLight, ColorDodge, ColorBurn,
    LinearDodge, LinearBurn, LinearLight,
    VividLight, PinLight, HardMix, Reflect,
    Glow, Phoenix
}

export class ColorBlend {

    public static normal(a: number, b: number): number {
        return a;
    }

    public static lighten(a: number, b: number): number {
        return (b > a) ? b : a;
    }

    public static darken(a: number, b: number): number {
        return (b > a) ? a : b;
    }

    public static multiply(a: number, b: number): number {
        return (a * b) / 255;
    }

    public static average(a: number, b: number): number {
        return (a + b) / 2;
    }

    public static add(a: number, b: number): number {
        return Math.min(255, (a + b));
    }

    public static subtract(a: number, b: number): number {
        return (a + b < 255) ? 0 : (a + b - 255);
    }

    public static difference(a: number, b: number): number {
        return Math.abs(a - b);
    }

    public static negation(a: number, b: number): number {
        return (255 - Math.abs(255 - a - b));
    }

    public static screen(a: number, b: number): number {
        return (255 - (((255 - a) * (255 - b)) >> 8));
    }

    public static exclusion(a: number, b: number): number {
        return a + b - 2 * a * b / 255;
    }

    public static overlay(a: number, b: number): number {
        return (b < 128) ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255);
    }

    public static softLight(a: number, b: number): number {
        return ((b < 128) ? (2 * ((a >> 1) + 64)) * (b/ 255):(255 - (2 * (255 - ((a >> 1) + 64)) * (255 - b) / 255)));
    }

    public static hardLight(a: number, b: number): number {
        return this.overlay(b, a);
    }

    public static colorDodge(a: number, b: number): number {
        return ((b == 255) ? b : Math.min(255, ((a << 8) / (255 - b))));
    }

    public static colorBurn(a: number, b: number): number {
        return ((b == 0) ? b : Math.max(0, (255 - ((255 - a) << 8) / b)));
    }

    public static linearDodge(a: number, b: number): number {
        return this.add(a, b);
    }

    public static linearBurn(a: number, b: number): number {
        return this.subtract(a, b);
    }

    public static linearLight(a: number, b: number): number {
        return (b < 128) ? this.linearBurn(a, (2 * b)) : this.linearDodge(a, (2 * (b - 128)));
    }

    public static vividLight(a: number, b: number): number {
        return (b < 128) ? this.colorBurn(a, (2 * b)) : this.colorDodge(a, (2 * (b - 128)));
    }

    public static pinLight(a: number, b: number): number {
        return (b < 128) ? this.darken(a, (2 * b)) : this.lighten(a, (2 * (b - 128)));
    }

    public static hardMix(a: number, b: number): number {
        return ((this.vividLight(a, b) < 128) ? 0 : 255);
    }

    public static reflect(a: number, b: number): number {
        return ((b == 255) ? b : Math.min(255, (a * a / (255 - b))));
    }

    public static glow(a: number, b: number): number {
        return this.reflect(b, a);
    }

    public static phoenix(a: number, b: number): number {
        return (Math.min(a, b) - Math.max(a, b) + 255);
    }

}