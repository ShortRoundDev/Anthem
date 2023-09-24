import { Gardener } from "../gameObjects/npc/Gardener";
import { RoomTrigger } from "../gameObjects/triggers/RoomTrigger";
import { GoldenOne } from "../gameObjects/npc/GoldenOne";
import { IRoom } from "./IRoom";
import { Wall } from "./Wall";

export class Farm extends IRoom {
    constructor() {
        super("Farm");
        this.walls = [
            new Wall(0, -1, 1024, 1),
            new Wall(1024, -1, 1, 768),
            new Wall(0, 768, 1024, 1),
            new Wall(0, 0, 16, 224, undefined, true),
            new Wall(0, 544, 16, 224, undefined, true),
            new Wall(0, 224, 640, 64, undefined, true),
            new Wall(0, 224, 640, 64, undefined, true),
            new Wall(768, 224, 183, 64, undefined, true),
            new Wall(936, 224, 16, 272, undefined, true),
            new Wall(0, 480, 640, 64, undefined, true),
            new Wall(768, 480, 183, 64, undefined, true),
            //new Wall(768, 480 + 640, 183, 64, undefined, true),
        ];


        this.gameObjects.push(
            new RoomTrigger("Square", 32, 768/2 - 64, 32, 128, 1024 - 128, 768/2 - 32),
            new Gardener(64, 96, Math.random() * 2 * Math.PI),
            new Gardener(320, 96, Math.random() * 2 * Math.PI),
            new Gardener(576, 96, Math.random() * 2 * Math.PI),
            new Gardener(832, 96, Math.random() * 2 * Math.PI),

            new Gardener(64, 608, Math.random() * 2 * Math.PI),
            new GoldenOne(320, 608, Math.PI/2),
            new Gardener(576, 608, Math.random() * 2 * Math.PI),
            new Gardener(832, 608, Math.random() * 2 * Math.PI),
        );

    }
}