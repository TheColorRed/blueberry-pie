export class Mathf {

    public static lerp(start: number, end: number, time: number): number {
        let val = (1 - time) * start + time * end;
        if (val <= 0) { return start; }
        else if (val >= end) { return end; }
        else { return val; }
    }

    public static clamp(value: number, min: number, max: number): number {
        return Math.max(Math.min(max, value), min);
    }

    public static clamp01(value: number): number {
        return Math.max(Math.min(1, value), 0);
    }

}