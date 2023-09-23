import { ASSET, GAME, GFX, WND } from "../../managers";
import { Dialog, GameManager } from "../../managers/GameManager";
import { AABB } from "../physics/AABB";
import { Actor } from "./Actor";
import { Player } from "./Player";

export type DialogCallback = (player: Player, talkable: Talkable & Actor) => void;

export type Conversation = {
    dialog: Dialog[];
    callback?: DialogCallback;
}

export interface Talkable {
    talkRadius: number;

    availableConversation?: Conversation;
    dialogOptions: Map<string, Conversation>;
}

export function Talk(talkable: Talkable & Actor, name?: string): void {
    let conversation: Conversation | undefined;
    if(name) {
        conversation = talkable.dialogOptions.get(name);
        if(!conversation){
            console.error(`Dialog ${name} not found!`);
            return;
        }
    } else {
        if(!talkable.availableConversation?.dialog.length) {
            console.error(`No available dialog for ${talkable}!`);
            return;
        }
        conversation = talkable.availableConversation;
        talkable.availableConversation = undefined;
    }
    GAME.showDialog(conversation, talkable);
}

function CreateDrawTalkNotificationClosure() {
    let theta: number = 0.0;
    let notificationImage: HTMLImageElement | null = null;
    let farNotificationImage: HTMLImageElement | null = null;

    return function _DrawTalkNotification(talkable: Talkable, aabb: AABB): void {
        theta += 0.07;
        if(notificationImage === null) {
            notificationImage = ASSET.getImage("ActionKey");
        }
        if(farNotificationImage === null) {
            farNotificationImage = ASSET.getImage("FarActionKey");
        }

        if(!talkable.availableConversation?.dialog.length) {
            return;
        }

        let distance = Math.sqrt(
            Math.pow(aabb.x - GAME.player!.aabb.x, 2) +
            Math.pow(aabb.y - GAME.player!.aabb.y, 2)
        );

        let image: HTMLImageElement = farNotificationImage!;
        if(distance < talkable.talkRadius) {
            image = notificationImage!;
        }

        GFX.ctx.drawImage(
            image,
            aabb.x + aabb.w/2 - 8, aabb.y - 48 + Math.cos(theta) * 6,
            16, 37.5
        );
    }
}

export function CheckTalk(this: Talkable & Actor) {
    if(
        WND.keyDown("e")
        && this.availableConversation
        && this.availableConversation.dialog.length
        && this.distance(GAME.player!) < this.talkRadius
    ) {
        this.angle = Math.atan2(
            GAME.player!.aabb.y - this.aabb.y,
            GAME.player!.aabb.x - this.aabb.x
        ) - Math.PI/2;
        Talk(this);
    }
}

export const DrawTalkNotification: (talkable: Talkable, aabb: AABB) => void
    = CreateDrawTalkNotificationClosure();