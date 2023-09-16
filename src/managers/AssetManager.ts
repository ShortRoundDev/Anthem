export class AssetManager {

    imageCache: Map<string, HTMLImageElement>;

    constructor() {
        this.imageCache = new Map<string, HTMLImageElement>();
    }

    async init(): Promise<void> {
        await Promise.all([
            //Entities
            this.loadImage("Player",    "dist/assets/player_3.png"),
            this.loadImage("Bed",       "dist/assets/bed.png"),
            this.loadImage("Trigger",   "dist/assets/trigger.png"),
            //Rooms
            this.loadImage("Barracks",  "dist/assets/Barracks.png"),
            this.loadImage("Square",    "dist/assets/Square.png"),
            this.loadImage("Farm",      "dist/assets/Farm.png"),
            //NPCs
            this.loadImage("Gardener",  "dist/assets/npc-gardener.png"),
            this.loadImage("Dead-NPC",  "dist/assets/Dead-NPC.png"),
            this.loadImage("GoldenOne", "dist/assets/GoldenOne.png"),
            //UI
            this.loadImage("ActionKey", "dist/assets/ActionKey.png"),
            this.loadImage("FarActionKey", "dist/assets/FarActionKey.png"),
            //Dialog
            this.loadImage("PlayerDialog", "dist/assets/Player_Dialog.png"),
            this.loadImage("NPCDialog", "dist/assets/NPC_Dialog.png"),
            this.loadImage("GoldenOneDialog", "dist/assets/GoldenOne_Dialog.png"),
        ]);
    }

    loadImage(name: string, path: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            let img = new Image;
            img.src = path;
            img.onload = () => {
                resolve(img);
            };
            img.onerror = () => {
                reject(name);
            }
            this.imageCache.set(name, img);
        });
    }

    getImage(name: string): HTMLImageElement | null {
        console.log("Get");
        if(this.imageCache.has(name)) {
            return this.imageCache.get(name) as HTMLImageElement;
        }
        return null;
    }
}