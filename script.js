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
  _a,
  _CanvasConverse_drawMergedOutline,
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
    var _b, _c;
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
    (_b = this.w) !== null && _b !== void 0
      ? _b
      : (this.w = Number(this.canvas.width || this.canvas.style.width));
    (_c = this.h) !== null && _c !== void 0
      ? _c
      : (this.h = Number(this.canvas.height || this.canvas.style.height));
    // TODO: NaivePhysics was breaking outline groups:
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
    if (addObject) {
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
    if (addObject) {
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
    if (addObject) {
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
    if (addObject) {
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
    if (addObject) {
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
        var _b;
        return !((_b =
          obj === null || obj === void 0 ? void 0 : obj.options) === null ||
        _b === void 0
          ? void 0
          : _b.physics);
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
  }) {
    this.usingOutlineGroup = true;
    // TODO:
    this.context.beginPath();
    const nextKey = Object.keys(this.outlineGroups).length + 1; // start at 1
    outlineGroupKey =
      outlineGroupKey !== null && outlineGroupKey !== void 0
        ? outlineGroupKey
        : nextKey;
    this.outlineGroups[outlineGroupKey] = {
      stroke: stroke,
      fill: fill,
      lineWidth: lineWidth,
      filter: filter,
    };
    __classPrivateFieldGet(
      this,
      _CanvasConverse_instances,
      "m",
      _CanvasConverse_drawMergedOutline,
    ).call(this, this.context, drawShapesCallback, {
      color: stroke,
      lineWidth,
    });
    // drawShapesCallback(stroke, outlineGroupKey);
    // TODO:
    // this.context.filter = filter ?? "none";
    this.context.closePath();
    // // TODO: this seems to have no effect?
    // this.context.strokeStyle = stroke;
    // this.context.lineWidth = lineWidth;
    // this.context.stroke();
    // if (fill) {
    //   this.context.fillStyle = fill;
    //   this.context.fill();
    // }
    // alert("stroke " + stroke + " lineWidth " + lineWidth + " fill " + fill);
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
    if (addObject) {
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
(_a = CanvasConverse),
  (_CanvasConverse_instances = new WeakSet()),
  (_CanvasConverse_drawMergedOutline =
    function _CanvasConverse_drawMergedOutline(
      originalContext,
      drawChildrenCallback,
      { color = "black", lineWidth = 2 } = {},
    ) {
      const { width, height } = originalContext.canvas;
      const offScreenCC = new _a();
      offScreenCC.init(document.createElement("canvas"), {
        w: this.w,
        h: this.h,
        physics: false,
      });
      drawChildrenCallback(offScreenCC);
      const pixelData = offScreenCC.context.getImageData(
        0,
        0,
        width,
        height,
      ).data;
      const getAlphaIndex = (x, y) => (y * width + x) * 4 + 3; // width = row size
      originalContext.save();
      originalContext.beginPath();
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const alpha = pixelData[getAlphaIndex(x, y)];
          if (alpha === 0) continue;
          const neighbouringAlphas = [
            pixelData[getAlphaIndex(x, y - 1)],
            pixelData[getAlphaIndex(x, y + 1)],
            pixelData[getAlphaIndex(x - 1, y)],
            pixelData[getAlphaIndex(x + 1, y)],
          ];
          if (neighbouringAlphas.some((a) => a === 0)) {
            originalContext.rect(x, y, 1, 1);
          }
        }
      }
      // TODO: figure out how to fill the merged shape(s)?
      originalContext.strokeStyle = color;
      originalContext.lineWidth = lineWidth;
      originalContext.stroke();
      originalContext.drawImage(offScreenCC.canvas, 0, 0);
      originalContext.restore();
    }),
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
      var _b;
      const outlineGroupMethodName = this.makeOutlineGroup
        .toString()
        .split("(")[0];
      return new RegExp(`\\b${outlineGroupMethodName}\\b`).test(
        (_b = __classPrivateFieldGet(
          this,
          _CanvasConverse_instances,
          "m",
          _CanvasConverse_checkCallStackString,
        ).call(this)) !== null && _b !== void 0
          ? _b
          : "",
      );
    });
