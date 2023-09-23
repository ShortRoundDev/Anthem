import { ASSET, GAME } from "../../../../managers";
import { Actor } from "../../Actor";
import { Player } from "../../Player";
import { Prop } from "../../Prop";
import { Conversation, Talkable } from "../../Talkable";

/* These are written as functions because they rely on AssetManager and
 * GameManager to be initialized, so I don't want to call those at loadtime */

/* Dialog for when you first meet Golden One */

const GuardName: string = "Harmony 4-1290"

export function GenerateDoNotPass(): Conversation {
    const NPCImage      = ASSET.getImage("NPCDialog")!;
    const PlayerImage   = ASSET.getImage("PlayerDialog")!;

    return {
        dialog: [
            {
                "name": GuardName,
                "side": "left",
                "text": "The council are not taking visitors. Please leave.",
                "image": NPCImage
            },
            {
                name: Player.NAME,
                side: "right",
                text: `Unity upon you, brother.`,
                image: PlayerImage
            }
        ],
        callback: (player: Player, talkable: Talkable & Actor) => {
            talkable.availableConversation = talkable.dialogOptions.get("DoNotPass")!;
        }
    }
}

export function GenerateGoAheadBuddy(): Conversation {
    const NPCImage      = ASSET.getImage("NPCDialog")!;
    const PlayerImage   = ASSET.getImage("PlayerDialog")!;
    return {
        dialog: [
            {
                "name": GuardName,
                "side": "left",
                "text": "The council is now assigning jobs. Go ahead in.",
                "image": NPCImage
            },
            {
                "name": Player.NAME,
                "side": "right",
                "text": "Thank you brother, unity upon you.",
                "image": PlayerImage
            },
            {
                "name": GuardName,
                "side": "left",
                "text": "Uh, and you... go with... unification...ism...itude",
                "image": NPCImage
            }
        ]
    }
}