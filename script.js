var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _CanvasConverse_instances,
  _CanvasConverse_addObject,
  _CanvasConverse_isolateStyles,
  _CanvasConverse_rotate,
  _CanvasConverse_checkCallStackString,
  _CanvasConverse_isUsingOutlineGroup;
import { NaivePhysics } from "./naivePhysics.js";
export class CanvasConverse {
  constructor(/** still need to call init */) {
    _CanvasConverse_instances.add(this);
    this.usingOutlineGroup = false;
    this.outlineGroups = {};
    this.objects = {};
  }
  init(canvas, options = { h: 0, w: 0 }) {
    var _a, _b;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.options = options;
    this.h = Number(options.h);
    this.w = Number(options.w);
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
    (_a = this.w) !== null && _a !== void 0
      ? _a
      : (this.w = Number(this.canvas.width || this.canvas.style.width));
    (_b = this.h) !== null && _b !== void 0
      ? _b
      : (this.h = Number(this.canvas.height || this.canvas.style.height));
    this.physicsEngine = new NaivePhysics(this);
  }
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
  }) {
    const usingOutlineGroup = __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isUsingOutlineGroup,
    ).call(this);
    if (usingOutlineGroup) {
      outlineGroup = String(Object.keys(this.outlineGroups).length);
    }
    __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isolateStyles,
    ).call(this, () => {
      if (rotation !== 0) {
        __classPrivateFieldGet(
          this,
          _CanvasConverse_instances,
          "m",
          _CanvasConverse_rotate,
        ).call(
          this,
          rotationX !== null && rotationX !== void 0 ? rotationX : x,
          rotationY !== null && rotationY !== void 0 ? rotationY : y,
          rotation,
        );
      }
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      if (cornerRadii) {
        this.context.roundRect(x, y, w, h, cornerRadii);
      } else {
        this.context.rect(x, y, w, h);
      }
      this.context.filter =
        filter !== null && filter !== void 0 ? filter : "none";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      if (fill) {
        this.context.fillStyle =
          fill !== null && fill !== void 0 ? fill : "transparent";
        if (cornerRadii) {
          this.context.fill();
        } else {
          this.context.fillRect(x, y, w, h);
        }
      }
      if (stroke && !usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.strokeStyle =
          stroke !== null && stroke !== void 0 ? stroke : "transparent";
        if (lineWidth) {
          this.context.lineWidth =
            lineWidth !== null && lineWidth !== void 0 ? lineWidth : 0;
          if (cornerRadii) {
            this.context.stroke();
          } else {
            this.context.strokeRect(x, y, w, h);
          }
        }
      }
    });
    if (addObject && !usingOutlineGroup) {
      return __classPrivateFieldGet(
        this,
        _CanvasConverse_instances,
        "m",
        _CanvasConverse_addObject,
      ).call(this, "rectangle", {
        x,
        y,
        w,
        h,
        rotation,
        rotationX,
        rotationY,
        cornerRadii,
        fill,
        stroke,
        lineWidth,
        filter,
        physics,
        outlineGroup,
      });
    }
  }
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
  }) {
    const usingOutlineGroup = __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isUsingOutlineGroup,
    ).call(this);
    if (usingOutlineGroup) {
      outlineGroup = String(Object.keys(this.outlineGroups).length);
    }
    __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isolateStyles,
    ).call(this, () => {
      if (rotation !== 0) {
        __classPrivateFieldGet(
          this,
          _CanvasConverse_instances,
          "m",
          _CanvasConverse_rotate,
        ).call(
          this,
          rotationX !== null && rotationX !== void 0 ? rotationX : x1,
          rotationY !== null && rotationY !== void 0 ? rotationY : y1,
          rotation,
        );
      }
      this.context.fillStyle =
        fill !== null && fill !== void 0 ? fill : "transparent";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.lineTo(x3, y3);
      this.context.filter =
        filter !== null && filter !== void 0 ? filter : "none";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      this.context.fill();
    });
    if (addObject && !usingOutlineGroup) {
      return __classPrivateFieldGet(
        this,
        _CanvasConverse_instances,
        "m",
        _CanvasConverse_addObject,
      ).call(this, "triangle", {
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        rotation,
        rotationX,
        rotationY,
        fill,
        filter,
        physics,
        outlineGroup,
      });
    }
  }
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
  }) {
    const usingOutlineGroup = __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isUsingOutlineGroup,
    ).call(this);
    if (usingOutlineGroup) {
      outlineGroup = String(Object.keys(this.outlineGroups).length);
    }
    __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isolateStyles,
    ).call(this, () => {
      if (rotation !== 0) {
        __classPrivateFieldGet(
          this,
          _CanvasConverse_instances,
          "m",
          _CanvasConverse_rotate,
        ).call(
          this,
          rotationX !== null && rotationX !== void 0 ? rotationX : x,
          rotationY !== null && rotationY !== void 0 ? rotationY : y,
          rotation,
        );
      }
      this.context.fillStyle =
        fill !== null && fill !== void 0 ? fill : "transparent";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      rx = rx !== null && rx !== void 0 ? rx : r;
      ry = ry !== null && ry !== void 0 ? ry : r;
      if (typeof r === "undefined" && rx === ry) r = rx;
      this.context.ellipse(
        x,
        y,
        rx,
        ry,
        (centerRotation * Math.PI) / 180,
        (centerStartAngle * Math.PI) / 180,
        (centerEndAngle * Math.PI) / 180,
        rotation,
        // @ts-ignore (ellipse is supposed to have 11 arguments)
        rotationX,
        rotationY,
        counterclockwise,
      );
      this.context.filter =
        filter !== null && filter !== void 0 ? filter : "none";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      this.context.fill();
      if (stroke && !usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.strokeStyle =
          stroke !== null && stroke !== void 0 ? stroke : "transparent";
        if (lineWidth) {
          this.context.lineWidth =
            lineWidth !== null && lineWidth !== void 0 ? lineWidth : 0;
          this.context.stroke();
        }
      }
    });
    if (addObject && !usingOutlineGroup) {
      return __classPrivateFieldGet(
        this,
        _CanvasConverse_instances,
        "m",
        _CanvasConverse_addObject,
      ).call(this, "ellipse", {
        x,
        y,
        r,
        rx,
        ry,
        fill,
        stroke,
        lineWidth,
        filter,
        centerRotation,
        centerStartAngle,
        centerEndAngle,
        rotation,
        rotationX,
        rotationY,
        counterclockwise,
        physics,
        outlineGroup,
      });
    }
  }
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
  }) {
    const usingOutlineGroup = __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isUsingOutlineGroup,
    ).call(this);
    if (usingOutlineGroup) {
      outlineGroup = String(Object.keys(this.outlineGroups).length);
    }
    __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isolateStyles,
    ).call(this, () => {
      if (rotation !== 0) {
        __classPrivateFieldGet(
          this,
          _CanvasConverse_instances,
          "m",
          _CanvasConverse_rotate,
        ).call(
          this,
          rotationX !== null && rotationX !== void 0
            ? rotationX
            : (x1 + x2) / 2,
          rotationY !== null && rotationY !== void 0
            ? rotationY
            : (y1 + y2) / 2,
          rotation,
        );
      }
      if (stroke) {
        this.context.strokeStyle =
          stroke !== null && stroke !== void 0 ? stroke : "transparent";
      }
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.lineWidth =
        lineWidth !== null && lineWidth !== void 0 ? lineWidth : 1;
      if (lineCap) this.context.lineCap = lineCap;
      this.context.filter =
        filter !== null && filter !== void 0 ? filter : "none";
      this.context.stroke();
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
    });
    if (addObject && !usingOutlineGroup) {
      return __classPrivateFieldGet(
        this,
        _CanvasConverse_instances,
        "m",
        _CanvasConverse_addObject,
      ).call(this, "line", {
        x1,
        y1,
        x2,
        y2,
        lineWidth,
        stroke,
        filter,
        rotation,
        rotationX,
        rotationY,
        lineCap,
        physics,
        outlineGroup,
      });
    }
  }
  draw(
    {
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
    callbackWithContext,
  ) {
    const usingOutlineGroup = __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isUsingOutlineGroup,
    ).call(this);
    if (usingOutlineGroup) {
      outlineGroup = String(Object.keys(this.outlineGroups).length);
    }
    __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isolateStyles,
    ).call(this, () => {
      if (rotation !== 0) {
        __classPrivateFieldGet(
          this,
          _CanvasConverse_instances,
          "m",
          _CanvasConverse_rotate,
        ).call(
          this,
          rotationX !== null && rotationX !== void 0 ? rotationX : x,
          rotationY !== null && rotationY !== void 0 ? rotationY : y,
          rotation,
        );
      }
      this.context.fillStyle =
        fill !== null && fill !== void 0 ? fill : "transparent";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.beginPath();
      }
      callbackWithContext(this.context);
      this.context.filter =
        filter !== null && filter !== void 0 ? filter : "none";
      if (!usingOutlineGroup && !this.usingOutlineGroup) {
        this.context.closePath();
      }
      this.context.fill();
    });
    if (addObject && !usingOutlineGroup) {
      return __classPrivateFieldGet(
        this,
        _CanvasConverse_instances,
        "m",
        _CanvasConverse_addObject,
      ).call(this, "draw", {
        x,
        y,
        rotation,
        rotationX,
        rotationY,
        fill,
        filter,
        physics,
        outlineGroup,
        callbackWithContext,
      });
    }
  }
  group(objectToAttachTo, arrayOfObjectsToAttach = []) {
    objectToAttachTo.children = arrayOfObjectsToAttach.filter(
      (obj) => {
        var _a;
        return !((_a =
          obj === null || obj === void 0 ? void 0 : obj.options) === null ||
        _a === void 0
          ? void 0
          : _a.physics);
      },
      // to keep things simple for now,
      // don't attach objects that have their own physics.
    );
    objectToAttachTo.children.forEach((child) => {
      if (child) child.isChild = true;
    });
  }
  makeOutlineGroup({
    drawShapesCallback,
    stroke,
    fill,
    lineWidth,
    filter,
    outlineGroupKey,
    addObject = true,
  }) {
    this.usingOutlineGroup = true;
    this.context.beginPath();
    if (addObject) {
      const nextKey = Object.keys(this.outlineGroups).length + 1; // start at 1
      outlineGroupKey =
        outlineGroupKey !== null && outlineGroupKey !== void 0
          ? outlineGroupKey
          : nextKey;
      this.outlineGroups[outlineGroupKey] = {
        drawShapesCallback: drawShapesCallback,
        stroke: stroke,
        fill: fill,
        lineWidth: lineWidth,
        filter: filter,
      };
    }
    // draw stroke version:
    const strokeCC = new CanvasConverse();
    const strokeCanvas = document.createElement("canvas");
    strokeCC.init(strokeCanvas, { w: this.w, h: this.h, physics: false });
    strokeCC.usingOutlineGroup = true;
    const strokeContext = strokeCC.context;
    strokeContext.strokeStyle = stroke;
    strokeContext.lineWidth = lineWidth;
    drawShapesCallback(strokeCC);
    strokeContext.stroke();
    // draw fill version: (don't need fillStyle yet)
    const fillCC = new CanvasConverse();
    const fillCanvas = document.createElement("canvas");
    fillCC.init(fillCanvas, { w: this.w, h: this.h, physics: false });
    fillCC.usingOutlineGroup = true;
    const fillContext = fillCC.context;
    // fillContext.fillStyle = 'black';
    drawShapesCallback(fillCC);
    fillContext.fill();
    // mask out the insides of the stroke version with the fill version:
    strokeContext.globalCompositeOperation = "destination-out";
    strokeContext.drawImage(fillCanvas, 0, 0);
    strokeContext.globalCompositeOperation = "source-over";
    // draw the stroke version that has its insides masked out:
    this.context.drawImage(strokeCanvas, 0, 0);
    // draw the fill version in with fillStyle now:
    this.context.fillStyle = fill;
    drawShapesCallback(this);
    this.context.fill();
    this.context.filter =
      filter !== null && filter !== void 0 ? filter : "none";
    this.context.closePath();
    this.usingOutlineGroup = false;
  }
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
  }) {
    const usingOutlineGroup = __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isUsingOutlineGroup,
    ).call(this);
    __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_isolateStyles,
    ).call(this, () => {
      this.context.textBaseline = baseline;
      if (rotation !== 0) {
        __classPrivateFieldGet(
          this,
          _CanvasConverse_instances,
          "m",
          _CanvasConverse_rotate,
        ).call(
          this,
          rotationX !== null && rotationX !== void 0 ? rotationX : x,
          rotationY !== null && rotationY !== void 0 ? rotationY : y,
          rotation,
        );
      }
      if (font) this.context.font = font;
      if (type === "stroke") {
        if (style) this.context.strokeStyle = style;
        this.context.strokeText(text, x, y);
      } else {
        if (style) this.context.fillStyle = style;
        this.context.fillText(text, x, y);
      }
    });
    if (addObject && !usingOutlineGroup) {
      return __classPrivateFieldGet(
        this,
        _CanvasConverse_instances,
        "m",
        _CanvasConverse_addObject,
      ).call(this, "text", {
        text,
        x,
        y,
        font,
        type,
        style,
        baseline,
        rotation,
        rotationX,
        rotationY,
      });
    }
  }
  clear() {
    this.context.clearRect(0, 0, this.w, this.h);
  }
}
(_CanvasConverse_instances = new WeakSet()),
  (_CanvasConverse_addObject = function _CanvasConverse_addObject(
    type,
    options,
  ) {
    const newKey = Object.keys(this.objects).length;
    this.objects[newKey] = {
      key: newKey,
      type: type,
      options: options,
      children: [],
    };
    return this.objects[newKey];
  }),
  (_CanvasConverse_isolateStyles = function _CanvasConverse_isolateStyles(
    drawingCallback,
  ) {
    // prevent style leak e.g. fill
    this.context.save();
    drawingCallback();
    this.context.restore();
  }),
  (_CanvasConverse_rotate = function _CanvasConverse_rotate(x, y, degrees) {
    this.context.translate(x, y);
    this.context.rotate((degrees * Math.PI) / 180);
    this.context.translate(-x, -y);
  }),
  (_CanvasConverse_checkCallStackString =
    function _CanvasConverse_checkCallStackString() {
      return new Error().stack;
    }),
  (_CanvasConverse_isUsingOutlineGroup =
    function _CanvasConverse_isUsingOutlineGroup() {
      var _a;
      const outlineGroupMethodName = this.makeOutlineGroup
        .toString()
        .split("(")[0];
      return new RegExp(`\\b${outlineGroupMethodName}\\b`).test(
        (_a = __classPrivateFieldGet(
          this,
          _CanvasConverse_instances,
          "m",
          _CanvasConverse_checkCallStackString,
        ).call(this)) !== null && _a !== void 0
          ? _a
          : "",
      );
    });
