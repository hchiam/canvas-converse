import { canvasConverse } from "./script.js";

const $ = (x) => document.querySelector(x);

// init
const cc = new canvasConverse($("canvas"), { w: "90dvw", h: "50dvh" });
window.cc = cc;
cc.canvas.style.outline = "1px solid white";

// fun part
cc.rectangle({ x: 0, y: 0, w: 20, h: 20, fillStyle: "white" });
cc.rectangle({ x: 10, y: 10, w: 30, h: 20, fillStyle: "red" });
cc.rectangle({ x: 30, y: 5, w: 15, h: 15, fillStyle: "cyan" });
