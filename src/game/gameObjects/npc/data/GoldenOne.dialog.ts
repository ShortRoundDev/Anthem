import { ASSET, GAME } from "../../../../managers";
import { Actor } from "../../Actor";
import { Player } from "../../Player";
import { Prop } from "../../Prop";
import { Conversation, Talkable } from "../../Talkable";
import { GoldenOne } from "../GoldenOne";

/* These are written as functions because they rely on AssetManager and
 * GameManager to be initialized, so I don't want to call those at loadtime */

/* Dialog for when you first meet Golden One */
export function GenerateMeetGoldenOne(): Conversation {
    return {
        dialog: [
            {
                name:  Player.NAME,
                side:  "right",
                text:  `Oh Golden One, we hope that we will be assigned to
                        the science council today! We are ever so clever,
                        and our hands are too soft for the hoe!`,
                image: ASSET.getImage("PlayerDialog")!
            },
            {
                name:  GoldenOne.NAME,
                side:  "left",
                text:  `Indeed; your brains are too strong and your hands
                        too weak to waste in the fields. The science council
                        will surely see your worth!`,
                image: ASSET.getImage("GoldenOneDialog")!
            },
            {
                name:  Player.NAME,
                side:  "right",
                text:  `You are as wise as you are beautiful Golden One.
                        How couldn't we fall in love with a face like that.`,
                image: ASSET.getImage("PlayerDialog")!
            },
            {
                name:  GoldenOne.NAME,
                side:  "left",
                text:  `Your words are as warm as your head is bald.
                        It is about time to go to the council. Good luck,
                        ${Player.NAME}.`,
                image: ASSET.getImage("GoldenOneDialog")!
            }
        ],
        callback: (player: Player, talkable: Talkable & Actor) => {
            /* ===== Replace Gate ===== */
            GAME.query("Gate", "NorthPath")?.destroy();
            GAME.addObject(
                new Prop(1024/2 - 512/2, 82, 0, 0, "GateOpen"),
                "NorthPath"
            );

            /* ===== Delete Wall ===== */
            GAME.query("gateWall", "NorthPath")?.destroy();

            /* ===== Move Guard ===== */
            let guard = GAME.query("GateGuard", "NorthPath");
            if(guard instanceof Actor) {
                guard.aabb.x -= 256;
            }

            /* ===== Change Guard Dialog ===== */
            let guardTalkable = guard as unknown as Talkable;
            guardTalkable.availableConversation = guardTalkable.dialogOptions.get("GoAheadBuddy")!;

            /* ===== Change Goal ===== */
            console.log(GAME.objectives);
            GAME.objectives.splice(0, 1);
        }
    }
}