import { RoomTrigger } from "../gameObjects/triggers/RoomTrigger";
import { IRoom } from "./IRoom";
import { Wall } from "./Wall";

export class Square extends IRoom {
    constructor() {
        super("Square");

        this.walls = [
            new Wall(38, 0, 64, 320),
            new Wall(38, 768/2 + 64, 64, 320),
        ];

        this.gameObjects.push(
            new RoomTrigger("Barracks", 32, 768/2 - 64, 32, 128, 1024 - 128, 768/2 - 32)
        )
    }
}