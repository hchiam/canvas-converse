export class canvasConverse {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.options = options;
    this.h = options.h;
    this.w = options.w;
    this.#initializeCanvas();
  }
  #initializeCanvas() {
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
  }
  rectangle({ x, y, w, h, fill, stroke }) {
    if (fill) {
      this.context.fillStyle = fill ?? "transparent";
      this.context.fillRect(x, y, w, h);
    }
    if (stroke) {
      this.context.strokeStyle = stroke ?? "transparent";
      this.context.strokeRect(x, y, w, h);
    }
  }
  triangle(x1, y1, x2, y2, x3, y3, fill) {
    this.context.fillStyle = fill ?? "transparent";
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.lineTo(x3, y3);
    this.context.closePath();
    this.context.fill();
  }
}
