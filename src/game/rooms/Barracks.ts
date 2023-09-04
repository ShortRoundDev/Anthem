import { IRoom } from "./IRoom";
import { Wall } from "./Wall";
import { RoomTrigger } from "../gameObjects/triggers/RoomTrigger";

export class Barracks extends IRoom {
    constructor() {
        super("Barracks");

        this.walls = [
            new Wall(0, 0, 1024, 64),
            new Wall(0, 64, 64, 768 - 64),
            new Wall(64, 768 - 64, 1024 - 64, 64),
            new Wall(1024 - 128, 64, 64, 256),
            new Wall(1024 - 128, 768 - 64 - 256, 64, 256),
            
            new Wall(128, 128, 120, 64, "Bed"),
            new Wall(128 * 2.5, 128, 120, 64, "Bed"),
            new Wall(128 * 4, 128, 120, 64, "Bed"),
            new Wall(128 * 5.5, 128, 120, 64, "Bed"),

            new Wall(128, 768 - 128 - 64, 120, 64, "Bed"),
            new Wall(128 * 2.5, 768 - 128 - 64, 120, 64, "Bed"),
            new Wall(128 * 4, 768 - 128 - 64, 120, 64, "Bed"),
            new Wall(128 * 5.5, 768 - 128 - 64, 120, 64, "Bed"),
        ]

        this.gameObjects.push(
            new RoomTrigger("Square", 1024-64, 768/2 - 64, 32, 128, 64, 352)
        );
    }
}