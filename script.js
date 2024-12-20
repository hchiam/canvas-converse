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
  rectangle({ x, y, w, h, fillStyle }) {
    this.context.fillStyle = fillStyle;
    this.context.fillRect(x, y, w, h);
  }
}
