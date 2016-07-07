
export class Time {

    private static _deltaTime: number = 0;
    private static _time: number = 0;

    protected static get deltaTime(): number {
        return this._deltaTime;
    }
    protected static get time(): number {
        return this._time;
    }

    public static setDeltaTime(delta: number): void {
        this._deltaTime = delta;
    }

    public static setFrameTime(seconds: number): void {
        this._time = seconds;
    }

}