import { IRoom } from "../game/rooms/IRoom";
import { Barracks } from "../game/rooms/Barracks";
import { Square } from "../game/rooms/Square";
import { Farm } from "../game/rooms/Farm";

import { Player } from "../game/gameObjects/Player";
import { PhysObject } from "../game/gameObjects/PhysObject";
import { GFX } from "./";

type Objective = {
    eventName: string;
    description: string;
}

export type Dialog = {
    name: string;
    image: HTMLImageElement;
    side: "left" | "right";
    text: string;
};

export enum GameEvent {
    observe_golden_one  = "observe_golden_one",
    get_job             = "get_job",
    find_light          = "find_light",
    show_council        = "show_council",
    escape_council      = "escape_council",
    find_golden_one     = "find_golden_one",
    escape_commune      = "escape_commune"
};

export class GameManager {
    room?: IRoom;
    objectives: Objective[];

    paused: boolean;

    roomCache: Map<string, IRoom>;
    player?: Player;

    dialogBoxes: HTMLElement[] = [];
    dialogCallback?: () => void;

    constructor() {
        this.objectives = [];
        this.roomCache = new Map<string, IRoom>();
        this.paused = false;
    }

    init(): void {
        this.objectives = [
            { eventName: GameEvent.observe_golden_one,   description: "Observe the Golden One" },
            { eventName: GameEvent.get_job,              description: "Go to the council for your Job assignment" },
            { eventName: GameEvent.find_light,           description: "Find the Light" },
            { eventName: GameEvent.show_council,         description: "Show the Council the Light" },
            { eventName: GameEvent.escape_council,       description: "Escape the Council" },
            { eventName: GameEvent.find_golden_one,      description: "Find the Golden One" },
            { eventName: GameEvent.escape_commune,       description: "Escape the Commune" }
        ];

        this.roomCache.set("Barracks", new Barracks());
        this.roomCache.set("Square", new Square());
        this.roomCache.set("Farm", new Farm());

        this.player = new Player(0, 0);
        this.loadRoom("Farm", 184, 768 - 100);
    }

    draw() {
        this.room!.draw();
        this.drawObjective();
    }

    loadRoom(newRoom: string, x: number, y: number) {
        let idx = this.room?.gameObjects.indexOf(this.player!);
        if(idx !== undefined && idx !== -1){
            this.room?.gameObjects.splice(idx, idx);
        }

        this.room = this.roomCache.get(newRoom) as IRoom;
        this.player!.aabb.x = x;
        this.player!.aabb.y = y;

        this.room.gameObjects.push(this.player!);
    }

    showDialog(text: Dialog[], callback?: () => void) {
        this.paused = true;
        this.dialogBoxes = [];

        for(let dialog of text){
            let box = document.createElement("div");
            box.className = "dialog-box";

            box.innerHTML = `
                <div id="picture" class="${dialog.side}"></div>
                <div id="name" class="${dialog.side}">${dialog.name}</div>`;

            let lines = dialog.text.split("\n");
            for(let j = 0; j < lines.length; j++){
                box.innerHTML += `<p style="animation-delay: ${j}s">${lines[j]}</p>`;
            }

            box.innerHTML += `<button>Next</button>`;
            if(dialog.image){
                let picture = box.querySelector("#picture");
                picture?.appendChild(dialog.image);
                dialog.image.style.animationIterationCount = `${lines.length * 5}`;
            }
            //.appendChild(dialog.image);
            box.querySelector("button")!.addEventListener("click", this.nextDialog.bind(this));

            this.dialogBoxes.push(box);
        }
        this.nextDialog();
    }

    nextDialog(){
        document.querySelector(".dialog-box")?.remove();
        let next = this.dialogBoxes.shift();
        if(!next){
            this.paused = false;
            return;
        }
        document.body.appendChild(next!);
    }

    update() {
        if(this.paused) {
            return;
        }
        this.room!.update();

        let physObjects = this.room!.gameObjects
            .filter(g => g instanceof PhysObject)
            .map(g => g as PhysObject)
            .filter(p => p.solid);

        for(let i = 0; i < physObjects.length; i++) {
            for(let j = i + 1; j < physObjects.length; j++) {
                let a = physObjects[i];
                let b = physObjects[j];

                if(a.aabb.intersects(b.aabb)) {
                    a.collide(b);
                    b.collide(a);
                }
            }
            for(let wall of this.room!.walls) {
                if(wall.aabb.intersects(physObjects[i].aabb)) {
                    physObjects[i].collide(wall);
                }
            }
        }

        this.room!.gameObjects = this.room!.gameObjects.filter(g => !g.destroyed);
    }

    drawObjective() {
        let objective = this.objectives[0];
        let objectiveText = objective.description;
        GFX.ctx.font = "20px Consolas";
        let textSize = GFX.ctx.measureText(objectiveText);

        GFX.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        GFX.ctx.fillRect(0, 16, textSize.width + 20, 48);

        GFX.ctx.fillStyle = "white";
        GFX.ctx.fillText("Objective:", 10, 36);
        GFX.ctx.fillStyle = "yellow";
        GFX.ctx.fillText(objectiveText, 10, 56);
    }
}