import { RoomTrigger } from "../gameObjects/triggers/RoomTrigger";
import { IRoom } from "./IRoom";
import { Prop } from "../gameObjects/Prop";
import { Archer } from "../gameObjects/npc/Archer";
import { Conversation, Talkable } from "../gameObjects/Talkable";
import { Wall } from "./Wall";
import { GenerateDoNotPass, GenerateGoAheadBuddy } from '../gameObjects/npc/data/GateGuard.dialog';

export class NorthPath extends IRoom {
    constructor() {
        super("NorthPath");

        this.walls = [
            new Wall(1024/2 - 276/2, 82, 276, 76, undefined, true, "gateWall"),
        ]

        this.gameObjects = [
            new RoomTrigger("Square",
                1024/2 - 64, 768 - 32,
                128, 32,
                1024/2 - 32, 64
            ),
            new Prop(1024/2 - (276/2), 82, 0, 0, "GateClosed", "Gate"),
            new Archer(
                1024/2 - 32, 172, 0,
                "GateGuard",
                new Map<string, Conversation>([
                    ["DoNotPass",       GenerateDoNotPass()],
                    ["GoAheadBuddy",    GenerateGoAheadBuddy()]
                ]),
                "DoNotPass"
            )
        ]
    }
}