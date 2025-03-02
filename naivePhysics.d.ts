import { CanvasConverse } from "./script";
import { CanvasConverseObject } from "./types";
export declare class NaivePhysics {
    #private;
    canvasConverse: CanvasConverse;
    objects: CanvasConverseObject;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    bounceCoefficient: number;
    collisionCoefficient: number;
    gravityCoefficient: number;
    constructor(canvasConverse: any);
}
