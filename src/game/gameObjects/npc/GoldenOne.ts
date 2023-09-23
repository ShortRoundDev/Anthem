import { ASSET, GAME, GFX, WND } from "../../../managers";
import { Dialog } from "../../../managers/GameManager";
import { Actor, AnimationDescription, Animation } from "../Actor";
import { PhysObject } from "../PhysObject";
import { Player } from "../Player";
import { Prop } from "../Prop";
import { CheckTalk, Conversation, DrawTalkNotification, Talk, Talkable } from "../Talkable";

/* ==== Dialog ==== */
import { GenerateMeetGoldenOne } from "./data/GoldenOne.dialog";

export class GoldenOne extends Actor implements Talkable {
    /* ===== Actor properties ===== */
    actionKeyImage: HTMLImageElement;
    theta: number = 0;

    static readonly NAME: string = "Golden One";

    /* ===== Talkable properties ===== */
    talkRadius: number;
    availableConversation?: Conversation | undefined;
    dialogOptions: Map<string, Conversation>;

    constructor(x: number, y: number, angle: number) {
        super(x, y, 64, 64, "GoldenOne", new AnimationDescription(
            64,
            new Map<string, Animation>([
                ["Idle", new Animation(0, 0, 0)],
            ]),
            "Idle"
        ));
        this.id = "GoldenOne";

        /* ===== Actor constructor ===== */
        this.angle = angle;
        this.actionKeyImage = ASSET.getImage("ActionKey") as HTMLImageElement;

        /* ===== Talkable constructor ===== */
        this.talkRadius = 512;
        this.dialogOptions = new Map<string, Conversation>([
            ["MeetGoldenOne", GenerateMeetGoldenOne()]
        ]);

        this.availableConversation = this.dialogOptions.get("MeetGoldenOne");
    }
    /* ====== Actor methods ====== */
    collide(obj: PhysObject): void {

    }

    update(): void {
        this.updateFrame();
        console.log("checking talk")
        CheckTalk.call(this);
    }

    override draw(): void {
        super.draw();
        DrawTalkNotification(this, this.aabb);
    }
}