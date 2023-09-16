import { AABB } from "../physics/AABB";
import { GameObject } from "./GameObject";

export abstract class PhysObject extends GameObject {
    public aabb: AABB;
    public solid: boolean;

    constructor(x: number, y: number, w: number, h: number) {
        super();
        this.aabb = new AABB(x, y, w, h);
        this.solid = true;
    }

    distance(obj: PhysObject): number {
        return Math.sqrt(
            Math.pow(this.aabb.x - obj.aabb.x, 2) +
            Math.pow(this.aabb.y - obj.aabb.y, 2)
        );
    }

    abstract collide(obj: PhysObject): void;
}