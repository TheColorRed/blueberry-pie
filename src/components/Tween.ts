import { Vector2 } from '../utils/Vector';
import { Color } from '../utils/Color';
import { Time } from '../utils/Time';
import { TweenFx } from '../utils/TweenFx';
import { BerryObject } from '../core/BerryObject';
import { BerryBehavior } from '../core/BerryBehavior';

export enum EaseType {
    EaseInBounce, EaseOutBounce, EaseInOutBounce,
    EaseInBack, EaseOutBack, EaseInOutBack,
    EaseInElastic, EaseOutElastic, EaseInOutElastic,
    EaseInCirc, EaseOutCirc, EaseInOutCirc,
    EaseInExpo, EaseOutExpo, EaseInOutExpo,
    EaseInSine, EaseOutSine, EaseInOutSine,
    EaseInQuint, EaseOutQuint, EaseInOutQuint,
    EaseInQuart, EaseOutQuart, EaseInOutQuart,
    EaseInQuad, EaseOutQuad, EaseInOutQuad,
    EaseInCubic, EaseOutCubic, EaseInOutCubic,
    Clerp, Spring, Linear
}

export enum LoopType { None, Repeat, PingPong }

export class TweenSettings {

    public target: BerryObject;

    public easeType: EaseType;
    public loopType: LoopType;

    public endPosition: Vector2;
    public startPosition: Vector2;
    public endScale: Vector2;
    public endColor: Color;

    public units: string;

    public duration: number;
    public delay: number;

    public onStart: Function;
    public onComplete: Function;
    public onUpdate: Function;

}

enum TweenType { Move, Scale, Color }

export class Tween extends BerryBehavior {

    public isRunning: boolean = false;
    public tweenType: TweenType;
    public settings: TweenSettings;

    public initScale: Vector2;
    public initPosition: Vector2;
    public initColor: Color;
    public endVector: Vector2;

    protected duration: number;
    protected easeType: EaseType;
    protected loopType: LoopType;
    protected units: string;

    protected startTime: number = 0;
    protected percentage: number = 0;
    protected runningTime: number = 0;

    protected completed: boolean = false;
    protected started: boolean = false;
    protected reverse: boolean = false;

    protected time: number = 0;

    public awake() {
		this.duration = this.settings.duration || 2;
		this.easeType = this.settings.easeType || EaseType.Linear;
        this.loopType = this.settings.loopType || LoopType.None;
        this.units    = this.settings.units || 'px';
        if (this.tweenType == TweenType.Scale) {
            this.endVector = this.settings.endScale || Vector2.one;
        } else if (this.tweenType == TweenType.Move){
            this.endVector = this.settings.endPosition || Vector2.one;
        }
        this.berryObject.css('position', 'absolute')
        this.isRunning = true;
        this.startTime = Time.time;
    }

    public update() {
        if (this.isRunning) {
            if (!this.reverse) {
                if (this.percentage < 1) {
                    this.tweenUpdate();
                } else {
                    this.tweenComplete();
                }
            } else {
                if (this.percentage > 0) {
                    this.tweenUpdate();
                } else {
                    this.tweenComplete();
                }
            }
        }
        // // if (this.percentage < 1) {
        //     if (this.isRunning) {

        //         if (!this.reverse) {
        //             if (this.percentage < 1) {
        //                 this.tweenUpdate();
        //             }
        //         }

        //         if (!this.started) {
        //             if (typeof this.settings.onStart == 'function') {
        //                 this.settings.onStart();
        //             }
        //             this.started = true;
        //         }

        //         // this.tweenUpdate();

        //         if (typeof this.settings.onUpdate == 'function') {
        //             this.settings.onUpdate();
        //         }

        //         this.runningTime += Time.deltaTime;
        //         this.percentage = this.runningTime / this.duration;
        //         this.time += Time.deltaTime / this.duration;
        //     }
        // } else {
        //     if (this.percentage >= 1 && !this.completed) {
        //         this.finalFrame();
        //         if (typeof this.settings.onComplete == 'function') {
        //             this.settings.onComplete();
        //         }
        //         if (this.loopType == LoopType.Repeat) {
        //             this.percentage = 0;
        //             this.runningTime = 0;
        //             this.time = 0;
        //             this.berryObject.css('left', this.initPosition.x + this.units);
        //             this.berryObject.css('top', this.initPosition.y + this.units);
        //         } else if (this.loopType == LoopType.PingPong) {
        //             this.reverse = !this.reverse;
        //             this.runningTime = 0;
        //         } else {
        //             this.completed = true;
        //         }
        //     }
        // }
    }

