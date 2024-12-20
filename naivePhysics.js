export class NaivePhysics {
  constructor(canvasConverse) {
    this.canvasConverse = canvasConverse;
    this.objects = canvasConverse.objects;
    this.canvas = canvasConverse.canvas;
    this.context = canvasConverse.context;

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
    Object.entries(this.objects).forEach((entry) => {
      const [key, object] = entry;
      if (object.options.physics) {
        this.#handleGravity(key);
      }

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
    });
  }

  #handleGravity(key) {
    const object = this.objects[key];
    const options = object.options;

    let bottom = 0;
    let hitFloor = false;

    switch (object.type) {
      case "rectangle":
        bottom = options.y + options.h;
        hitFloor = bottom >= this.canvasConverse.h;

        if (hitFloor) {
          options.bounceLeft = Math.round((options.bounceLeft ?? -5) * 0.5);
          options.gravityDelta = options.bounceLeft;
        } else {
          options.gravityDelta = 0.1 + (options.gravityDelta ?? 1);
        }
        options.y += options.gravityDelta;
        break;
      case "triangle":
        bottom = Math.max(options.y1, options.y2, options.y3);
        hitFloor = bottom >= this.canvasConverse.h;

        if (hitFloor) {
          options.bounceLeft = Math.round((options.bounceLeft ?? -5) * 0.5);
          options.gravityDelta = options.bounceLeft;
        } else {
          options.gravityDelta = 0.1 + (options.gravityDelta ?? 1);
        }
        options.y1 += options.gravityDelta;
        options.y2 += options.gravityDelta;
        options.y3 += options.gravityDelta;
        break;
      case "ellipse":
        bottom = options.y + options.ry;
        hitFloor = bottom >= this.canvasConverse.h;

        if (hitFloor) {
          options.bounceLeft = Math.round((options.bounceLeft ?? -5) * 0.5);
          options.gravityDelta = options.bounceLeft;
        } else {
          options.gravityDelta = 0.1 + (options.gravityDelta ?? 1);
        }
        options.y += options.gravityDelta;
        break;
      case "draw":
        break;
      default:
        throw new Error("Unrecognized object.");
        break;
    }
  }
}
