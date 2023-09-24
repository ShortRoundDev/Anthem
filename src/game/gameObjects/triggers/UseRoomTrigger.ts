import { GAME, GFX, WND } from "../../../managers";
import { Actor } from "../Actor";
import { PhysObject } from "../PhysObject";
import { CreateDrawTalkIconClosure } from "../Talkable";

export class UseRoomTrigger extends Actor {
    drawTalkIcon: (point: {x: number, y: number}, radius: number) => void = CreateDrawTalkIconClosure();
    constructor(
        x: number, y: number,
        private r: number,
        private roomName: string,
        private px: number, private py: number
    ) {
        super(x, y, 32, 32, "Trigger", null);
    }

    collide(obj: PhysObject): void {
    }

    update(): void {
        if(GAME.player!.aabb.distance(this.aabb) < 64 && WND.keyDown("e")) {
            GAME.loadRoom(this.roomName, this.px, this.py);
        }
    }

    draw(): void {
        if(WND.debug && this.image){
            GFX.ctx.drawImage(this.image, this.aabb.x, this.aabb.y, this.aabb.w, this.aabb.h);
        }
        this.drawTalkIcon(this.aabb, this.r);
    }
}