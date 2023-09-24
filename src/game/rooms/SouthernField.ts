import { ASSET } from "../../managers";
import { IRoom } from "./IRoom";
import { Dirt } from "../gameObjects/Dirt";

export class SouthernField extends IRoom {
    constructor() {
        super("SouthernField");

        this.background = ASSET.getImage("SouthernField")!;

        this.gameObjects = [
            new Dirt()
        ]
    }

}