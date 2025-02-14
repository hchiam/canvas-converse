import { NaivePhysics } from "./naivePhysics.js";

export class CanvasConverse {
  constructor(/** still need to call init */) {
    this.objects = {};
  }

  init(canvas, options = {}) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.options = options;
    this.h = options.h;
    this.w = options.w;
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
    this.w ??= this.canvas.width || this.canvas.style.width;
    this.h ??= this.canvas.height || this.canvas.style.height;
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
    fill,
    stroke,
    physics,
    outlineGroup,
    addObject = true,
  }) {
    const usingOutlineGroup = this.#isUsingOutlineGroup();
    if (usingOutlineGroup) {
      outlineGroup = Object.keys(this.outlineGroups).length;
    }
    this.#isolateStyles(() => {
      if (typeof rotation !== 0) {
        this.#rotate(rotationX ?? x, rotationY ?? y, rotation);
      }
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      this.context.rect(x, y, w, h);
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      if (fill) {
        this.context.fillStyle = fill ?? "transparent";
        this.context.fillRect(x, y, w, h);
        // NOT this: this.context.fill();
      }
      if (stroke && !usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.strokeStyle = stroke ?? "transparent";
        this.context.strokeRect(x, y, w, h);
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
        fill,
        // stroke,
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
    physics,
    outlineGroup,
    addObject = true,
  }) {
    const usingOutlineGroup = this.#isUsingOutlineGroup();
    if (usingOutlineGroup) {
      outlineGroup = Object.keys(this.outlineGroups).length;
    }

    this.#isolateStyles(() => {
      if (typeof rotation !== 0) {
        this.#rotate(rotationX ?? x1, rotationY ?? y1, rotation);
      }
      this.context.fillStyle = fill ?? "transparent";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.lineTo(x3, y3);
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      this.context.fill();
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
    centerRotation = 0 /* degrees */,
    centerStartAngle = 0 /* degrees */,
    centerEndAngle = 360 /* degrees */,
    rotation = 0 /* degrees */,
    rotationX /* x position of rotation */,
    rotationY /* y position of rotation */,
    counterclockwise = false,
    physics,
    outlineGroup,
    addObject = true,
  }) {
    const usingOutlineGroup = this.#isUsingOutlineGroup();
    if (usingOutlineGroup) {
      outlineGroup = Object.keys(this.outlineGroups).length;
    }

    this.#isolateStyles(() => {
      if (typeof rotation !== 0) {
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
        rotationX,
        rotationY,
        counterclockwise
      );
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      this.context.fill();
    });

    if (addObject) {
      return this.#addObject("ellipse", {
        x,
        y,
        r,
        rx,
        ry,
        fill,
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
    rotation = 0 /* degrees */,
    rotationX /* x position of rotation */,
    rotationY /* y position of rotation */,
    physics,
    outlineGroup,
    addObject = true,
  }) {
    const usingOutlineGroup = this.#isUsingOutlineGroup();
    if (usingOutlineGroup) {
      outlineGroup = Object.keys(this.outlineGroups).length;
    }

    this.#isolateStyles(() => {
      if (typeof rotation !== 0) {
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
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      this.context.lineWidth = lineWidth ?? 1;
      this.context.stroke();
    });

    if (addObject) {
      return this.#addObject("line", {
        x1,
        y1,
        x2,
        y2,
        lineWidth,
        stroke,
        rotation,
        rotationX,
        rotationY,
        physics,
        outlineGroup,
      });
    }
  }

  draw(
    {
      rotation = 0 /* degrees */,
      rotationX /* x position of rotation */,
      rotationY /* y position of rotation */,
      fill,
      physics,
      outlineGroup,
      addObject = true,
    },
    callbackWithContext
  ) {
    const usingOutlineGroup = this.#isUsingOutlineGroup();
    if (usingOutlineGroup) {
      outlineGroup = Object.keys(this.outlineGroups).length;
    }

    this.#isolateStyles(() => {
      if (typeof rotation !== 0) {
        this.#rotate(rotationX ?? x, rotationY ?? y, rotation);
      }
      this.context.fillStyle = fill ?? "transparent";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      callbackWithContext(this.context);
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      this.context.fill();
    });

    if (addObject) {
      return this.#addObject("draw", {
        rotation,
        rotationX,
        rotationY,
        fill,
        physics,
        outlineGroup,
        callbackWithContext,
      });
    }
  }

  group(objectToAttachTo, arrayOfObjectsToAttach = []) {
    objectToAttachTo.children = arrayOfObjectsToAttach.filter(
      (obj) => !obj?.options.physics
      // to keep things simple for now,
      // don't attach objects that have their own physics.
    );
    objectToAttachTo.children.forEach((child) => {
      if (child) child.isChild = true;
    });
  }

  usingOutlineGroup = false;
  outlineGroups = {};
  makeOutlineGroup({
    drawShapesCallback,
    stroke,
    fill,
    lineWidth,
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
    };

    drawShapesCallback(stroke, outlineGroupKey);

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

  clear() {
    this.context.clearRect(0, 0, this.w, this.h);
  }

  #addObject(type, options) {
    const newKey = Object.keys(this.objects).length;
    this.objects[newKey] = {
      key: newKey,
      type: type,
      options: options,
      children: [],
    };
    return this.objects[newKey];
  }

  #isolateStyles(drawingCallback) {
    // prevent style leak e.g. fill
    this.context.save();
    drawingCallback();
    this.context.restore();
  }

  #rotate(x, y, degrees) {
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
      this.#checkCallStackString()
    );
  }
}
