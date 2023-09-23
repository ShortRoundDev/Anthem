import { GAME, GFX } from "../../../managers";
import { Animation, AnimationDescription } from "../Actor";
import { Bullet } from "../Bullet";
import { Killable } from "../Killable";
import { PhysObject } from "../PhysObject";
import { CheckTalk, Conversation, DrawTalkNotification, Talkable } from "../Talkable";
import { DeadNpc } from "../dead/DeadNpc";

export class Archer extends Killable implements Talkable {

    /* ===== Archer stuff ===== */
    lastBullet: Bullet | null = null;

    /* ===== Talkable stuff ===== */
    talkRadius: number;
    availableConversation?: Conversation | undefined;
    dialogOptions: Map<string, Conversation>;

    constructor(
        x: number, y: number,
        angle: number,
        id?: string,
        dialogOptions: Map<string, Conversation> = new Map<string, Conversation>(),
        availableConversation?: string,
    ) {
        super(
            x, y,
            64, 64,
            "Archer",
            new AnimationDescription(64, new Map<string, Animation>([
                ["Stand", new Animation(0, 0, 0)],
                ["Action", new Animation(0, 2, 0.02)],
                ["Walk", new Animation(3, 6, 0.1)]
            ]), "Stand")
        );
        /* ===== Killable constructor ===== */
        this.angle = angle;
        this.health = 3;
        this.id = id;

        /* ===== Talkable constructor ===== */
        this.talkRadius = 128;
        this.dialogOptions = dialogOptions;
        if(availableConversation){
            let selectedConversation = dialogOptions.get(availableConversation);
            if(selectedConversation) {
                this.availableConversation = selectedConversation
            } else{
                console.warn(`Couldn't find conversation ${availableConversation} in dialogOptions for Archer!`);
            }
        }
    }

    collide(obj: PhysObject): void {
        if(obj instanceof Bullet && this.health > 0) {
            this.health--;
            this.lastBullet = obj as Bullet;
        }
    }
    update(): void {
        this.updateFrame();
        CheckTalk.call(this);
        if(this.health <= 0){
            this.destroy();
            let angle = Math.atan2(this.lastBullet!.yDir, this.lastBullet!.xDir);
            GAME.room!.gameObjects.push(new DeadNpc(this.aabb.x - 32, this.aabb.y, angle, "Archer"));
        }
    }

    draw(): void {
        super.draw();
        DrawTalkNotification(this, this.aabb);
    }
}