# CanvasConverse Documentation

(Generated from generateDocumentation.js to clipboard - 2025/04/17th.)

## Methods

```js
constructor(/** still need to call init */)
```

```js
init(canvas, options = { h: 0, w: 0 })
```

```js
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
  })
```

```js
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
    filter,
    physics,
    outlineGroup = "",
    addObject = true,
  })
```

```js
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
  })
```

```js
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
  })
```

```js
draw({
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
    callbackWithContext,)
```

```js
group(objectToAttachTo, arrayOfObjectsToAttach = [])
```

```js
makeOutlineGroup({
    drawShapesCallback,
    stroke,
    fill,
    lineWidth,
    filter,
    outlineGroupKey,
    addObject = true,
  })
```

```js
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
    addObject = true,
  })
```

```js
clear()
```

## Properties

`usingOutlineGroup`: boolean

`outlineGroups`: object

`objects`: object

# NaivePhysics Documentation

(Generated from generateDocumentation.js to clipboard - 2025/04/17th.)

## Methods

```js
constructor(canvasConverse)
```

## Properties

`canvasConverse`: object

`objects`: undefined

`outlineGroups`: undefined

`canvas`: undefined

`context`: undefined

`bounceCoefficient`: number

`collisionCoefficient`: number

`gravityCoefficient`: number
