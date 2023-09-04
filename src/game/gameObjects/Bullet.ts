import { GAME, GFX } from "../../managers";
import { Actor } from "./Actor";
import { GameObject } from "./GameObject";
import { PhysObject } from "./PhysObject";

export class Bullet extends Actor {
    homeX: number;
    homeY: number;
    constructor(public parent: PhysObject | null, x: number, y: number, private xDir: number, private yDir: number) {
        super(x, y, 16, 16, null, null);
        this.homeX = x;
        this.homeY = y;
    }

    update(): void {
        this.aabb.x += this.xDir * 15;
        this.aabb.y += this.yDir * 15;

        let length = Math.sqrt(Math.pow(this.aabb.x - this.homeX, 2) + Math.pow(this.aabb.y - this.homeY, 2));
        if(length > 1024) {
            this.destroy();
        }
    }

    collide(obj: PhysObject): void {
        if(obj == this.parent) {
            return;
        }
        this.destroy();
    }

    draw(): void {
        GFX.ctx.strokeStyle = "grey";
        GFX.ctx.lineWidth = 1;
        GFX.ctx.beginPath();
        GFX.ctx.moveTo(this.aabb.x - this.xDir * 15, this.aabb.y - this.yDir * 15);
        GFX.ctx.lineTo(this.aabb.x, this.aabb.y);
        GFX.ctx.stroke();
    }

}