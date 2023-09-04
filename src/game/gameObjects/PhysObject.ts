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

    abstract collide(obj: PhysObject): void;
}