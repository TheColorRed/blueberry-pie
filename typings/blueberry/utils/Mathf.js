export class Mathf {
    static lerp(start, end, time) {
        let val = (1 - time) * start + time * end;
        return val;
        // if (val <= 0) { return start; }
        // else if (val >= end) { return end; }
        // else { return val; }
    }
    static clamp(value, min, max) {
        return Math.max(Math.min(max, value), min);
    }
    static clamp01(value) {
        return Math.max(Math.min(1, value), 0);
    }
    static invert(value, max) {
        return Math.abs(value - max);
    }
    static invert01(value) {
        return Math.abs(value - 1);
    }
}
