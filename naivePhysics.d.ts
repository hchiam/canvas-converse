import { CanvasConverse } from "./script";
import { CanvasConverseObject, OutlineGroups } from "./types";
export declare class NaivePhysics {
    #private;
    canvasConverse: CanvasConverse;
    objects: CanvasConverseObject;
    outlineGroups: OutlineGroups;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    bounceCoefficient: number;
    collisionCoefficient: number;
    gravityCoefficient: number;
    constructor(canvasConverse: CanvasConverse);
}
