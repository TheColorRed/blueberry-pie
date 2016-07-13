import { Vector2 } from '../utils/Vector';
import { Color } from '../utils/Color/Color';
import { BerryObject } from '../core/BerryObject';
import { BerryBehavior } from '../core/BerryBehavior';
export declare enum EaseType {
    EaseInBounce = 0,
    EaseOutBounce = 1,
    EaseInOutBounce = 2,
    EaseInBack = 3,
    EaseOutBack = 4,
    EaseInOutBack = 5,
    EaseInElastic = 6,
    EaseOutElastic = 7,
    EaseInOutElastic = 8,
    EaseInCirc = 9,
    EaseOutCirc = 10,
    EaseInOutCirc = 11,
    EaseInExpo = 12,
    EaseOutExpo = 13,
    EaseInOutExpo = 14,
    EaseInSine = 15,
    EaseOutSine = 16,
    EaseInOutSine = 17,
    EaseInQuint = 18,
    EaseOutQuint = 19,
    EaseInOutQuint = 20,
    EaseInQuart = 21,
    EaseOutQuart = 22,
    EaseInOutQuart = 23,
    EaseInQuad = 24,
    EaseOutQuad = 25,
    EaseInOutQuad = 26,
    EaseInCubic = 27,
    EaseOutCubic = 28,
    EaseInOutCubic = 29,
    Clerp = 30,
    Spring = 31,
    Linear = 32,
}
export declare enum LoopType {
    None = 0,
    Repeat = 1,
    PingPong = 2,
}
export declare class TweenSettings {
    target: BerryObject;
    easeType: EaseType;
    loopType: LoopType;
    endPosition: Vector2;
    startPosition: Vector2;
    endScale: Vector2;
    endColor: Color;
    units: string;
    duration: number;
    delay: number;
    onStart: Function;
    onComplete: Function;
    onUpdate: Function;
}
export declare enum TweenType {
    Move = 0,
    Scale = 1,
    Color = 2,
}
export declare class Tween extends BerryBehavior {
    isRunning: boolean;
    tweenType: TweenType;
    settings: TweenSettings;
    initScale: Vector2;
    initPosition: Vector2;
    initColor: Color;
    endVector: Vector2;
    protected duration: number;
    protected easeType: EaseType;
    protected loopType: LoopType;
    protected units: string;
    protected percentage: number;
    protected runningTime: number;
    protected completed: boolean;
    protected started: boolean;
    protected reverse: boolean;
    protected time: number;
    awake(): void;
    update(): void;
    protected tweenUpdate(): void;
    protected tweenComplete(): void;
    protected updatePercentage(): void;
    protected finalFrame(): void;
    protected moveTarget(): void;
    protected scaleTarget(): void;
    protected colorTarget(): void;
    static init(settings: TweenSettings): Tween;
    static moveTo(settings: TweenSettings): void;
    static scaleTo(settings: TweenSettings): void;
    static colorTo(settings: TweenSettings): void;
}
