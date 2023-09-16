import { ASSET, GAME, GFX, WND } from "../../../managers";
import { Dialog } from "../../../managers/GameManager";
import { Actor, AnimationDescription, Animation } from "../Actor";
import { PhysObject } from "../PhysObject";
import { Conversation, DrawTalkNotification, Talk, Talkable } from "../Talkable";

export class GoldenOne extends Actor implements Talkable {
    /* ===== Actor properties ===== */
    actionKeyImage: HTMLImageElement;
    theta: number = 0;

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
        this.talkRadius = 128;
        this.dialogOptions = new Map<string, Conversation>([
            ["MeetGoldenOne", {
                dialog: [
                    {
                        name: "Equality 7-2521",
                        side: "right",
                        text: `Oh Golden One, we hope that we will be assigned to
                                the science council today! We are ever so clever,
                                and our hands are too soft for the hoe!`, image: ASSET.getImage("PlayerDialog")!},
                    {
                        name: "Golden One",
                        side: "left",
                        text: `Indeed; your brains are too strong and your hands
                                too weak to waste in the fields. The science council
                                will surely see your worth!`, image: ASSET.getImage("GoldenOneDialog")!}
                ],
                callback: () => {
                    console.log("GoldenOne callback");
                }
            }]
        ]);

        this.availableConversation = this.dialogOptions.get("MeetGoldenOne");
    }
    /* ====== Actor methods ====== */
    collide(obj: PhysObject): void {

    }

    update(): void {
        this.updateFrame();

        if(
            WND.keyDown("e")
            && this.availableConversation
            && this.availableConversation.dialog.length
            && this.distance(GAME.player!) < 128
        ) {
            this.angle = Math.atan2(
                GAME.player!.aabb.y - this.aabb.y,
                GAME.player!.aabb.x - this.aabb.x
            ) - Math.PI/2;
            Talk(this);
        }
    }

    override draw(): void {
        super.draw();
        DrawTalkNotification(this, this.aabb);
    }
}