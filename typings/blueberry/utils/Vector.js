export class Vector2 {
    constructor(first, second = 0) {
        this.x = 0;
        this.y = 0;
        if (typeof first == 'object') {
            this.x = parseInt(first[0]);
            this.y = parseInt(first[1]);
        }
        else {
            this.x = parseInt(first);
            this.y = parseInt(second);
        }
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    static get one() {
        return new Vector2(1, 1);
    }
}
