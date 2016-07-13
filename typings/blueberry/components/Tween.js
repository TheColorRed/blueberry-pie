import { Vector2 } from '../utils/Vector';
import { Color } from '../utils/Color/Color';
import { Time } from '../utils/Time';
import { TweenFx } from '../utils/TweenFx';
import { BerryBehavior } from '../core/BerryBehavior';
export var EaseType;
(function (EaseType) {
    EaseType[EaseType["EaseInBounce"] = 0] = "EaseInBounce";
    EaseType[EaseType["EaseOutBounce"] = 1] = "EaseOutBounce";
    EaseType[EaseType["EaseInOutBounce"] = 2] = "EaseInOutBounce";
    EaseType[EaseType["EaseInBack"] = 3] = "EaseInBack";
    EaseType[EaseType["EaseOutBack"] = 4] = "EaseOutBack";
    EaseType[EaseType["EaseInOutBack"] = 5] = "EaseInOutBack";
    EaseType[EaseType["EaseInElastic"] = 6] = "EaseInElastic";
    EaseType[EaseType["EaseOutElastic"] = 7] = "EaseOutElastic";
    EaseType[EaseType["EaseInOutElastic"] = 8] = "EaseInOutElastic";
    EaseType[EaseType["EaseInCirc"] = 9] = "EaseInCirc";
    EaseType[EaseType["EaseOutCirc"] = 10] = "EaseOutCirc";
    EaseType[EaseType["EaseInOutCirc"] = 11] = "EaseInOutCirc";
    EaseType[EaseType["EaseInExpo"] = 12] = "EaseInExpo";
    EaseType[EaseType["EaseOutExpo"] = 13] = "EaseOutExpo";
    EaseType[EaseType["EaseInOutExpo"] = 14] = "EaseInOutExpo";
    EaseType[EaseType["EaseInSine"] = 15] = "EaseInSine";
    EaseType[EaseType["EaseOutSine"] = 16] = "EaseOutSine";
    EaseType[EaseType["EaseInOutSine"] = 17] = "EaseInOutSine";
    EaseType[EaseType["EaseInQuint"] = 18] = "EaseInQuint";
    EaseType[EaseType["EaseOutQuint"] = 19] = "EaseOutQuint";
    EaseType[EaseType["EaseInOutQuint"] = 20] = "EaseInOutQuint";
    EaseType[EaseType["EaseInQuart"] = 21] = "EaseInQuart";
    EaseType[EaseType["EaseOutQuart"] = 22] = "EaseOutQuart";
    EaseType[EaseType["EaseInOutQuart"] = 23] = "EaseInOutQuart";
    EaseType[EaseType["EaseInQuad"] = 24] = "EaseInQuad";
    EaseType[EaseType["EaseOutQuad"] = 25] = "EaseOutQuad";
    EaseType[EaseType["EaseInOutQuad"] = 26] = "EaseInOutQuad";
    EaseType[EaseType["EaseInCubic"] = 27] = "EaseInCubic";
    EaseType[EaseType["EaseOutCubic"] = 28] = "EaseOutCubic";
    EaseType[EaseType["EaseInOutCubic"] = 29] = "EaseInOutCubic";
    EaseType[EaseType["Clerp"] = 30] = "Clerp";
    EaseType[EaseType["Spring"] = 31] = "Spring";
    EaseType[EaseType["Linear"] = 32] = "Linear";
})(EaseType || (EaseType = {}));
export var LoopType;
(function (LoopType) {
    LoopType[LoopType["None"] = 0] = "None";
    LoopType[LoopType["Repeat"] = 1] = "Repeat";
    LoopType[LoopType["PingPong"] = 2] = "PingPong";
})(LoopType || (LoopType = {}));
export class TweenSettings {
}
export var TweenType;
(function (TweenType) {
    TweenType[TweenType["Move"] = 0] = "Move";
    TweenType[TweenType["Scale"] = 1] = "Scale";
    TweenType[TweenType["Color"] = 2] = "Color";
})(TweenType || (TweenType = {}));
export class Tween extends BerryBehavior {
    constructor(...args) {
        super(...args);
        this.isRunning = false;
        this.percentage = 0;
        this.runningTime = 0;
        this.completed = false;
        this.started = false;
        this.reverse = false;
        this.time = 0;
    }
    awake() {
        this.duration = this.settings.duration || 2;
        this.easeType = this.settings.easeType || EaseType.Linear;
        this.loopType = this.settings.loopType || LoopType.None;
        this.units = this.settings.units || 'px';
        if (this.tweenType == TweenType.Scale) {
            this.endVector = this.settings.endScale || Vector2.one;
        }
        else if (this.tweenType == TweenType.Move) {
            this.endVector = this.settings.endPosition || Vector2.one;
        }
        this.berryObject.css('position', 'absolute');
        this.isRunning = true;
    }
    update() {
        if (this.isRunning) {
            if (!this.reverse) {
                if (this.percentage < 1) {
                    this.tweenUpdate();
                }
                else {
                    this.tweenComplete();
                }
            }
            else {
                if (this.percentage > 0) {
                    this.tweenUpdate();
                }
                else {
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
    tweenUpdate() {
        switch (this.tweenType) {
            case TweenType.Move:
                this.moveTarget();
                break;
            case TweenType.Scale:
                this.scaleTarget();
                break;
            case TweenType.Color:
                this.colorTarget();
                break;
        }
        this.updatePercentage();
    }
    tweenComplete() {
        this.isRunning = false;
        if (this.loopType == LoopType.None) {
        }
        else {
            switch (this.loopType) {
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
    updatePercentage() {
        this.runningTime += Time.deltaTime;
        if (this.reverse) {
            this.percentage = 1 - this.runningTime / this.duration;
            this.time -= Time.deltaTime / this.duration;
        }
        else {
            this.percentage = this.runningTime / this.duration;
            this.time += Time.deltaTime / this.duration;
        }
    }
    finalFrame() {
        switch (this.tweenType) {
            case TweenType.Scale:
                this.berryObject.css('width', this.endVector.x + this.units).css('height', this.endVector.y + this.units);
                break;
            case TweenType.Move:
                this.berryObject.css('left', this.endVector.x + this.units).css('top', this.endVector.y + this.units);
                break;
        }
    }
    moveTarget() {
        var start = this.settings.startPosition || Vector2.zero;
        var end = this.settings.endPosition || Vector2.zero;
        this.berryObject
            .css('left', TweenFx.animate(this.initPosition.x, end.x, this.time, this.easeType) + this.units)
            .css('top', TweenFx.animate(this.initPosition.y, end.y, this.time, this.easeType) + this.units);
    }
    scaleTarget() {
        var end = this.settings.endScale || Vector2.one;
        this.berryObject
            .css('width', TweenFx.animate(this.initScale.x, end.x, this.time, this.easeType) + this.units)
            .css('height', TweenFx.animate(this.initScale.y, end.y, this.time, this.easeType) + this.units);
    }
    colorTarget() {
        var end = this.settings.endColor || Color.white;
        var color = new Color(Math.round(TweenFx.animate(this.initColor.r, end.r, this.time, this.easeType)), Math.round(TweenFx.animate(this.initColor.g, end.g, this.time, this.easeType)), Math.round(TweenFx.animate(this.initColor.b, end.b, this.time, this.easeType)));
        this.berryObject.css('background-color', '#' + color.hex());
    }
    static init(settings) {
        var comp = settings.target.addComponent('Tween');
        comp.settings = settings;
        return comp;
    }
    static moveTo(settings) {
        var comp = Tween.init(settings);
        comp.tweenType = TweenType.Move;
        comp.initPosition = settings.target.localPosition;
    }
    static scaleTo(settings) {
        var comp = Tween.init(settings);
        comp.tweenType = TweenType.Scale;
        comp.initScale = settings.target.localScale;
    }
    static colorTo(settings) {
        var comp = Tween.init(settings);
        comp.tweenType = TweenType.Color;
        console.log(comp.berryObject.backgroundColor);
        comp.initColor = comp.berryObject.backgroundColor;
    }
}
