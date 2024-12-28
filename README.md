# canvas-converse

[![version](https://img.shields.io/npm/v/canvas-converse.svg?style=flat-square&color=423a73)](https://www.npmjs.com/package/canvas-converse) [![License: MIT](https://img.shields.io/badge/License-MIT-f5d20d.svg?style=flat-square)](https://github.com/hchiam/canvas-converse/blob/main/LICENSE)

To more easily "converse" with the canvas API.

## Live demos

- <https://codepen.io/hchiam/pen/jENmOeZ>
- <https://canvas-converse.surge.sh>

```js
https://cdn.jsdelivr.net/gh/hchiam/canvas-converse@main/script.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/canvas-converse@3.0.0/script.js
```

## Example usage

```js
import { CanvasConverse } from "https://cdn.jsdelivr.net/gh/hchiam/canvas-converse@3.0.0/script.js";

const $ = (x) => document.querySelector(x);

// init
const cc = new CanvasConverse();
window.cc = cc;
cc.init($("canvas"), { w: 500, h: 500 });
cc.canvas.style.outline = "1px solid white";

// fun part
cc.rectangle({ x: 0, y: 0, w: 200, h: 200, fill: "white", physics: true });
cc.rectangle({ x: 100, y: 100, w: 300, h: 200, fill: "red" });
cc.rectangle({ x: 300, y: 50, w: 150, h: 150, fill: "cyan", stroke: "red" });
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
cc.ellipse({
  x: 100,
  y: 100,
  r: 25,
  fill: "black",
  physics: true,
});
cc.draw({ fill: "lime" }, (ctx) => ctx.arc(400, 420, 50, 0, 1.5 * Math.PI));
```

And much more in the [demo.js](https://github.com/hchiam/canvas-converse/blob/main/demo.js)!

## CDN usage

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/canvas-converse@3.0.0/script.js"
  integrity="sha384-wnXU8VvHGq+pi89AjLzRRNDSZR2d8O7s8DRayImZWDkkq5N68mfHmg55Aot7wfQV"
  crossorigin="anonymous"
></script>
```

## documentation (automatically generated)

<https://github.com/hchiam/canvas-converse/blob/main/documentation.md>

## to learn more about the canvas API

<https://github.com/hchiam/learning-canvas>

## reminder to self for development and deployment

```bash
vite # http://localhost:5173/demo.html
# and NOT: http://localhost:5173
```

```bash
# get the thing to put into integrity="...":
bash get-integrity.sh
```

See how i deployed <https://github.com/hchiam/how-draggable>
