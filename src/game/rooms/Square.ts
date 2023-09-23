import { RoomTrigger } from "../gameObjects/triggers/RoomTrigger";
import { IRoom } from "./IRoom";
import { Wall } from "./Wall";
import { Gardener } from "../gameObjects/npc/Gardener";

export class Square extends IRoom {
    constructor() {
        super("Square");

        this.walls = [
            new Wall(38, 0, 64, 320),
            new Wall(38, 768/2 + 64, 64, 320),
            new Wall(0, 0, 1024/2 - 128, 32),
            new Wall(1024/2 + 128, 0, 1024/2 - 128, 32),
            new Wall(1024 - 52, 0, 32, 768/2 - 146),
            new Wall(1024 - 20, 768/2 - 146, 20, 64),
            new Wall(1024 - 52, 768/2 + 80, 52, 768/2 - 80),
        ];

        this.gameObjects.push(
            new RoomTrigger("Barracks",
                32, 768/2 - 64, 32, 128,
                1024 - 128, 768/2 - 32
            ),
            new RoomTrigger("Farm",
                1024 - 32, 768/2 - 64,
                32, 128,
                64, 768/2 - 32
            ),
            new RoomTrigger("NorthPath",
                1024/2 - 128, 0,
                256, 32,
                1024/2 - 32, 768 - 128
            ),
        )
    }
}