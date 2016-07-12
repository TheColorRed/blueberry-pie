export class Mathf {

    public static lerp(start: number, end: number, time: number): number {
        let val = (1 - time) * start + time * end;
        return val;
        // if (val <= 0) { return start; }
        // else if (val >= end) { return end; }
        // else { return val; }
    }

    public static clamp(value: number, min: number, max: number): number {
        return Math.max(Math.min(max, value), min);
    }

    public static clamp01(value: number): number {
        return Math.max(Math.min(1, value), 0);
    }

    public static invert(value: number, max: number): number {
        return Math.abs(value - max);
    }

    public static invert01(value: number): number {
        return Math.abs(value - 1);
    }

}