import { GAME, GFX, WND } from "../../../managers";
import { Actor } from "../Actor";
import { PhysObject } from "../PhysObject";
import { Player } from "../Player";

export class RoomTrigger extends Actor {

    constructor(
        private newRoom: string,
        x: number, y: number,
        w: number, h: number,
        private transportX: number,
        private transportY: number
    ) {
        super(x, y, w, h, "Trigger", null);
    }

    collide(obj: PhysObject): void {
        if(obj instanceof Player) {
            console.log("player entered trigger");
            GAME.loadRoom(this.newRoom, this.transportX, this.transportY);
        }
    }

    update(): void {
    }

    draw() {
        if(WND.debug && this.image){
            GFX.ctx.drawImage(this.image, this.aabb.x, this.aabb.y, this.aabb.w, this.aabb.h);
        }
    }

}