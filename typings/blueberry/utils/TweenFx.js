import { Mathf } from './Mathf';
import { EaseType } from '../components/Tween';
export class TweenFx {
    ////////////////////////////////////////////////////////////////////////////
    /// Bounce
    ////////////////////////////////////////////////////////////////////////////
    static easeInBounce(start, end, value) {
        end -= start;
        return end - TweenFx.easeOutBounce(0, end, 1 - value) + start;
    }
    static easeOutBounce(start, end, value) {
        value /= 1;
        end -= start;
        if (value < (1 / 2.75)) {
            return end * (7.5625 * value * value) + start;
        }
        else if (value < (2 / 2.75)) {
            value -= (1.5 / 2.75);
            return end * (7.5625 * (value) * value + .75) + start;
        }
        else if (value < (2.5 / 2.75)) {
            value -= (2.25 / 2.75);
            return end * (7.5625 * (value) * value + .9375) + start;
        }
        else {
            value -= (2.625 / 2.75);
            return end * (7.5625 * (value) * value + .984375) + start;
        }
    }
    static easeInOutBounce(start, end, value) {
        end -= start;
        if (value < 1 / 2)
            return TweenFx.easeInBounce(0, end, value * 2) * 0.5 + start;
        else
            return TweenFx.easeOutBounce(0, end, value * 2 - 1) * 0.5 + end * 0.5 + start;
    }
    static easeOut(start, end, value) {
        return Mathf.lerp(start, end, Math.sin(value * Math.PI * 0.5));
    }
    static easeInOut(start, end, value) {
        return Mathf.lerp(start, end, value * value * (3.0 - 2.0 * value));
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Back
    ////////////////////////////////////////////////////////////////////////////
    static easeInBack(start, end, value) {
        end -= start;
        value /= 1;
        var s = 1.70158;
        return end * (value) * value * ((s + 1) * value - s) + start;
    }
    static easeOutBack(start, end, value) {
        var s = 1.70158;
        end -= start;
        value = (value / 1) - 1;
        return end * ((value) * value * ((s + 1) * value + s) + 1) + start;
    }
    static easeInOutBack(start, end, value) {
        var s = 1.70158;
        end -= start;
        value /= .5;
        if ((value) < 1) {
            s *= (1.525);
            return end / 2 * (value * value * (((s) + 1) * value - s)) + start;
        }
        value -= 2;
        s *= (1.525);
        return end / 2 * ((value) * value * (((s) + 1) * value + s) + 2) + start;
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Elastic
    ////////////////////////////////////////////////////////////////////////////
    static easeInElastic(start, end, value) {
        end -= start;
        var p = 1 * .3;
        var s = 0;
        var a = 0;
        if (value == 0)
            return start;
        if ((value /= 1) == 1)
            return start + end;
        if (a == 0 || a < Math.abs(end)) {
            a = end;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(end / a);
        }
        return -(a * Math.pow(2, 10 * (value -= 1)) * Math.sin((value * 1 - s) * (2 * Math.PI) / p)) + start;
    }
    static easeOutElastic(start, end, value) {
        end -= start;
        var p = 1 * .3;
        var s = 0;
        var a = 0;
        if (value == 0)
            return start;
        if ((value /= 1) == 1)
            return start + end;
        if (a == 0 || a < Math.abs(end)) {
            a = end;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(end / a);
        }
        return (a * Math.pow(2, -10 * value) * Math.sin((value * 1 - s) * (2 * Math.PI) / p) + end + start);
    }
    static easeInOutElastic(start, end, value) {
        end -= start;
        var p = 1 * .3;
        var s = 0;
        var a = 0;
        if (value == 0)
            return start;
        if ((value /= 1 / 2) == 2)
            return start + end;
        if (a == 0 || a < Math.abs(end)) {
            a = end;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(end / a);
        }
        if (value < 1)
            return -0.5 * (a * Math.pow(2, 10 * (value -= 1)) * Math.sin((value * 1 - s) * (2 * Math.PI) / p)) + start;
        return a * Math.pow(2, -10 * (value -= 1)) * Math.sin((value * 1 - s) * (2 * Math.PI) / p) * 0.5 + end + start;
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Circ
    ////////////////////////////////////////////////////////////////////////////
    static easeInCirc(start, end, value) {
        end -= start;
        return -end * (Math.sqrt(1 - value * value) - 1) + start;
    }
    static easeOutCirc(start, end, value) {
        value--;
        end -= start;
        return end * Math.sqrt(1 - value * value) + start;
    }
    static easeInOutCirc(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return -end / 2 * (Math.sqrt(1 - value * value) - 1) + start;
        value -= 2;
        return end / 2 * (Math.sqrt(1 - value * value) + 1) + start;
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Expo
    ////////////////////////////////////////////////////////////////////////////
    static easeInExpo(start, end, value) {
        end -= start;
        return end * Math.pow(2, 10 * (value / 1 - 1)) + start;
    }
    static easeOutExpo(start, end, value) {
        end -= start;
        return end * (-Math.pow(2, -10 * value / 1) + 1) + start;
    }
    static easeInOutExpo(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return end / 2 * Math.pow(2, 10 * (value - 1)) + start;
        value--;
        return end / 2 * (-Math.pow(2, -10 * value) + 2) + start;
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Sine
    ////////////////////////////////////////////////////////////////////////////
    static easeInSine(start, end, value) {
        end -= start;
        return -end * Math.cos(value / 1 * (Math.PI / 2)) + end + start;
    }
    static easeOutSine(start, end, value) {
        end -= start;
        return end * Math.sin(value / 1 * (Math.PI / 2)) + start;
    }
    static easeInOutSine(start, end, value) {
        end -= start;
        return -end / 2 * (Math.cos(Math.PI * value / 1) - 1) + start;
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Quint
    ////////////////////////////////////////////////////////////////////////////
    static easeInQuint(start, end, value) {
        end -= start;
        return end * value * value * value * value * value + start;
    }
    static easeOutQuint(start, end, value) {
        value--;
        end -= start;
        return end * (value * value * value * value * value + 1) + start;
    }
    static easeInOutQuint(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return end / 2 * value * value * value * value * value + start;
        value -= 2;
        return end / 2 * (value * value * value * value * value + 2) + start;
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Quart
    ////////////////////////////////////////////////////////////////////////////
    static easeInQuart(start, end, value) {
        end -= start;
        return end * value * value * value * value + start;
    }
    static easeOutQuart(start, end, value) {
        value--;
        end -= start;
        return -end * (value * value * value * value - 1) + start;
    }
    static easeInOutQuart(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return end / 2 * value * value * value * value + start;
        value -= 2;
        return -end / 2 * (value * value * value * value - 2) + start;
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Cubic
    ////////////////////////////////////////////////////////////////////////////
    static easeInCubic(start, end, value) {
        end -= start;
        return end * value * value * value + start;
    }
    static easeOutCubic(start, end, value) {
        value--;
        end -= start;
        return end * (value * value * value + 1) + start;
    }
    static easeInOutCubic(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return end / 2 * value * value * value + start;
        value -= 2;
        return end / 2 * (value * value * value + 2) + start;
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Quad
    ////////////////////////////////////////////////////////////////////////////
    static easeInQuad(start, end, value) {
        end -= start;
        return end * value * value + start;
    }
    static easeOutQuad(start, end, value) {
        end -= start;
        return -end * value * (value - 2) + start;
    }
    static easeInOutQuad(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return end / 2 * value * value + start;
        value--;
        return -end / 2 * (value * (value - 2) - 1) + start;
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Clerp
    ////////////////////////////////////////////////////////////////////////////
    static clerp(start, end, value) {
        var min = 0.0;
        var max = 360.0;
        var half = Math.abs((max - min) / 2.0);
        var retval = 0.0;
        var diff = 0.0;
        if ((end - start) < -half) {
            diff = ((max - start) + end) * value;
            retval = start + diff;
        }
        else if ((end - start) > half) {
            diff = -((max - end) + start) * value;
            retval = start + diff;
        }
        else
            retval = start + (end - start) * value;
        return retval;
    }
    ////////////////////////////////////////////////////////////////////////////
    /// Spring
    ////////////////////////////////////////////////////////////////////////////
    static spring(start, end, value) {
        value = Mathf.clamp01(value);
        value = (Math.sin(value * Math.PI * (0.2 + 2.5 * value * value * value)) * Math.pow(1 - value, 2.2) + value) * (1 + (1.2 * (1 - value)));
        return start + (end - start) * value;
    }
    static animate(start, end, time, easeType = EaseType.Linear) {
        switch (easeType) {
            case EaseType.Linear:
                return Mathf.lerp(start, end, time);
            // Ease Bounce
            case EaseType.EaseInBounce:
                return TweenFx.easeInBounce(start, end, time);
            case EaseType.EaseOutBounce:
                return TweenFx.easeOutBounce(start, end, time);
            case EaseType.EaseInOutBounce:
                return TweenFx.easeInOutBounce(start, end, time);
            // Ease back
            case EaseType.EaseInBack:
                return TweenFx.easeInBack(start, end, time);
            case EaseType.EaseOutBack:
                return TweenFx.easeOutBack(start, end, time);
            case EaseType.EaseInOutBack:
                return TweenFx.easeInOutBack(start, end, time);
            // Ease elastic
            case EaseType.EaseInElastic:
                return TweenFx.easeInElastic(start, end, time);
            case EaseType.EaseOutElastic:
                return TweenFx.easeOutElastic(start, end, time);
            case EaseType.EaseInOutElastic:
                return TweenFx.easeInOutElastic(start, end, time);
            // Ease Circ
            case EaseType.EaseInCirc:
                return TweenFx.easeInCirc(start, end, time);
            case EaseType.EaseOutCirc:
                return TweenFx.easeOutCirc(start, end, time);
            case EaseType.EaseInOutCirc:
                return TweenFx.easeInOutCirc(start, end, time);
            // Ease Expo
            case EaseType.EaseInExpo:
                return TweenFx.easeInExpo(start, end, time);
            case EaseType.EaseOutExpo:
                return TweenFx.easeOutExpo(start, end, time);
            case EaseType.EaseInOutExpo:
                return TweenFx.easeInOutExpo(start, end, time);
            // Ease Sine
            case EaseType.EaseInSine:
                return TweenFx.easeInSine(start, end, time);
            case EaseType.EaseOutSine:
                return TweenFx.easeOutSine(start, end, time);
            case EaseType.EaseInOutSine:
                return TweenFx.easeInOutSine(start, end, time);
            // Ease Quint
            case EaseType.EaseInQuint:
                return TweenFx.easeInQuint(start, end, time);
            case EaseType.EaseOutQuint:
                return TweenFx.easeOutQuint(start, end, time);
            case EaseType.EaseInOutQuint:
                return TweenFx.easeInOutQuint(start, end, time);
            // Ease Quart
            case EaseType.EaseInQuart:
                return TweenFx.easeInQuart(start, end, time);
            case EaseType.EaseOutQuart:
                return TweenFx.easeOutQuart(start, end, time);
            case EaseType.EaseInOutQuart:
                return TweenFx.easeInOutQuart(start, end, time);
            // Ease Cubic
            case EaseType.EaseInCubic:
                return TweenFx.easeInCubic(start, end, time);
            case EaseType.EaseOutCubic:
                return TweenFx.easeOutCubic(start, end, time);
            case EaseType.EaseInOutCubic:
                return TweenFx.easeInOutCubic(start, end, time);
            // Ease Quad
            case EaseType.EaseInQuad:
                return TweenFx.easeInQuad(start, end, time);
            case EaseType.EaseOutQuad:
                return TweenFx.easeOutQuad(start, end, time);
            case EaseType.EaseInOutQuad:
                return TweenFx.easeInOutQuad(start, end, time);
            // Ease Clerp
            case EaseType.Clerp:
                return TweenFx.clerp(start, end, time);
            case EaseType.Spring:
                return TweenFx.spring(start, end, time);
        }
    }
}
