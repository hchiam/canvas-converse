import { NaivePhysics } from "./naivePhysics";

export class CanvasConverseObject {
  key?: number;
  type?: string;
  options?: CanvasConverseGeneralOptions;
  children?: CanvasConverseObject[];
}

export class CanvasConverseGeneralOptions {
  h: string | number;
  w: string | number;
  physics?: boolean;
}

export class CanvasConverseDrawingOptions {}

export abstract class CanvasConverseClassContract {
  objects: CanvasConverseObject;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  options: CanvasConverseGeneralOptions;
  h: number;
  w: number;
  physicsEngine: NaivePhysics;

  init(canvas: HTMLCanvasElement, options: CanvasConverseGeneralOptions) {}

  rectangle(options: {
    x: number;
    y: number;
    w: number;
    h: number;
    rotation: number;
    rotationX: number;
    rotationY: number;
    cornerRadii: number;
    fill: string;
    stroke: string;
    lineWidth: number;
    filter: string;
    physics: boolean;
    outlineGroup: string;
    addObject: boolean;
  }) {}

  triangle(options: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
    rotation: number;
    rotationX: number;
    rotationY: number;
    fill: string;
    filter: string;
    physics: boolean;
    outlineGroup: string;
    addObject: boolean;
  }) {}

  ellipse(options: {
    x: number;
    y: number;
    r: number;
    rx: number;
    ry: number;
    fill: string;
    stroke: string;
    lineWidth: number;
    filter: string;
    centerRotation: number;
    centerStartAngle: number;
    centerEndAngle: number;
    rotation: number;
    rotationX: number;
    rotationY: number;
    counterclockwise: boolean;
    physics: boolean;
    outlineGroup: string;
    addObject: boolean;
  }) {}

  line(options: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    lineWidth: number;
    stroke: string;
    filter: string;
    rotation: number;
    rotationX: number;
    rotationY: number;
    lineCap: string;
    physics: string;
    outlineGroup: string;
    addObject: boolean;
  }) {}

  draw(
    options: {
      x: number;
      y: number;
      rotation: number;
      rotationX: number;
      rotationY: number;
      fill: string;
      filter: string;
      physics: boolean;
      outlineGroup: string;
      addObject: boolean;
    },
    callbackWithContext: Function
  ) {}

  group(
    objectToAttachTo: CanvasConverseObject,
    arrayOfObjectsToAttach: CanvasConverseObject[] = []
  ) {}

  clear() {}
}

export class OutlineGroups {
  [key: number]: OutlineGroup;
}

export class OutlineGroup {
  drawShapesCallback: Function;
  stroke: string;
  fill: string;
  lineWidth: number;
  filter: string;
}
