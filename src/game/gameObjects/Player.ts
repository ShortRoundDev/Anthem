import { GAME, WND } from "../../managers";
import { AABB } from "../physics/AABB";
import { Actor, Animation, AnimationDescription } from "./Actor";
import { Bullet } from "./Bullet";
import { PhysObject } from "./PhysObject";

export class Player extends Actor {
    isWalking: boolean = false;
    armed: boolean = true;
    shootTimeout: number = 0;
    moveVec: {x: number, y: number};

    constructor(x: number, y: number) {
        super(x, y, 64, 64, "Player", new AnimationDescription(
            64,
            new Map<string, Animation>([
                ["Stand-Disarmed", new Animation(0, 0, 0)],
                ["Walk-Disarmed", new Animation(0, 3, 0.1)],
                ["Stand-Armed", new Animation(4, 4, 0)],
                ["Walk-Armed", new Animation(4, 7, 0.08)]
            ]),
            "Stand-Disarmed"
        ));
        this.moveVec = {x: 0, y: 0};
    }

    getMouseAngle(): number {
        let mousePos = WND.mousePos();
        let dx = (this.aabb.x + this.aabb.w/2) - mousePos.x;
        let dy = (this.aabb.y + this.aabb.h/2) - mousePos.y;
        return Math.atan2(dy, dx);
    }

    checkKeys() {
        this.moveVec.x = 0;
        this.moveVec.y = 0;
        let moving: boolean = false;
        if(WND.keyDown("w")) {
            this.moveVec.y = -3;
            moving = true;
        }
        if(WND.keyDown("a")) {
            this.moveVec.x = -3;
            moving = true;
        }
        if(WND.keyDown("s")) {
            this.moveVec.y = 3;
            moving = true;
        }
        if(WND.keyDown("d")) {
            this.moveVec.x = 3;
            moving = true;
        }
    }

    checkShoot() {
        if(!this.armed) {
            return;
        }
        if(this.shootTimeout > 0){
            this.shootTimeout--;
        } else if(WND.mouseDown()) {
            this.shootTimeout = 5

            let outAngle = this.angle + Math.PI/2 + (Math.random() * Math.PI/10 - Math.PI/20);
            GAME.room!.gameObjects.push(new Bullet(
                this,
                this.aabb.x + this.aabb.w/2 + Math.cos(outAngle) * 36,
                this.aabb.y + this.aabb.h/2 + Math.sin(outAngle) * 36,
                Math.cos(outAngle), Math.sin(outAngle)
            ));
        }
    }

    checkMove(): void {
        let hypoX = new AABB(this.aabb.x + this.moveVec.x, this.aabb.y, this.aabb.w, this.aabb.h);
        let hypoY = new AABB(this.aabb.x, this.aabb.y + this.moveVec.y, this.aabb.w, this.aabb.h);

        for(let wall of GAME.room!.walls) {
            if(hypoX.intersects(wall.aabb)) {
                console.log("collide")
                this.moveVec.x = 0;
            }
            if(hypoY.intersects(wall.aabb)) {
                this.moveVec.y = 0;
            }
        }

        if(this.moveVec.x != 0 || this.moveVec.y != 0) {
            this.isWalking = true;
        } else {
            this.isWalking = false;
        }

        this.aabb.x += this.moveVec.x;
        this.aabb.y += this.moveVec.y;
    }

    update(): void {
        this.checkKeys();
        this.checkShoot();
        this.checkMove();

        let animationName = this.isWalking ? "Walk-" : "Stand-";
        animationName += this.armed ? "Armed" : "Disarmed";
        if(this.animationDescription){
            this.animationDescription.setAnimation(animationName);
        }

        this.angle = this.getMouseAngle() + Math.PI / 2;
        this.updateFrame();
    }

    collide(obj: PhysObject): void {
        if(obj instanceof Bullet && (obj as Bullet).parent != this) {
            console.log("Player hit by bullet");
        }

    }
}