import { EaseType } from '../components/Tween';
export declare class TweenFx {
    private static easeInBounce(start, end, value);
    private static easeOutBounce(start, end, value);
    private static easeInOutBounce(start, end, value);
    private static easeOut(start, end, value);
    private static easeInOut(start, end, value);
    private static easeInBack(start, end, value);
    private static easeOutBack(start, end, value);
    private static easeInOutBack(start, end, value);
    private static easeInElastic(start, end, value);
    private static easeOutElastic(start, end, value);
    private static easeInOutElastic(start, end, value);
    private static easeInCirc(start, end, value);
    private static easeOutCirc(start, end, value);
    private static easeInOutCirc(start, end, value);
    private static easeInExpo(start, end, value);
    private static easeOutExpo(start, end, value);
    private static easeInOutExpo(start, end, value);
    private static easeInSine(start, end, value);
    private static easeOutSine(start, end, value);
    private static easeInOutSine(start, end, value);
    private static easeInQuint(start, end, value);
    private static easeOutQuint(start, end, value);
    private static easeInOutQuint(start, end, value);
    private static easeInQuart(start, end, value);
    private static easeOutQuart(start, end, value);
    private static easeInOutQuart(start, end, value);
    private static easeInCubic(start, end, value);
    private static easeOutCubic(start, end, value);
    private static easeInOutCubic(start, end, value);
    private static easeInQuad(start, end, value);
    private static easeOutQuad(start, end, value);
    private static easeInOutQuad(start, end, value);
    private static clerp(start, end, value);
    private static spring(start, end, value);
    static animate(start: number, end: number, time: number, easeType?: EaseType): number;
}