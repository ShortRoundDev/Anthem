import { ASSET, GFX } from "../../managers";
import { Actor } from "../gameObjects/Actor";
import { GameObject } from "../gameObjects/GameObject";
import { Wall } from "./Wall";

export class IRoom {
    name: string;
    walls: Wall[];
    background?: HTMLImageElement;
    gameObjects: GameObject[];

    constructor(name: string) {
        this.name = name;
        this.walls = [];
        this.gameObjects = [];

        let backgroundImage = ASSET.getImage(name);
        if(backgroundImage) {
            this.background = backgroundImage;
        }
    }

    draw(): void {
        if(this.background){
            GFX.ctx.drawImage(this.background, 0, 0);
        }

        for(let wall of this.walls) {
            wall.draw();
        }

        for(let gameObject of this.gameObjects
            .filter(g => g instanceof Actor)
            .map(g => g as Actor)
        ) {
            gameObject.draw();
        }
    }

    update(): void {
        for(let gameObject of this.gameObjects) {
            gameObject.update();
        }
    }
}