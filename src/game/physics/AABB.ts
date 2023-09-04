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
}