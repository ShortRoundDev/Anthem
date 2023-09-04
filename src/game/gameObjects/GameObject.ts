import { GAME } from "../../managers";

export abstract class GameObject {
    destroyed: boolean = false;
    abstract update(): void;
    destroy(): void {
        this.destroyed = true;
    }
}