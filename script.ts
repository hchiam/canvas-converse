import {
  CanvasConverseClassContract,
  CanvasConverseObject,
  CanvasConverseGeneralOptions,
  OutlineGroups,
  CanvasConverseDrawingOptions,
} from "./types";
import { NaivePhysics } from "./naivePhysics.js";

export class CanvasConverse implements CanvasConverseClassContract {
  objects: CanvasConverseObject;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  options: CanvasConverseGeneralOptions;
  h: number;
  w: number;
  physicsEngine: NaivePhysics;

  constructor(/** still need to call init */) {
    this.objects = {};
  }

  init(
    canvas: HTMLCanvasElement,
    options: CanvasConverseGeneralOptions = { h: 0, w: 0 }
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as any;
    this.options = options;
    this.h = Number(options.h);
    this.w = Number(options.w);
    if (typeof this.h !== "undefined") {
      if (typeof this.h === "string") {
        this.canvas.style.height = this.h;
      } else {
        this.canvas.height = this.h;
      }
    }
    if (typeof this.w !== "undefined") {
      if (typeof this.w === "string") {
        this.canvas.style.width = this.w;
      } else {
        this.canvas.width = this.w;
      }
    }
    this.w ??= Number(this.canvas.width || this.canvas.style.width);
    this.h ??= Number(this.canvas.height || this.canvas.style.height);
    this.physicsEngine = new NaivePhysics(this);
  }

