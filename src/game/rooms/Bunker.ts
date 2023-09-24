import { ASSET } from "../../managers";
import { IRoom } from "./IRoom";
import { InvisibleTalkableTrigger } from "../gameObjects/triggers/InvisibleTalkableTrigger";
import { GeneratePrepper } from "./data/Bunker.data";

export class Bunker extends IRoom {
    static PREPPER_NAME: string = "Dave";
    constructor() {
        super("Bunker");
        this.background = ASSET.getImage("Bunker")!;

        this.gameObjects = [
            new InvisibleTalkableTrigger(816, 243, 128, GeneratePrepper())
        ];
    }
}