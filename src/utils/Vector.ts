export class Vector2 {

    public x: number = 0;
    public y: number = 0;

    public constructor(first: any, second: any = 0) {
        if (typeof first == 'object') {
            this.x = parseInt(first[0]);
            this.y = parseInt(first[1]);
        } else {
            this.x = parseInt(first);
            this.y = parseInt(second);
        }
    }

    public static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    public static get one(): Vector2 {
        return new Vector2(1, 1);
    }
}