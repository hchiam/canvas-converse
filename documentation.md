# CanvasConverse Documentation

(Generated from generateDocumentation.js to clipboard - 2024/12/20th.)

## Methods

```js
constructor(/** still need to call init */)
```

```js
init(canvas, options = {})
```

```js
rectangle({ x, y, w, h, fill, stroke, physics })
```

```js
triangle(x1, y1, x2, y2, x3, y3, fill, physics)
```

```js
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
  })
```

```js
draw({ fill, physics }, callbackWithContext)
```

## Properties

`objects`: object

# NaivePhysics Documentation

(Generated from generateDocumentation.js to clipboard - 2024/12/20th.)

## Methods

```js
constructor(canvasConverse)
```

## Properties

`canvasConverse`: object
