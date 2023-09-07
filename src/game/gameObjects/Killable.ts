import { Actor } from "./Actor";

export abstract class Killable extends Actor {
    health: number = 1;
}