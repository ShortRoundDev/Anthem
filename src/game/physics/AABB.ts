export class AABB {
    constructor(
        public x: number,
        public y: number,
        public w: number,
        public h: number
    ) {
    }

    public intersects(other: AABB): boolean {
        return (
            this.x < other.x + other.w &&
            this.x + this.w > other.x &&
            this.y < other.y + other.h &&
            this.y + this.h > other.y
        );
    }

    get midPoint(): { x: number, y: number } {
        return {
            x: this.x + this.w / 2,
            y: this.y + this.h / 2
        };
    }

    public distance(point: {x: number, y: number}) : number {
        let dx = Math.max(this.x - point.x, 0, point.x - (this.x + this.w));
        let dy = Math.max(this.y - point.y, 0, point.y - (this.y + this.h));
        return Math.sqrt(dx*dx + dy*dy);
    }
}