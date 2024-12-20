# canvas-converse

[![version](https://img.shields.io/npm/v/canvas-converse.svg?style=flat-square&color=423a73)](https://www.npmjs.com/package/canvas-converse) [![License: MIT](https://img.shields.io/badge/License-MIT-f5d20d.svg?style=flat-square)](https://github.com/hchiam/canvas-converse/blob/main/LICENSE)

To more easily "converse" with the canvas API.

Live demo: <https://codepen.io/hchiam/pen/jENmOeZ>

```js
https://cdn.jsdelivr.net/gh/hchiam/canvas-converse@main/script.js
```

```js
https://cdn.jsdelivr.net/gh/hchiam/canvas-converse@1.1.0/script.js
```

Example usage:

```js
import { canvasConverse } from "./script.js";

const $ = (x) => document.querySelector(x);

// init
const cc = new canvasConverse();
window.cc = cc;
cc.init($("canvas"), { w: 500, h: 500 });
cc.canvas.style.outline = "1px solid white";

// fun part
cc.rectangle({ x: 0, y: 0, w: 200, h: 200, fill: "white" });
cc.rectangle({ x: 100, y: 100, w: 300, h: 200, fill: "red" });
cc.rectangle({ x: 300, y: 50, w: 150, h: 150, fill: "cyan", stroke: "red" });
cc.triangle(0, 300, 350, 350, 100, 500, "#c2e99b");
cc.ellipse({
  x: 100,
  y: 100,
  r: 25,
  fill: "black",
});
cc.draw("lime", (ctx) => ctx.arc(400, 420, 50, 0, 1.5 * Math.PI));
```

CDN usage:

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/canvas-converse@1.1.0/script.js"
  integrity="sha384-2RDbWS4U7vvDgZHOh3UrL7owH8O+tNDqxfYmYPQs3kiiUHPT9BBX3Z/TUdqUFyI3"
  crossorigin="anonymous"
></script>
```

## documentation (automatically generated)

<https://github.com/hchiam/canvas-converse/blob/main/documentation.md>

## to learn more about the canvas API

<https://github.com/hchiam/learning-canvas>

## reminders to self for deployment

```bash
# get the thing to put into integrity="...":
bash get-integrity.sh
```

See how i deployed <https://github.com/hchiam/how-draggable>
