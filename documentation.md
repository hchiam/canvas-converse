# CanvasConverse Documentation

(Generated from generateDocumentation.js to clipboard - 2024/12/27th.)

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
    rotationX,
    rotationY,
    fill,
    stroke,
    physics,
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
    rotationX,
    rotationY,
    fill,
    physics,
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
    centerRotation = 0 /* degrees */,
    centerStartAngle = 0 /* degrees */,
    centerEndAngle = 360 /* degrees */,
    rotation = 0 /* degrees */,
    rotationX,
    rotationY,
    counterclockwise = false,
    physics,
    addObject = true,
  })
```

```js
draw({
      rotation = 0 /* degrees */,
      rotationX,
      rotationY,
      fill,
      physics,
      addObject = true,
    },
    callbackWithContext)
```

```js
group(objectToAttachTo, arrayOfObjectsToAttach = [])
```

```js
clear()
```

## Properties

`objects`: object

# NaivePhysics Documentation

(Generated from generateDocumentation.js to clipboard - 2024/12/27th.)

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
