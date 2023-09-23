import { GFX } from "../../managers";
import { Actor, AnimationDescription } from "./Actor";
import { PhysObject } from "./PhysObject";

export class Prop extends Actor {
    constructor(x: number, y: number, w: number, h: number, image: string, id?: string) {
        super(x, y, w, h, image, null);
        this.id = id;
    }

    collide(obj: PhysObject): void {
        return;
    }

    update(): void {
        return;
    }

    override draw(): void {
        if(!this.image){
            return;
        }
        GFX.ctx.drawImage(this.image, this.aabb.x, this.aabb.y);
    }
}