  rectangle({
    x,
    y,
    w,
    h,
    rotation = 0 /* degrees */,
    rotationX /* x position of rotation */,
    rotationY /* y position of rotation */,
    cornerRadii /* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect */,
    fill,
    stroke,
    lineWidth,
    filter,
    physics,
    outlineGroup = "",
    addObject = true,
  }) {
    const usingOutlineGroup = this.#isUsingOutlineGroup();
    if (usingOutlineGroup) {
      outlineGroup = String(Object.keys(this.outlineGroups).length);
    }
    this.#isolateStyles(() => {
      if (rotation !== 0) {
        this.#rotate(rotationX ?? x, rotationY ?? y, rotation);
      }
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      if (cornerRadii) {
        this.context.roundRect(x, y, w, h, cornerRadii);
      } else {
        this.context.rect(x, y, w, h);
      }
      this.context.filter = filter ?? "none";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      if (fill) {
        this.context.fillStyle = fill ?? "transparent";
        if (cornerRadii) {
          this.context.fill();
        } else {
          this.context.fillRect(x, y, w, h);
        }
      }
      if (stroke && !usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.strokeStyle = stroke ?? "transparent";
        if (lineWidth) {
          this.context.lineWidth = lineWidth ?? 0;
          if (cornerRadii) {
            this.context.stroke();
          } else {
            this.context.strokeRect(x, y, w, h);
          }
        }
      }
    });

    if (addObject) {
      return this.#addObject("rectangle", {
        x,
        y,
        w,
        h,
        rotation,
        rotationX,
        rotationY,
        cornerRadii,
        fill,
        stroke,
        lineWidth,
        filter,
        physics,
        outlineGroup,
      });
    }
  }

  triangle({
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    rotation = 0 /* degrees */,
    rotationX /* x position of rotation */,
    rotationY /* y position of rotation */,
    fill,
    stroke,
    lineWidth,
    filter,
    physics,
    outlineGroup = "",
    addObject = true,
  }) {
    const usingOutlineGroup = this.#isUsingOutlineGroup();
    if (usingOutlineGroup) {
      outlineGroup = String(Object.keys(this.outlineGroups).length);
    }

    this.#isolateStyles(() => {
      if (rotation !== 0) {
        this.#rotate(rotationX ?? x1, rotationY ?? y1, rotation);
      }
      this.context.fillStyle = fill ?? "transparent";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.lineTo(x3, y3);
      this.context.lineTo(x1, y1);
      this.context.filter = filter ?? "none";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      this.context.fill();

      if (stroke && !usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.strokeStyle = stroke ?? "transparent";
        if (lineWidth) {
          this.context.lineWidth = lineWidth ?? 0;
          this.context.stroke();
        }
      }
    });

    if (addObject) {
      return this.#addObject("triangle", {
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        rotation,
        rotationX,
        rotationY,
        fill,
        stroke,
        lineWidth,
        filter,
        physics,
        outlineGroup,
      });
    }
  }

  ellipse({
    x,
    y,
    r,
    rx,
    ry,
    fill,
    stroke,
    lineWidth,
    filter,
    centerRotation = 0 /* degrees */,
    centerStartAngle = 0 /* degrees */,
    centerEndAngle = 360 /* degrees */,
    rotation = 0 /* degrees */,
    rotationX /* x position of rotation */,
    rotationY /* y position of rotation */,
    counterclockwise = false,
    physics,
    outlineGroup = "",
    addObject = true,
  }) {
    const usingOutlineGroup = this.#isUsingOutlineGroup();
    if (usingOutlineGroup) {
      outlineGroup = String(Object.keys(this.outlineGroups).length);
    }

    this.#isolateStyles(() => {
      if (rotation !== 0) {
        this.#rotate(rotationX ?? x, rotationY ?? y, rotation);
      }
      this.context.fillStyle = fill ?? "transparent";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      rx = rx ?? r;
      ry = ry ?? r;
      if (typeof r === "undefined" && rx === ry) r = rx;
      this.context.ellipse(
        x,
        y,
        rx,
        ry,
        (centerRotation * Math.PI) / 180,
        (centerStartAngle * Math.PI) / 180,
        (centerEndAngle * Math.PI) / 180,
        rotation,
        // @ts-ignore (ellipse is supposed to have 11 arguments)
        rotationX,
        rotationY,
        counterclockwise
      );
      this.context.filter = filter ?? "none";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      this.context.fill();
      if (stroke && !usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.strokeStyle = stroke ?? "transparent";
        if (lineWidth) {
          this.context.lineWidth = lineWidth ?? 0;
          this.context.stroke();
        }
      }
    });

    if (addObject) {
      return this.#addObject("ellipse", {
        x,
        y,
        r,
        rx,
        ry,
        fill,
        stroke,
        lineWidth,
        filter,
        centerRotation,
        centerStartAngle,
        centerEndAngle,
        rotation,
        rotationX,
        rotationY,
        counterclockwise,
        physics,
        outlineGroup,
      });
    }
  }

  line({
    x1,
    y1,
    x2,
    y2,
    lineWidth,
    stroke,
    filter,
    rotation = 0 /* degrees */,
    rotationX /* x position of rotation */,
    rotationY /* y position of rotation */,
    lineCap,
    physics,
    outlineGroup = "",
    addObject = true,
  }) {
    const usingOutlineGroup = this.#isUsingOutlineGroup();
    if (usingOutlineGroup) {
      outlineGroup = String(Object.keys(this.outlineGroups).length);
    }

    this.#isolateStyles(() => {
      if (rotation !== 0) {
        this.#rotate(
          rotationX ?? (x1 + x2) / 2,
          rotationY ?? (y1 + y2) / 2,
          rotation
        );
      }
      if (stroke) {
        this.context.strokeStyle = stroke ?? "transparent";
      }
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.lineWidth = lineWidth ?? 1;
      if (lineCap) this.context.lineCap = lineCap;
      this.context.filter = filter ?? "none";
      this.context.stroke();
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
    });

    if (addObject) {
      return this.#addObject("line", {
        x1,
        y1,
        x2,
        y2,
        lineWidth,
        stroke,
        filter,
        rotation,
        rotationX,
        rotationY,
        lineCap,
        physics,
        outlineGroup,
      });
    }
  }

  draw(
    {
      x,
      y,
      rotation = 0 /* degrees */,
      rotationX /* x position of rotation */,
      rotationY /* y position of rotation */,
      fill,
      filter,
      physics,
      outlineGroup = "",
      addObject = true,
    },
    callbackWithContext
  ) {
    const usingOutlineGroup = this.#isUsingOutlineGroup();
    if (usingOutlineGroup) {
      outlineGroup = String(Object.keys(this.outlineGroups).length);
    }

    this.#isolateStyles(() => {
      if (rotation !== 0) {
        this.#rotate(rotationX ?? x, rotationY ?? y, rotation);
      }
      this.context.fillStyle = fill ?? "transparent";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      callbackWithContext(this.context);
      this.context.filter = filter ?? "none";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      this.context.fill();
    });

    if (addObject) {
      return this.#addObject("draw", {
        x,
        y,
        rotation,
        rotationX,
        rotationY,
        fill,
        filter,
        physics,
        outlineGroup,
        callbackWithContext,
      });
    }
  }

  group(objectToAttachTo, arrayOfObjectsToAttach: CanvasConverseObject[] = []) {
    objectToAttachTo.children = arrayOfObjectsToAttach.filter(
      (obj) => !obj?.options?.physics
      // to keep things simple for now,
      // don't attach objects that have their own physics.
    );
    objectToAttachTo.children.forEach((child) => {
      if (child) child.isChild = true;
    });
  }

  usingOutlineGroup = false;
  outlineGroups: OutlineGroups = {};
  makeOutlineGroup({
    drawShapesCallback,
    stroke,
    fill,
    lineWidth,
    filter,
    outlineGroupKey,
  }) {
    this.usingOutlineGroup = true;

    this.context.beginPath();

    const nextKey = Object.keys(this.outlineGroups).length + 1; // start at 1
    outlineGroupKey = outlineGroupKey ?? nextKey;
    this.outlineGroups[outlineGroupKey] = {
      stroke: stroke,
      fill: fill,
      lineWidth: lineWidth,
      filter: filter,
    };

    drawShapesCallback(stroke, outlineGroupKey);

    this.context.filter = filter ?? "none";

    this.context.closePath();

    this.context.strokeStyle = stroke;
    this.context.lineWidth = lineWidth;
    this.context.stroke();
    if (fill) {
      this.context.fillStyle = fill;
      this.context.fill();
    }

    this.usingOutlineGroup = false;
  }

  text({
    text,
    x = 0,
    y = 0,
    font,
    type,
    style,
    baseline = "top",
    rotation = 0 /* degrees */,
    rotationX /* x position of rotation */,
    rotationY /* y position of rotation */,
    scale,
    addObject = true,
  }) {
    this.#isolateStyles(() => {
      (this.context.textBaseline as any) = baseline;
      if (rotation !== 0) {
        this.#rotate(rotationX ?? x, rotationY ?? y, rotation);
      }
      if (scale) {
        this.context.scale(scale[0], scale[1]);
      }
      if (font) this.context.font = font;
      if (type === "stroke") {
        if (style) this.context.strokeStyle = style;
        this.context.strokeText(text, x, y);
      } else {
        if (style) this.context.fillStyle = style;
        this.context.fillText(text, x, y);
      }
    });

    if (addObject) {
      return this.#addObject("text", {
        text,
        x,
        y,
        font,
        type,
        style,
        baseline,
        rotation,
        rotationX,
        rotationY,
        scale,
      });
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.w, this.h);
  }

  #addObject(type: string, options: CanvasConverseDrawingOptions) {
    const newKey = Object.keys(this.objects).length;
    this.objects[newKey] = {
      key: newKey,
      type: type,
      options: options,
      children: [],
    };
    return this.objects[newKey];
  }

  #isolateStyles(drawingCallback: Function) {
    // prevent style leak e.g. fill
    this.context.save();
    drawingCallback();
    this.context.restore();
  }

  #rotate(x: number, y: number, degrees: number) {
    this.context.translate(x, y);
    this.context.rotate((degrees * Math.PI) / 180);
    this.context.translate(-x, -y);
  }

  #checkCallStackString() {
    return new Error().stack;
  }

  #isUsingOutlineGroup() {
    const outlineGroupMethodName = this.makeOutlineGroup
      .toString()
      .split("(")[0];

    return new RegExp(`\\b${outlineGroupMethodName}\\b`).test(
      this.#checkCallStackString() ?? ""
    );
  }
}
