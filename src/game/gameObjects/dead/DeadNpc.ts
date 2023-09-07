import { GAME, GFX } from "../../../managers";
import { AABB } from "../../physics/AABB";
import { Actor, AnimationDescription, Animation } from "../Actor";
import { PhysObject } from "../PhysObject";

export class DeadNpc extends Actor {
    fade: number = 3.0;
    slide: number = 4.0;

    startX: number;
    startY: number;

    constructor(x: number, y: number, angle: number, name: string) {
        super(
            x, y,
            150, 150,
            "Dead-NPC",
            new AnimationDescription(
                128,
                new Map<string, Animation>([
                    ["Elder", new Animation(0, 0, 0)],
                    ["Gardener", new Animation(1, 1, 0)],
                ]),
                name
            )
        );
        this.solid = false;
        this.angle = angle;
        this.startX = x;
        this.startY = y;
        this.animationDescription!.frame = Math.random() * 2;

    }

    collide(obj: PhysObject): void {
        
    }

    checkMove(): void {

        let moveVec = {
            x: Math.cos(this.angle) * this.slide,
            y: Math.sin(this.angle) * this.slide
        }

        let physX = this.aabb.x + 32;
        let physY = this.aabb.y + 32;
        let physW = 64;
        let physH = 64;

        let hypoX = new AABB(physX + moveVec.x, physY, physW, physH);
        let hypoY = new AABB(physX, physY + moveVec.y, physW, physH);

        for(let wall of GAME.room!.walls) {
            if(hypoX.intersects(wall.aabb)) {
                this.slide = 0;
            }
            if(hypoY.intersects(wall.aabb)) {
                this.slide = 0;
            }
        }
    }

    update(): void {
        this.fade -= 0.01;
        this.updateFrame();
        if(this.fade <= 0){
            this.destroy();
        }

        this.checkMove();

        this.aabb.x += Math.cos(this.angle) * this.slide;
        this.aabb.y += Math.sin(this.angle) * this.slide;
        this.slide *= 0.93;
    }

    draw(): void {

        GFX.ctx.globalAlpha = this.fade;

        GFX.ctx.beginPath();
        GFX.ctx.strokeStyle = "rgba(255, 0, 0, 0)";
        GFX.ctx.ellipse(this.aabb.x + this.aabb.w/2, this.aabb.y + this.aabb.h/2, (3 - this.fade) * 24, (3 - this.fade) * 16, 0, 0, Math.PI * 2);
        GFX.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        GFX.ctx.fill();
        GFX.ctx.stroke();
        GFX.ctx.closePath();
        
        this.angle += Math.PI/2;
        super.draw();
        this.angle -= Math.PI/2;
        GFX.ctx.globalAlpha = 1.0;
    }

}