    protected tweenUpdate() {
        switch (this.tweenType) {
            case TweenType.Move: this.moveTarget(); break;
            case TweenType.Scale: this.scaleTarget(); break;
            case TweenType.Color: this.colorTarget(); break;
        }
        this.updatePercentage();
    }

    protected tweenComplete() {
        this.isRunning = false;
        if (this.loopType == LoopType.None) {

        } else {
            switch (this.loopType){
                case LoopType.Repeat:
                    this.percentage = 0;
                    this.runningTime = 0;
                    this.time = 0;
                    this.isRunning = true;
                    this.berryObject.css('left', this.initPosition.x + this.units);
                    this.berryObject.css('top', this.initPosition.y + this.units);
                    break;
                case LoopType.PingPong:
                    this.reverse = !this.reverse;
                    this.runningTime = 0;
                    this.isRunning = true;
            }
        }
    }

    protected updatePercentage() {
        this.runningTime += Time.deltaTime;
        if (this.reverse) {
            this.percentage = 1 - this.runningTime / this.duration;
            this.time -= Time.deltaTime / this.duration;
        } else {
            this.percentage = this.runningTime / this.duration;
            this.time += Time.deltaTime / this.duration;
        }
    }

    protected finalFrame() {
        switch (this.tweenType) {
            case TweenType.Scale:
                this.berryObject.css('width', this.endVector.x + this.units).css('height', this.endVector.y + this.units);
                break;
            case TweenType.Move:
                this.berryObject.css('left', this.endVector.x + this.units).css('top', this.endVector.y + this.units);
                break;
        }
    }

    protected moveTarget() {
		var start: Vector2 = this.settings.startPosition || Vector2.zero;
		var end: Vector2   = this.settings.endPosition || Vector2.zero;
        this.berryObject
            .css('left', TweenFx.animate(this.initPosition.x, end.x, this.time, this.easeType) + this.units)
            .css('top', TweenFx.animate(this.initPosition.y, end.y, this.time, this.easeType) + this.units);
    }

    protected scaleTarget() {
        var end = this.settings.endScale || Vector2.one;
        this.berryObject
            .css('width', TweenFx.animate(this.initScale.x, end.x, this.time, this.easeType) + this.units)
            .css('height', TweenFx.animate(this.initScale.y, end.y, this.time, this.easeType) + this.units);
    }

    protected colorTarget() {
        var end = this.settings.endColor || Color.white;
        var color = new Color(
            Math.round(TweenFx.animate(this.initColor.r, end.r, this.time, this.easeType)),
            Math.round(TweenFx.animate(this.initColor.g, end.g, this.time, this.easeType)),
            Math.round(TweenFx.animate(this.initColor.b, end.b, this.time, this.easeType))
        );
        console.log(TweenFx.animate(this.initColor.r, end.r, this.time, this.easeType))
        this.berryObject.css('background-color', '#' + color.hex());
    }

    public static init(settings: TweenSettings): Tween {
        var comp: Tween = settings.target.addComponent('Tween') as Tween;
        comp.settings = settings;
        return comp;
    }

    public static moveTo(settings: TweenSettings) {
        var comp: Tween = Tween.init(settings);
        comp.tweenType = TweenType.Move;
        comp.initPosition = settings.target.localPosition;
	}

    public static scaleTo(settings: TweenSettings) {
        var comp: Tween = Tween.init(settings);
        comp.tweenType = TweenType.Scale;
        comp.initScale = settings.target.localScale;
    }

    public static colorTo(settings: TweenSettings) {
        var comp: Tween = Tween.init(settings);
        comp.tweenType = TweenType.Color;
        comp.initColor = comp.berryObject.backgroundColor;
    }

}