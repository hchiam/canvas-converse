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
var _NaivePhysics_instances,
  _NaivePhysics_run,
  _NaivePhysics_drawNextFrame,
  _NaivePhysics_handleEntry,
  _NaivePhysics_redrawObject,
  _NaivePhysics_handleGravity,
  _NaivePhysics_handleCollisions,
  _NaivePhysics_areCirclesColliding,
  _NaivePhysics_getCircleSeparationDeltas,
  _NaivePhysics_randomNegativeToPositiveOne,
  _NaivePhysics_handleChildren;
export class NaivePhysics {
  constructor(canvasConverse) {
    _NaivePhysics_instances.add(this);
    this.canvasConverse = canvasConverse;
    this.objects = canvasConverse.objects;
    this.outlineGroups = canvasConverse.outlineGroups;
    this.canvas = canvasConverse.canvas;
    this.context = canvasConverse.context;
    this.bounceCoefficient = 5;
    this.collisionCoefficient = 0.5;
    this.gravityCoefficient = 0.1;
    __classPrivateFieldGet(
      this,
      _NaivePhysics_instances,
      "m",
      _NaivePhysics_run,
    ).call(this);
  }
}
(_NaivePhysics_instances = new WeakSet()),
  (_NaivePhysics_run = function _NaivePhysics_run() {
    var _a, _b;
    try {
      // clear frame:
      (_b = (_a = this.canvasConverse).clear) === null || _b === void 0
        ? void 0
        : _b.call(_a);
      // get next frame:
      __classPrivateFieldGet(
        this,
        _NaivePhysics_instances,
        "m",
        _NaivePhysics_drawNextFrame,
      ).call(this);
      // repeat as soon as possible:
      requestAnimationFrame(() =>
        __classPrivateFieldGet(
          this,
          _NaivePhysics_instances,
          "m",
          _NaivePhysics_run,
        ).call(this),
      );
    } catch (error) {
      console.error("Error while getting next frame:", error);
    }
  }),
  (_NaivePhysics_drawNextFrame = function _NaivePhysics_drawNextFrame() {
    if (this.objects) {
      // delete objects created by outline groups (will recreate later):
      Object.entries(this.objects).forEach(([key, object]) => {
        if (object.options.outlineGroup) {
          delete this.objects[key];
        }
      });
      Object.entries(this.objects)
        .filter(([key, object]) => !object.isChild)
        .forEach((entry) => {
          __classPrivateFieldGet(
            this,
            _NaivePhysics_instances,
            "m",
            _NaivePhysics_handleEntry,
          ).call(this, entry);
        });
    }
    if (this.outlineGroups) {
      Object.entries(this.outlineGroups).forEach(([key, value]) => {
        const outlineGroupName = Number(key);
        const outlineGroup = value;
        this.canvasConverse.makeOutlineGroup({
          drawShapesCallback: outlineGroup.drawShapesCallback,
          stroke: outlineGroup.stroke,
          fill: outlineGroup.fill,
          lineWidth: outlineGroup.lineWidth,
          filter: outlineGroup.filter,
          outlineGroupKey: outlineGroupName,
          addObject: false,
        });
      });
    }
  }),
  (_NaivePhysics_handleEntry = function _NaivePhysics_handleEntry(entry) {
    const [key, object] = entry;
    if (object.options.physics) {
      __classPrivateFieldGet(
        this,
        _NaivePhysics_instances,
        "m",
        _NaivePhysics_handleGravity,
      ).call(this, key);
      __classPrivateFieldGet(
        this,
        _NaivePhysics_instances,
        "m",
        _NaivePhysics_handleCollisions,
      ).call(this, key);
    }
    __classPrivateFieldGet(
      this,
      _NaivePhysics_instances,
      "m",
      _NaivePhysics_redrawObject,
    ).call(this, object);
    __classPrivateFieldGet(
      this,
      _NaivePhysics_instances,
      "m",
      _NaivePhysics_handleChildren,
    ).call(this, key, 0, 0, 0, 0);
  }),
  (_NaivePhysics_redrawObject = function _NaivePhysics_redrawObject(object) {
    // don't duplicate objects!
    object.options.addObject = false;
    switch (object.type) {
      case "rectangle":
        this.canvasConverse.rectangle(object.options);
        break;
      case "triangle":
        this.canvasConverse.triangle(object.options);
        break;
      case "ellipse":
        this.canvasConverse.ellipse(object.options);
        break;
      case "line":
        this.canvasConverse.line(object.options);
        break;
      case "draw":
        this.canvasConverse.draw(
          object.options,
          object.options.callbackWithContext,
        );
        break;
      case "text":
        this.canvasConverse.text(object.options);
        break;
      default:
        throw new Error("Unrecognized object. See naivePhysics.ts");
        break;
    }
  }),
  (_NaivePhysics_handleGravity = function _NaivePhysics_handleGravity(key) {
    var _a, _b, _c, _d, _e, _f;
    const object = this.objects[key];
    const options = object.options;
    let bottom = 0;
    let hitFloor = false;
    let yBefore = 0;
    let yAfter = 0;
    switch (object.type) {
      case "rectangle":
        bottom = options.y + options.h;
        hitFloor = bottom >= this.canvasConverse.h;
        if (hitFloor) {
          options.bounceRemaining = Math.round(
            ((_a = options.bounceRemaining) !== null && _a !== void 0
              ? _a
              : -this.bounceCoefficient) * 0.5,
          );
          options.gravityDeltaY = options.bounceRemaining;
        } else {
          options.gravityDeltaY =
            this.gravityCoefficient +
            ((_b = options.gravityDeltaY) !== null && _b !== void 0 ? _b : 1);
        }
        yBefore = options.y;
        options.y += options.gravityDeltaY;
        options.y = Math.min(options.y, this.canvasConverse.h - options.h);
        yAfter = options.y;
        break;
      case "triangle":
        bottom = Math.max(options.y1, options.y2, options.y3);
        hitFloor = bottom >= this.canvasConverse.h;
        if (hitFloor) {
          options.bounceRemaining = Math.round(
            ((_c = options.bounceRemaining) !== null && _c !== void 0
              ? _c
              : -this.bounceCoefficient) * 0.5,
          );
          options.gravityDeltaY = options.bounceRemaining;
        } else {
          options.gravityDeltaY =
            this.gravityCoefficient +
            ((_d = options.gravityDeltaY) !== null && _d !== void 0 ? _d : 1);
        }
        yBefore = options.y1;
        options.y1 += options.gravityDeltaY;
        options.y2 += options.gravityDeltaY;
        options.y3 += options.gravityDeltaY;
        options.y1 = Math.min(
          options.y1,
          this.canvasConverse.h - (bottom - options.y1),
        );
        options.y2 = Math.min(
          options.y2,
          this.canvasConverse.h - (bottom - options.y2),
        );
        options.y3 = Math.min(
          options.y3,
          this.canvasConverse.h - (bottom - options.y3),
        );
        yAfter = options.y1;
        break;
      case "ellipse":
        bottom = options.y + options.ry;
        hitFloor = bottom >= this.canvasConverse.h;
        if (hitFloor) {
          options.bounceRemaining = Math.round(
            ((_e = options.bounceRemaining) !== null && _e !== void 0
              ? _e
              : -this.bounceCoefficient) * 0.5,
          );
          options.gravityDeltaY = options.bounceRemaining;
        } else {
          options.gravityDeltaY =
            this.gravityCoefficient +
            ((_f = options.gravityDeltaY) !== null && _f !== void 0 ? _f : 1);
        }
        yBefore = options.y;
        options.y += options.gravityDeltaY;
        const circleHeight = options.r; // TODO: ellipse, not circle
        options.y = Math.min(options.y, this.canvasConverse.h - circleHeight);
        yAfter = options.y;
        break;
      case "line":
        break;
      case "draw":
        break;
      default:
        throw new Error("Unrecognized object.");
        break;
    }
    __classPrivateFieldGet(
      this,
      _NaivePhysics_instances,
      "m",
      _NaivePhysics_handleChildren,
    ).call(this, key, 0, 0, yBefore, yAfter);
  }),
  (_NaivePhysics_handleCollisions = function _NaivePhysics_handleCollisions(
    key,
  ) {
    const object = this.objects[key];
    const options1 = object.options;
    let xBefore = 0;
    let xAfter = 0;
    let yBefore = 0;
    let yAfter = 0;
    switch (object.type) {
      case "ellipse":
        xBefore = options1.x;
        yBefore = options1.y;
        Object.entries(this.objects)
          .filter((entry) => {
            const [key2, object2] = entry;
            return (
              key !== key2 &&
              object2.options.physics &&
              object2.type === "ellipse"
            );
          })
          .forEach((entry) => {
            var _a, _b;
            const [key, object2] = entry;
            const options2 = object2.options;
            const hitObject2 = __classPrivateFieldGet(
              this,
              _NaivePhysics_instances,
              "m",
              _NaivePhysics_areCirclesColliding,
            ).call(this, options1, options2);
            if (hitObject2) {
              const { dx, dy } = __classPrivateFieldGet(
                this,
                _NaivePhysics_instances,
                "m",
                _NaivePhysics_getCircleSeparationDeltas,
              ).call(this, options1, options2);
              options1.dx =
                (_a = options1.dx) !== null && _a !== void 0 ? _a : dx;
              options1.dy =
                (_b = options1.dy) !== null && _b !== void 0 ? _b : dy;
              options1.x += options1.dx * this.collisionCoefficient;
              options1.y += options1.dy * this.collisionCoefficient;
              const circleHeight = options1.r; // TODO: ellipse, not circle
              options1.y = Math.min(
                options1.y,
                this.canvasConverse.h - circleHeight,
              );
            }
          });
        xAfter = options1.x;
        yAfter = options1.y;
        __classPrivateFieldGet(
          this,
          _NaivePhysics_instances,
          "m",
          _NaivePhysics_handleChildren,
        ).call(this, key, xBefore, xAfter, yBefore, yAfter);
        break;
      default:
        break;
    }
  }),
  (_NaivePhysics_areCirclesColliding =
    function _NaivePhysics_areCirclesColliding(options1, options2) {
      const distance = Math.sqrt(
        (options2.x - options1.x) ** 2 + (options2.y - options1.y) ** 2,
      );
      return distance < options1.r + options2.r;
    }),
  (_NaivePhysics_getCircleSeparationDeltas =
    function _NaivePhysics_getCircleSeparationDeltas(options1, options2) {
      // (a little randomness helps avoid phasing through each other)
      const dx =
        options1.x -
        options2.x +
        __classPrivateFieldGet(
          this,
          _NaivePhysics_instances,
          "m",
          _NaivePhysics_randomNegativeToPositiveOne,
        ).call(this);
      const dy =
        options1.y -
        options2.y +
        __classPrivateFieldGet(
          this,
          _NaivePhysics_instances,
          "m",
          _NaivePhysics_randomNegativeToPositiveOne,
        ).call(this);
      const magnitude = Math.sqrt(dx * dx + dy * dy);
      const ux = magnitude !== 0 ? dx / magnitude : 0;
      const uy = magnitude !== 0 ? dy / magnitude : 0;
      return { dx: ux * options1.r, dy: uy * options1.r };
    }),
  (_NaivePhysics_randomNegativeToPositiveOne =
    function _NaivePhysics_randomNegativeToPositiveOne() {
      return Math.random() * 2 - 1;
    }),
  (_NaivePhysics_handleChildren = function _NaivePhysics_handleChildren(
    key,
    xBefore,
    xAfter,
    yBefore,
    yAfter,
  ) {
    const xDelta = xAfter - xBefore;
    const yDelta = yAfter - yBefore;
    const options = this.objects[key].options;
    const children = this.objects[key].children;
    this.canvasConverse.usingOutlineGroup = true;
    children.forEach((child) => {
      if (xDelta) child.options.x += xDelta;
      if (yDelta) child.options.y += yDelta;
      const canRotate =
        options.rotation &&
        !isNaN(options.rotationX) &&
        !isNaN(options.rotationY);
      if (canRotate) {
        // rotate child with its (x,y) coordinates being relative to its parent's (x,y):
        this.context.translate(options.rotationX, options.rotationY);
        this.context.rotate((options.rotation * Math.PI) / 180);
        __classPrivateFieldGet(
          this,
          _NaivePhysics_instances,
          "m",
          _NaivePhysics_redrawObject,
        ).call(this, child);
        this.context.rotate(-(options.rotation * Math.PI) / 180);
        this.context.translate(-options.rotationX, -options.rotationY);
      } else {
        __classPrivateFieldGet(
          this,
          _NaivePhysics_instances,
          "m",
          _NaivePhysics_redrawObject,
        ).call(this, child);
      }
    });
    this.canvasConverse.usingOutlineGroup = false;
  });
