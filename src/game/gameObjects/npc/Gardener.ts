import { GAME } from "../../../managers";
import { Animation, AnimationDescription } from "../Actor";
import { Bullet } from "../Bullet";
import { Killable } from "../Killable";
import { Conversation, Talkable } from "../Talkable";
import { PhysObject } from "../PhysObject";
import { DeadNpc } from "../dead/DeadNpc";

export class Gardener extends Killable implements Talkable {

    /* ===== Gardener's stuff ===== */
    lastBullet: Bullet | null = null;

    /* ===== Talkable stuff ===== */
    talkRadius: number;
    availableConversation?: Conversation | undefined;
    dialogOptions: Map<string, Conversation>;

    constructor(
        x: number,
        y: number,
        angle: number,
        dialogOptions: Map<string, Conversation> = new Map<string, Conversation>()
    ) {
        super(
            x, y,
            64, 64,
            "Gardener",
            new AnimationDescription(64, new Map<string, Animation>([
                ["Stand", new Animation(0, 0, 0)],
                ["Action", new Animation(0, 2, 0.02)]
            ]), "Action")
        );

        this.angle = angle;
        this.animationDescription!.frame = Math.random() * 2;
        this.health = 3;
        this.talkRadius = 128;
        this.dialogOptions = dialogOptions;
    }

    collide(obj: PhysObject): void {
        if(obj instanceof Bullet && this.health > 0) {
            this.health--;
            this.lastBullet = obj as Bullet;
        }
    }

    update(): void {
        this.updateFrame();
        if(this.health <= 0){
            this.destroy();
            let angle = Math.atan2(this.lastBullet!.yDir, this.lastBullet!.xDir);
            GAME.room!.gameObjects.push(new DeadNpc(this.aabb.x - 32, this.aabb.y, angle, "Gardener"));
        }
    }
}