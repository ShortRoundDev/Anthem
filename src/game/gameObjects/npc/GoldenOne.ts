import { ASSET, GFX } from "../../../managers";
import { Actor, AnimationDescription, Animation } from "../Actor";
import { PhysObject } from "../PhysObject";

export class GoldenOne extends Actor {
    actionKeyImage: HTMLImageElement;
    theta: number = 0;

    constructor(x: number, y: number, angle: number) {
        super(x, y, 64, 64, "GoldenOne", new AnimationDescription(
            64,
            new Map<string, Animation>([
                ["Idle", new Animation(0, 0, 0)],
            ]),
            "Idle"
        ));
        this.angle = angle;

        this.actionKeyImage = ASSET.getImage("ActionKey") as HTMLImageElement;
    }

    collide(obj: PhysObject): void {
        
    }
    update(): void {
        this.updateFrame();
        this.theta += 0.07;
    }

    override draw(): void {
        super.draw();
        GFX.ctx.drawImage(
            this.actionKeyImage,
            this.aabb.x + this.aabb.w/2 - 8, this.aabb.y - 48 + Math.cos(this.theta) * 6,
            16, 37.5
        );
    }
}