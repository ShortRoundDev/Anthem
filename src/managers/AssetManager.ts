export class AssetManager {

    imageCache: Map<string, HTMLImageElement>;

    constructor() {
        this.imageCache = new Map<string, HTMLImageElement>();
    }

    async init(): Promise<void> {
        await Promise.all([
            this.loadImage("Player",    "dist/assets/player_3.png"),
            this.loadImage("Bed",       "dist/assets/bed.png"),
            this.loadImage("Trigger",   "dist/assets/trigger.png"),
            this.loadImage("Barracks",  "dist/assets/Barracks.png"),
            this.loadImage("Square",    "dist/assets/Square.png"),
            this.loadImage("Gardener",  "dist/assets/npc-gardener.png"),
            this.loadImage("Dead-NPC",  "dist/assets/Dead-NPC.png"),
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