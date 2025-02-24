# CanvasConverse Documentation

(Generated from generateDocumentation.js to clipboard - 2025/02/23th.)

## Methods

```js
constructor(/** still need to call init */)
```

```js
init(canvas, options = {})
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
    cornerRadii,
    fill,
    stroke,
    lineWidth,
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
    rotation = 0 /* degrees */,
    rotationX /* x position of rotation */,
    rotationY /* y position of rotation */,
    physics,
    outlineGroup = "",
    addObject = true,
  })
```

```js
draw({
      rotation = 0 /* degrees */,
      rotationX /* x position of rotation */,
      rotationY /* y position of rotation */,
      fill,
      physics,
      outlineGroup = "",
      addObject = true,
    },
    callbackWithContext)
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
    outlineGroupKey,
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

(Generated from generateDocumentation.js to clipboard - 2025/02/23th.)

## Methods

```js
constructor(canvasConverse)
```

## Properties

`canvasConverse`: object

`objects`: undefined

`canvas`: undefined

`context`: undefined

`bounceCoefficient`: number

`collisionCoefficient`: number

`gravityCoefficient`: number
