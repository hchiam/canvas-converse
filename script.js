import { NaivePhysics } from "./naivePhysics";

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

  rectangle({ x, y, w, h, fill, stroke, physics, addObject = true }) {
    if (fill) {
      this.context.fillStyle = fill ?? "transparent";
      this.context.fillRect(x, y, w, h);
    }
    if (stroke) {
      this.context.strokeStyle = stroke ?? "transparent";
      this.context.strokeRect(x, y, w, h);
    }

    if (addObject) {
      this.#addObject("rectangle", { x, y, w, h, fill, stroke, physics });
    }
  }

  triangle({ x1, y1, x2, y2, x3, y3, fill, physics, addObject = true }) {
    this.context.fillStyle = fill ?? "transparent";
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.lineTo(x3, y3);
    this.context.closePath();
    this.context.fill();

    if (addObject) {
      this.#addObject("triangle", { x1, y1, x2, y2, x3, y3, fill, physics });
    }
  }

  ellipse({
    x,
    y,
    r,
    rx,
    ry,
    fill,
    rotation = 0,
    startAngle = 0,
    endAngle = 2 * Math.PI,
    counterclockwise = false,
    physics,
    addObject = true,
  }) {
    this.context.fillStyle = fill ?? "transparent";
    this.context.beginPath();
    if (typeof r === "undefined" && rx === ry) r = rx;
    rx = rx ?? r;
    ry = ry ?? r;
    this.context.ellipse(
      x,
      y,
      rx,
      ry,
      rotation,
      startAngle,
      endAngle,
      counterclockwise
    );
    this.context.closePath();
    this.context.fill();

    if (addObject) {
      this.#addObject("ellipse", {
        x,
        y,
        r,
        rx,
        ry,
        fill,
        rotation,
        startAngle,
        endAngle,
        counterclockwise,
        physics,
      });
    }
  }

  draw({ fill, physics, addObject = true }, callbackWithContext) {
    this.context.fillStyle = fill ?? "transparent";
    this.context.beginPath();
    callbackWithContext(this.context);
    this.context.closePath();
    this.context.fill();

    if (addObject) {
      this.#addObject("draw", { fill, physics, callbackWithContext });
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.w, this.h);
  }

  #addObject(type, options) {
    this.objects[Object.keys(this.objects).length] = {
      type: type,
      options: options,
    };
  }
}
