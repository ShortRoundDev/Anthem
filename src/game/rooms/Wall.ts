import { ASSET, GFX, WND } from "../../managers";
import { PhysObject } from "../gameObjects/PhysObject";
import { AABB } from "../physics/AABB";

export class Wall extends PhysObject {

    image?: HTMLImageElement;
    shootThrough: boolean = false;

    constructor(x: number, y: number, w: number, h: number, image?: string, shootThrough: boolean = false) {
        super(x, y, w, h);
        this.shootThrough = shootThrough;
        if(image){
            let imageElement = ASSET.getImage(image);
            if(imageElement) {
                this.image = imageElement;
            }
        }
    }

    collide(obj: PhysObject): void {
        
    }

    update(): void {
    }

    draw(): void {
        if(this.image) {
            GFX.ctx.drawImage(this.image, this.aabb.x, this.aabb.y, this.aabb.w, this.aabb.h);
        }
        if(WND.debug) {
            GFX.ctx.strokeStyle = "red";
            GFX.ctx.lineWidth = 1;
            GFX.ctx.strokeRect(this.aabb.x, this.aabb.y, this.aabb.w, this.aabb.h);
        }
    }
}