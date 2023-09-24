import { ASSET } from "../../../managers";
import { Player } from "../../gameObjects/Player";
import { Conversation } from "../../gameObjects/Talkable";
import { Bunker } from "../Bunker";

export function GeneratePrepper(): Conversation {
    return {
        dialog: [
            {
                name:   Player.NAME,
                side:   "left",
                image:  ASSET.getImage("PlayerDialog")!,
                text:   `These bones... they must be hundreds of years old.
                         Wait, what's this? A notebook? The pages are worn
                         from age, but I can still read it...`
            },
            {
                name:  Bunker.PREPPER_NAME,
                side:  "right",
                image: ASSET.getImage("PrepperDialog")!,
                text:  `This is the diary of Dave Oxnard, November 6th,
                        2024. Well, they've done it... they stole the
                        election, and with that, they started a war.
                        I suspect the anthrax bombs will start falling soon.`
            },
            {
                name:   Bunker.PREPPER_NAME,
                side:   "right",
                image:  ASSET.getImage("PrepperDialog")!,
                text:   `I've been preparing for this day for years. I've
                         got a few years of food and water, and my trusty
                         AR-15. When the UN comes for me, I'll be ready.`
            },
            {
                name:  Bunker.PREPPER_NAME,
                side:  "right",
                image: ASSET.getImage("PrepperDialog")!,
                text:  `It all started with the incandescent lightbulbs.
                        They said it was for the environment, but I knew
                        the truth. The new LED bulbs had 5G chips in them.`
            },
            {
                name:  Bunker.PREPPER_NAME,
                side:  "right",
                image: ASSET.getImage("PrepperDialog")!,
                text:  `I've managed to stash a crate full of bulbs here
                        with me, so I can read my favorite Ayn Rand novels
                        by their light`
            },
            {
                name:   Bunker.PREPPER_NAME,
                side:   "right",
                image:  ASSET.getImage("PrepperDialog")!,
                text:   `December 12th, 2024. Someone is knocking on my
                         hatch. They sound like my family... but it can't
                         be... surely they would have died from the
                         anthrax bombs by now. I'm not going to open it.`
            },
            {
                name:   Bunker.PREPPER_NAME,
                side:   "right",
                image:  ASSET.getImage("PrepperDialog")!,
                text:   `January 27th, 2025. The knocking continues. I
                         suspect that my wife and daughter are still
                         alive, but under the control of the 5G chips.
                         My food is running low.`
            },
            {
                name:   Bunker.PREPPER_NAME,
                side:   "right",
                image:  ASSET.getImage("PrepperDialog")!,
                text:   `I seriously miscalculated the number of cans
                         I needed. Math was never my strong suit...`
            },
            {
                name:   Bunker.PREPPER_NAME,
                side:   "right",
                image:  ASSET.getImage("PrepperDialog")!,
                text:   `February 14th, 2025. Well that's it. The
                         last can of SPAM. I've decided I don't
                         want to live in Joe Biden's America
                         anymore.`
            }, {
                name:   Bunker.PREPPER_NAME,
                side:   "right",
                image:  ASSET.getImage("PrepperDialog")!,
                text:   `I'm going to end it all. If anyone is
                         reading this: don't let them take your
                         light bulbs.`
            }, {
                name:   Bunker.PREPPER_NAME,
                side:   "right",
                image:  ASSET.getImage("PrepperDialog")!,
                text:   `Goodbye, cruel world. *BANG*`
            }, {
                name:   Player.NAME,
                side:   "left",
                image:  ASSET.getImage("PlayerDialog")!,
                text:   `Wow. That was... something. He actually
                         wrote "bang" in his diary.`
            }, {
                name:   Player.NAME,
                side:   "left",
                image:  ASSET.getImage("PlayerDialog")!,
                text:   `But these "lightbulbs" he mentioned...
                         they must be what is lighting the bunker!
                         Surely the science council will want to
                         see these.`
            }, {
                name:   Player.NAME,
                side:   "left",
                image:  ASSET.getImage("PlayerDialog")!,
                text:   `If I bring one to them, they will have to
                         let us onto the science council!`
            }, {
                name:   Player.NAME,
                side:   "left",
                image:  ASSET.getImage("PlayerDialog")!,
                text:   `Hm... What is this he is holding?`
            }
        ]
    }
}
