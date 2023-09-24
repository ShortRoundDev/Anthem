import { Actor } from "../Actor";
import { PhysObject } from "../PhysObject";
import { CheckTalk, Conversation, DrawTalkNotification, Talkable } from "../Talkable";

export class InvisibleTalkableTrigger extends Actor implements Talkable {
    talkRadius: number;
    availableConversation?: Conversation | undefined;
    dialogOptions: Map<string, Conversation>;

    constructor(x: number, y: number, r: number, c: Conversation) {
        super(x, y, 0, 0, null, null);

        this.talkRadius = r;
        this.availableConversation = c;
        this.dialogOptions = new Map<string, Conversation>();
        this.dialogOptions.set("Talk", c);
    }

    collide(obj: PhysObject): void {

    }

    update(): void {
        CheckTalk.call(this);
    }

    draw(): void {
        DrawTalkNotification(this, this.aabb);
    }
}