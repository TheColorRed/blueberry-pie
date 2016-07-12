import { Mathf } from './Mathf';
import { Time } from './Time';
import { BerryObject } from '../core/BerryObject';
import { Vector2 } from './Vector';
import { EaseType, TweenSettings } from '../components/Tween';

export class TweenFx {

    ////////////////////////////////////////////////////////////////////////////
    /// Bounce
    ////////////////////////////////////////////////////////////////////////////
    private static easeInBounce(start: number, end: number, value: number): number {
		end -= start;
		return end - TweenFx.easeOutBounce(0, end, 1 - value) + start;
    }

    private static easeOutBounce(start: number, end: number, value: number): number {
        value /= 1;
		end -= start;
		if (value < (1 / 2.75)) {
			return end * (7.5625 * value * value) + start;
		} else if (value < (2 / 2.75)) {
			value -= (1.5 / 2.75);
			return end * (7.5625 * (value) * value + .75) + start;
		} else if (value < (2.5 / 2.75)) {
			value -= (2.25 / 2.75);
			return end * (7.5625 * (value) * value + .9375) + start;
		} else {
			value -= (2.625 / 2.75);
			return end * (7.5625 * (value) * value + .984375) + start;
		}
    }
	private static easeInOutBounce(start: number, end: number, value: number): number {
		end -= start;
		if (value < 1 / 2) return TweenFx.easeInBounce(0, end, value * 2) * 0.5 + start;
		else return TweenFx.easeOutBounce(0, end, value * 2 - 1) * 0.5 + end * 0.5 + start;
	}

    private static easeOut(start: number, end: number, value: number) {
        return Mathf.lerp(start, end, Math.sin(value * Math.PI * 0.5));
    }

    private static easeInOut(start: number, end: number, value: number) {
        return Mathf.lerp(start, end, value * value * (3.0 - 2.0 * value));
    }


    ////////////////////////////////////////////////////////////////////////////
    /// Back
    ////////////////////////////////////////////////////////////////////////////
	private static easeInBack(start: number, end: number, value: number): number {
		end -= start;
		value /= 1;
		var s: number = 1.70158;
		return end * (value) * value * ((s + 1) * value - s) + start;
	}

	private static easeOutBack(start: number, end: number, value: number): number {
		var s: number = 1.70158;
		end -= start;
		value = (value / 1) - 1;
		return end * ((value) * value * ((s + 1) * value + s) + 1) + start;
	}

