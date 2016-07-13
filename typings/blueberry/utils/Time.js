export class Time {
    static get deltaTime() {
        return this._deltaTime;
    }
    static get time() {
        return this._time;
    }
    static setDeltaTime(delta) {
        this._deltaTime = delta;
    }
    static setFrameTime(seconds) {
        this._time = seconds;
    }
}
Time._deltaTime = 0;
Time._time = 0;
