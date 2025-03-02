import { CanvasConverse } from "./script";
import { CanvasConverseObject } from "./types";

export class NaivePhysics {
  canvasConverse: CanvasConverse;
  objects: CanvasConverseObject;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  bounceCoefficient: number;
  collisionCoefficient: number;
  gravityCoefficient: number;

  constructor(canvasConverse) {
    this.canvasConverse = canvasConverse;
    this.objects = canvasConverse.objects;
    this.canvas = canvasConverse.canvas;
    this.context = canvasConverse.context;
    this.bounceCoefficient = 5;
    this.collisionCoefficient = 0.5;
    this.gravityCoefficient = 0.1;

    this.#run();
  }

  #run() {
    try {
      // clear frame:
      this.canvasConverse.clear?.();

      // get next frame:
      this.#drawNextFrame();

      // repeat as soon as possible:
      requestAnimationFrame(this.#run.bind(this));
    } catch (error) {
      console.error("Error while getting next frame:", error);
    }
  }

  #drawNextFrame() {
    if (!this.objects) return;
    const entries = Object.entries(this.objects).filter(
      ([key, object]) => !object.isChild
    );
    for (let i = 0; i < entries.length; i++) {
      const [key, object] = entries[i];
      const outlineGroupName = object.options.outlineGroup;
      if (outlineGroupName) {
        const outlineGroupData =
          this.canvasConverse.outlineGroups[outlineGroupName];

        this.canvasConverse.makeOutlineGroup({
          drawShapesCallback: () => {
            while (
              i < entries.length &&
              entries[i][1].options.outlineGroup === outlineGroupName
            ) {
              this.#handleEntry(entries[i]);
              i++;
            }
            i--; // to counteract the i++ from last round of the fast-forward inner while loop
          },
          ...outlineGroupData,
          outlineGroupKey: outlineGroupName,
        });
      } else {
        this.#handleEntry(entries[i]);
      }
    }
  }
  #handleEntry(entry) {
    const [key, object] = entry;
    if (object.options.physics) {
      this.#handleGravity(key);
      this.#handleCollisions(key);
    }
    this.#redrawObject(object);
    this.#handleChildren(key, 0, 0, 0, 0);
  }

  #redrawObject(object) {
    // don't duplicate objects!
    object.options.addObject = false;

    if (object.options.outlineGroup) {
      this.canvasConverse.usingOutlineGroup = true;
    }

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
          object.options.callbackWithContext
        );
        break;
      default:
        throw new Error("Unrecognized object.");
        break;
    }

    if (object.options.outlineGroup) {
      this.canvasConverse.usingOutlineGroup = false;
    }
  }

  #handleGravity(key) {
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
            (options.bounceRemaining ?? -this.bounceCoefficient) * 0.5
          );
          options.gravityDeltaY = options.bounceRemaining;
        } else {
          options.gravityDeltaY =
            this.gravityCoefficient + (options.gravityDeltaY ?? 1);
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
            (options.bounceRemaining ?? -this.bounceCoefficient) * 0.5
          );
          options.gravityDeltaY = options.bounceRemaining;
        } else {
          options.gravityDeltaY =
            this.gravityCoefficient + (options.gravityDeltaY ?? 1);
        }
        yBefore = options.y1;
        options.y1 += options.gravityDeltaY;
        options.y2 += options.gravityDeltaY;
        options.y3 += options.gravityDeltaY;
        options.y1 = Math.min(
          options.y1,
          this.canvasConverse.h - (bottom - options.y1)
        );
        options.y2 = Math.min(
          options.y2,
          this.canvasConverse.h - (bottom - options.y2)
        );
        options.y3 = Math.min(
          options.y3,
          this.canvasConverse.h - (bottom - options.y3)
        );
        yAfter = options.y1;
        break;
      case "ellipse":
        bottom = options.y + options.ry;
        hitFloor = bottom >= this.canvasConverse.h;

        if (hitFloor) {
          options.bounceRemaining = Math.round(
            (options.bounceRemaining ?? -this.bounceCoefficient) * 0.5
          );
          options.gravityDeltaY = options.bounceRemaining;
        } else {
          options.gravityDeltaY =
            this.gravityCoefficient + (options.gravityDeltaY ?? 1);
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
    this.#handleChildren(key, 0, 0, yBefore, yAfter);
  }

  #handleCollisions(key) {
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
            const [key, object2] = entry;
            const options2 = object2.options;
            const hitObject2 = this.#areCirclesColliding(options1, options2);
            if (hitObject2) {
              const { dx, dy } = this.#getCircleSeparationDeltas(
                options1,
                options2
              );
              options1.dx = options1.dx ?? dx;
              options1.dy = options1.dy ?? dy;
              options1.x += options1.dx * this.collisionCoefficient;
              options1.y += options1.dy * this.collisionCoefficient;
              const circleHeight = options1.r; // TODO: ellipse, not circle
              options1.y = Math.min(
                options1.y,
                this.canvasConverse.h - circleHeight
              );
            }
          });

        xAfter = options1.x;
        yAfter = options1.y;
        this.#handleChildren(key, xBefore, xAfter, yBefore, yAfter);

        break;

      default:
        break;
    }
  }

  #areCirclesColliding(options1, options2) {
    const distance = Math.sqrt(
      (options2.x - options1.x) ** 2 + (options2.y - options1.y) ** 2
    );
    return distance < options1.r + options2.r;
  }

  #getCircleSeparationDeltas(options1, options2) {
    // (a little randomness helps avoid phasing through each other)
    const dx = options1.x - options2.x + this.#randomNegativeToPositiveOne();
    const dy = options1.y - options2.y + this.#randomNegativeToPositiveOne();
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const ux = magnitude !== 0 ? dx / magnitude : 0;
    const uy = magnitude !== 0 ? dy / magnitude : 0;
    return { dx: ux * options1.r, dy: uy * options1.r };
  }

  #randomNegativeToPositiveOne() {
    return Math.random() * 2 - 1;
  }

  #handleChildren(key, xBefore, xAfter, yBefore, yAfter) {
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
        this.#redrawObject(child);
        this.context.rotate(-(options.rotation * Math.PI) / 180);
        this.context.translate(-options.rotationX, -options.rotationY);
      } else {
        this.#redrawObject(child);
      }
    });
    this.canvasConverse.usingOutlineGroup = false;
  }
}
