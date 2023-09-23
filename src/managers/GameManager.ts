import { IRoom } from "../game/rooms/IRoom";
import { Barracks } from "../game/rooms/Barracks";
import { Square } from "../game/rooms/Square";
import { Farm } from "../game/rooms/Farm";
import { NorthPath } from "../game/rooms/NorthPath";
import { Conversation, DialogCallback, Talkable } from "../game/gameObjects/Talkable";

import { Player } from "../game/gameObjects/Player";
import { PhysObject } from "../game/gameObjects/PhysObject";
import { GFX } from "./";
import { Actor } from "../game/gameObjects/Actor";
import { GameObject } from "../game/gameObjects/GameObject";

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
    speak_to_golden_one = "speak_to_golden_one",
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

    destroyedThisFrame: boolean = false;

    dialogBoxes: HTMLElement[] = [];
    dialogCallback?: DialogCallback;
    talkablePartner: (Talkable & Actor) | null = null;

    constructor() {
        this.objectives = [];
        this.roomCache = new Map<string, IRoom>();
        this.paused = false;
    }

    init(): void {
        this.objectives = [
            { eventName: GameEvent.speak_to_golden_one,  description: "Speak to the Golden One" },
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
        this.roomCache.set("NorthPath", new NorthPath());

        this.player = new Player(0, 0);
        this.loadRoom("NorthPath", 512, 768 /2);
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

    showDialog(conversation: Conversation, partner: Talkable & Actor) {
        this.paused = true;
        this.dialogBoxes = [];
        this.dialogCallback = conversation.callback;
        this.talkablePartner = partner;

        for(let dialog of conversation.dialog){
            let box = document.createElement("div");
            box.className = "dialog-box";

            box.innerHTML = `
                <div id="picture" class="${dialog.side}">${dialog.image!.outerHTML}</div>
                <div id="name" class="${dialog.side}">${dialog.name}</div>`;

            let lines = dialog.text.split("\n");
            for(let j = 0; j < lines.length; j++){
                box.innerHTML += `<p style="animation-delay: ${j}s">${lines[j]}</p>`;
            }

            box.innerHTML += `<button>Next</button>`;

            if(dialog.image){
                let image = box.querySelector("#picture img")! as HTMLImageElement;
                image.style.animationIterationCount = `${lines.length * 5}`;
            }

            box.querySelector("button")!.addEventListener("click", this.nextDialog.bind(this));

            this.dialogBoxes.push(box);
        }
        this.nextDialog();
    }

    nextDialog(){
        document.querySelector(".dialog-box")?.remove();
        let next = this.dialogBoxes.shift();
        if(!next){
            if(this.dialogCallback){
                this.dialogCallback(this.player!, this.talkablePartner!);
            }
            this.dialogCallback = undefined;
            this.talkablePartner = null;
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

        if(this.destroyedThisFrame) {
            console.log("Destroyed this frame");
            for(let room of Array.from(this.roomCache.values())) {
                room.gameObjects = room.gameObjects.filter(g => !g.destroyed);
                room.walls = room.walls.filter(w => !w.destroyed);
            }
        }
        this.destroyedThisFrame = false;
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

    query(id: string, room?: string): GameObject | null {
        let roomSearch: IRoom[];
        if(room) {
            roomSearch = [this.roomCache.get(room)!];
        } else {
            roomSearch = Array.from(this.roomCache.values());
        }
        for(let room of roomSearch) {
            for(let obj of room.gameObjects) {
                console.log(obj.id, id);
                if(obj.id === id) {
                    return obj;
                }
            }
            for(let wall of room.walls) {
                if(wall.id === id) {
                    return wall;
                }
            }
        }
        console.warn(`Couldn't find object with id ${id} in room ${room}`)
        return null;
    }

    addObject(obj: GameObject, roomName: string): void  {
        let room: IRoom | undefined = this.roomCache.get(roomName);
        if(!room){
            console.warn("Room not found!");
            return;
        }
        room.gameObjects.push(obj);
    }
}