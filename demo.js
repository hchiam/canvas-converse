import { CanvasConverse } from "./script.js";

const $ = (x) => document.querySelector(x);

// init
const cc = new CanvasConverse();
window.cc = cc;
cc.init($("canvas"), { w: 500, h: 500 });
cc.canvas.style.outline = "1px solid white";

// fun part
cc.rectangle({ x: 0, y: 0, w: 200, h: 200, fill: "white", physics: true });
cc.rectangle({ x: 100, y: 100, w: 300, h: 200, fill: "red" });
const rotatingRectangle = cc.rectangle({
  x: 300,
  y: 50,
  w: 150,
  h: 150,
  fill: "cyan",
  stroke: "red",
  rotationX: 300 + 150 / 2,
  rotationY: 50 + 150 / 2,
});
cc.triangle({
  x1: 0,
  y1: 300,
  x2: 350,
  y2: 350,
  x3: 100,
  y3: 400,
  fill: "#c2e99b",
  physics: true,
});
const parent = cc.ellipse({
  x: 100,
  y: 100,
  r: 25,
  fill: "green",
  physics: true,
});
cc.ellipse({
  x: 100,
  y: 200,
  r: 25,
  fill: "grey",
  physics: true,
});
cc.ellipse({
  x: 100,
  y: 300,
  r: 25,
  fill: "blue",
  physics: true,
});
const rotatingDraw = cc.draw(
  { fill: "lime", rotationX: 400, rotationY: 420 },
  (ctx) => ctx.arc(400, 420, 50, 0, 1.5 * Math.PI)
);

const childSize = 20;
const child = cc.rectangle({
  x: parent.options.x - childSize / 2,
  y: parent.options.y - childSize / 2,
  w: childSize,
  h: childSize,
  fill: "black",
});
cc.group(parent, [child]);

const rotatingTriangle = cc.triangle({
  x1: 250,
  y1: 250,
  x2: 300,
  y2: 250,
  x3: 300,
  y3: 300,
  rotationX: 275,
  rotationY: 275,
  fill: "orange",
});
const rotatingEllipse = cc.ellipse({
  x: 400,
  y: 300,
  rx: 30,
  ry: 50,
  fill: "lightblue",
});
cc.group(rotatingEllipse, [rotatingTriangle]);
setInterval(() => {
  rotatingRectangle.options.rotation += 10;
  rotatingTriangle.options.rotation -= 10;
  rotatingEllipse.options.rotation -= 1;
  rotatingDraw.options.rotation += 10;
}, 100);
