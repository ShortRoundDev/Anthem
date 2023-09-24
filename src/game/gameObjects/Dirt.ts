import { ASSET, GAME, GFX, WND } from "../../managers";
import { AABB } from "../physics/AABB";
import { Actor } from "./Actor";
import { PhysObject } from "./PhysObject";
import { UseRoomTrigger } from "./triggers/UseRoomTrigger";

export class Dirt extends Actor {
    image: HTMLImageElement;

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    sweep: boolean = true;

    doorPos: AABB;

    door: AABB[];
    doorIsVisible: boolean = false;

    constructor(){
        super(0, 0, 1024, 768, null, null);

        this.canvas = document.createElement("canvas");
        this.canvas.width = 1024;
        this.canvas.height = 768;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.image = ASSET.getImage("Dirt")!;
        if(this.image){
            this.ctx.drawImage(this.image, 0, 0);
        }
        this.door = [];
        this.doorPos = new AABB(768, 576, 128, 128);
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < 16; j++){
                this.door.push(new AABB(768 + i * 8, 576 + j * 8, 8, 8));
            }
        }
    }

    collide(obj: PhysObject): void {
    }

    update(): void {
        if(this.sweep && WND.mouseDown()) {
            let mousePos = WND.mousePos();
            //calculate distance from player to mousePos:
            let dx = (GAME.player!.aabb.x + GAME.player!.aabb.w/2) - mousePos.x;
            let dy = (GAME.player!.aabb.y + GAME.player!.aabb.h/2) - mousePos.y;
            let dist = Math.sqrt(dx*dx + dy*dy);

            if(dist < 160) {
                // erase the dirt
                const rad = 64;
                const grd = this.ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, rad);
                grd.addColorStop(0, "rgba(0, 0, 0, 1)");
                grd.addColorStop(1, "rgba(0, 0, 0, 0)");
                let gco = this.ctx.globalCompositeOperation;
                this.ctx.globalCompositeOperation = "destination-out";
                this.ctx.fillStyle = grd;
                this.ctx.beginPath();
                this.ctx.arc(mousePos.x, mousePos.y, rad, 0, 2 * Math.PI);
                this.ctx.closePath();
                this.ctx.fill();
                this.sweep = false;
                this.ctx.globalCompositeOperation = gco;

                //calculate intersection between radial and doorPos:

                if(!this.doorIsVisible) {
                    this.checkDoorVisibility(mousePos.x, mousePos.y, 32);
                }

                setTimeout(() => this.sweep = true, 200);
            }
        }
    }

    draw() {
        if(WND.debug) {
            for(let door of this.door) {
                GFX.ctx.strokeStyle = "red";
                GFX.ctx.strokeRect(door.x, door.y, door.w, door.h);
            }
        }
        GFX.ctx.drawImage(this.canvas, 0, 0);
    }

    private checkDoorVisibility(x: number, y: number, r: number) {
        let px = Math.min(Math.max(x, this.doorPos.x), this.doorPos.x + this.doorPos.w);
        let py = Math.min(Math.max(y, this.doorPos.y), this.doorPos.y + this.doorPos.h);

        let d = Math.sqrt((px - x) * (px - x) + (py - y) * (py - y));
        if(d <= r){
            console.log("Hit!");
            this.door = this.door.filter(door => {
                let px = Math.min(Math.max(x, door.x), door.x + door.w);
                let py = Math.min(Math.max(y, door.y), door.y + door.h);
                let d = Math.sqrt((px - x) * (px - x) + (py - y) * (py - y));
                return d > r;
            });
            if(this.door.length < 64) {
                this.doorIsVisible = true;
                GAME.addObject(
                    new UseRoomTrigger(
                        this.doorPos.x, this.doorPos.y, 128,
                        "Bunker", 96, 288
                    ), "SouthernField");
            }
        }

    }
}