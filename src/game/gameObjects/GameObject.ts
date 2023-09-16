import { GAME } from "../../managers";

export abstract class GameObject {
    id?: string;
    destroyed: boolean = false;
    abstract update(): void;
    destroy(): void {
        this.destroyed = true;
    }
}