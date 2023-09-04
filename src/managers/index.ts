import { GameManager } from "./GameManager";
import { GraphicsManager } from "./GraphicsManager";
import { WindowManager } from "./WindowManager";
import { AssetManager } from "./AssetManager";

export let GFX: GraphicsManager = new GraphicsManager();
export let WND: WindowManager = new WindowManager();
export let GAME: GameManager = new GameManager();
export let ASSET: AssetManager = new AssetManager();

export async function initManagers(): Promise<void> {
    console.log("initializing managers");
    GFX.init();
    WND.init();
    await ASSET.init();
    GAME.init();
}