	private static easeInOutBack(start: number, end: number, value: number): number {
		var s: number = 1.70158;
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
    private static easeInElastic(start: number, end: number, value: number): number {
        end -= start;

        var p: number = 1 * .3;
        var s: number = 0;
        var a: number = 0;

        if (value == 0) return start;
        if ((value /= 1) == 1) return start + end;
        if (a == 0 || a < Math.abs(end)) {
            a = end;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(end / a);
        }

        return -(a * Math.pow(2, 10 * (value -= 1)) * Math.sin((value * 1 - s) * (2 * Math.PI) / p)) + start;
    }

	private static easeOutElastic(start: number, end: number, value: number): number{
		end -= start;

		var p: number = 1 * .3;
		var s: number = 0;
		var a: number = 0;

		if (value == 0) return start;
		if ((value /= 1) == 1) return start + end;

		if (a == 0 || a < Math.abs(end)) {
			a = end;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(end / a);
		}

		return (a * Math.pow(2, -10 * value) * Math.sin((value * 1 - s) * (2 * Math.PI) / p) + end + start);
	}

	private static easeInOutElastic(start: number, end: number, value: number): number {
		end -= start;

		var p: number = 1 * .3;
		var s: number = 0;
		var a: number = 0;

		if (value == 0) return start;

		if ((value /= 1 / 2) == 2) return start + end;

		if (a == 0 || a < Math.abs(end)) {
			a = end;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(end / a);
		}

		if (value < 1) return -0.5 * (a * Math.pow(2, 10 * (value -= 1)) * Math.sin((value * 1 - s) * (2 * Math.PI) / p)) + start;
		return a * Math.pow(2, -10 * (value -= 1)) * Math.sin((value * 1 - s) * (2 * Math.PI) / p) * 0.5 + end + start;
	}

    ////////////////////////////////////////////////////////////////////////////
    /// Circ
    ////////////////////////////////////////////////////////////////////////////
	private static easeInCirc(start: number, end: number, value: number): number {
		end -= start;
		return -end * (Math.sqrt(1 - value * value) - 1) + start;
	}

	private static easeOutCirc(start: number, end: number, value: number): number {
		value--;
		end -= start;
		return end * Math.sqrt(1 - value * value) + start;
	}

	private static easeInOutCirc(start: number, end: number, value: number): number {
		value /= .5;
		end -= start;
		if (value < 1) return -end / 2 * (Math.sqrt(1 - value * value) - 1) + start;
		value -= 2;
		return end / 2 * (Math.sqrt(1 - value * value) + 1) + start;
    }

    ////////////////////////////////////////////////////////////////////////////
    /// Expo
    ////////////////////////////////////////////////////////////////////////////
    private static easeInExpo(start: number, end: number, value: number): number {
		end -= start;
		return end * Math.pow(2, 10 * (value / 1 - 1)) + start;
	}

	private static easeOutExpo(start: number, end: number, value: number): number {
		end -= start;
		return end * (-Math.pow(2, -10 * value / 1) + 1) + start;
	}

	private static easeInOutExpo(start: number, end: number, value: number): number {
		value /= .5;
		end -= start;
		if (value < 1) return end / 2 * Math.pow(2, 10 * (value - 1)) + start;
		value--;
		return end / 2 * (-Math.pow(2, -10 * value) + 2) + start;
	}

    ////////////////////////////////////////////////////////////////////////////
    /// Sine
    ////////////////////////////////////////////////////////////////////////////
    private static easeInSine(start: number, end: number, value: number): number {
		end -= start;
		return -end * Math.cos(value / 1 * (Math.PI / 2)) + end + start;
	}

	private static easeOutSine(start: number, end: number, value: number): number {
		end -= start;
		return end * Math.sin(value / 1 * (Math.PI / 2)) + start;
	}

	private static easeInOutSine(start: number, end: number, value: number): number {
		end -= start;
		return -end / 2 * (Math.cos(Math.PI * value / 1) - 1) + start;
	}

    ////////////////////////////////////////////////////////////////////////////
    /// Quint
    ////////////////////////////////////////////////////////////////////////////
    private static easeInQuint(start: number, end: number, value: number): number {
		end -= start;
		return end * value * value * value * value * value + start;
	}

	private static easeOutQuint(start: number, end: number, value: number): number {
		value--;
		end -= start;
		return end * (value * value * value * value * value + 1) + start;
	}

	private static easeInOutQuint(start: number, end: number, value: number): number {
		value /= .5;
		end -= start;
		if (value < 1) return end / 2 * value * value * value * value * value + start;
		value -= 2;
		return end / 2 * (value * value * value * value * value + 2) + start;
	}

    ////////////////////////////////////////////////////////////////////////////
    /// Quart
    ////////////////////////////////////////////////////////////////////////////
    private static easeInQuart(start: number, end: number, value: number): number {
		end -= start;
		return end * value * value * value * value + start;
	}

	private static easeOutQuart(start: number, end: number, value: number): number {
		value--;
		end -= start;
		return -end * (value * value * value * value - 1) + start;
	}

	private static easeInOutQuart(start: number, end: number, value: number): number {
		value /= .5;
		end -= start;
		if (value < 1) return end / 2 * value * value * value * value + start;
		value -= 2;
		return -end / 2 * (value * value * value * value - 2) + start;
    }

    ////////////////////////////////////////////////////////////////////////////
    /// Cubic
    ////////////////////////////////////////////////////////////////////////////
    private static easeInCubic(start: number, end: number, value: number): number {
		end -= start;
		return end * value * value * value + start;
	}

	private static easeOutCubic(start: number, end: number, value: number): number {
		value--;
		end -= start;
		return end * (value * value * value + 1) + start;
	}

	private static easeInOutCubic(start: number, end: number, value: number): number {
		value /= .5;
		end -= start;
		if (value < 1) return end / 2 * value * value * value + start;
		value -= 2;
		return end / 2 * (value * value * value + 2) + start;
	}

    ////////////////////////////////////////////////////////////////////////////
    /// Quad
    ////////////////////////////////////////////////////////////////////////////
    private static easeInQuad(start: number, end: number, value: number): number {
		end -= start;
		return end * value * value + start;
	}

	private static easeOutQuad(start: number, end: number, value: number): number {
		end -= start;
		return -end * value * (value - 2) + start;
	}

	private static easeInOutQuad(start: number, end: number, value: number): number {
		value /= .5;
		end -= start;
		if (value < 1) return end / 2 * value * value + start;
		value--;
		return -end / 2 * (value * (value - 2) - 1) + start;
	}

    ////////////////////////////////////////////////////////////////////////////
    /// Clerp
    ////////////////////////////////////////////////////////////////////////////
    private static clerp(start: number, end: number, value: number): number {
		var min: number = 0.0;
		var max: number = 360.0;
		var half: number = Math.abs((max - min) / 2.0);
		var retval: number = 0.0;
		var diff: number = 0.0;
		if ((end - start) < -half) {
			diff = ((max - start) + end) * value;
			retval = start + diff;
		} else if ((end - start) > half) {
			diff = -((max - end) + start) * value;
			retval = start + diff;
		}
		else retval = start + (end - start) * value;
		return retval;
	}

    ////////////////////////////////////////////////////////////////////////////
    /// Spring
    ////////////////////////////////////////////////////////////////////////////
	private static spring(start: number, end: number, value: number): number {
		value = Mathf.clamp01(value);
		value = (Math.sin(value * Math.PI * (0.2 + 2.5 * value * value * value)) * Math.pow(1 - value, 2.2) + value) * (1 + (1.2 * (1 - value)));
		return start + (end - start) * value;
    }

    public static animate(start: number, end: number, time: number, easeType: EaseType = EaseType.Linear) {
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