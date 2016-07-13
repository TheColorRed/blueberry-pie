export declare enum BlendType {
    Normal = 0,
    Lighten = 1,
    Darken = 2,
    Multiply = 3,
    Average = 4,
    Add = 5,
    Subtract = 6,
    Difference = 7,
    Negation = 8,
    Screen = 9,
    Exclusion = 10,
    Overlay = 11,
    SoftLight = 12,
    HardLight = 13,
    ColorDodge = 14,
    ColorBurn = 15,
    LinearDodge = 16,
    LinearBurn = 17,
    LinearLight = 18,
    VividLight = 19,
    PinLight = 20,
    HardMix = 21,
    Reflect = 22,
    Glow = 23,
    Phoenix = 24,
}
export declare class ColorBlend {
    static normal(a: number, b: number): number;
    static lighten(a: number, b: number): number;
    static darken(a: number, b: number): number;
    static multiply(a: number, b: number): number;
    static average(a: number, b: number): number;
    static add(a: number, b: number): number;
    static subtract(a: number, b: number): number;
    static difference(a: number, b: number): number;
    static negation(a: number, b: number): number;
    static screen(a: number, b: number): number;
    static exclusion(a: number, b: number): number;
    static overlay(a: number, b: number): number;
    static softLight(a: number, b: number): number;
    static hardLight(a: number, b: number): number;
    static colorDodge(a: number, b: number): number;
    static colorBurn(a: number, b: number): number;
    static linearDodge(a: number, b: number): number;
    static linearBurn(a: number, b: number): number;
    static linearLight(a: number, b: number): number;
    static vividLight(a: number, b: number): number;
    static pinLight(a: number, b: number): number;
    static hardMix(a: number, b: number): number;
    static reflect(a: number, b: number): number;
    static glow(a: number, b: number): number;
    static phoenix(a: number, b: number): number;
}
