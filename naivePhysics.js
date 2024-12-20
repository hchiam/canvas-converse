export class NaivePhysics {
  constructor(canvasConverse) {
    this.canvasConverse = canvasConverse;
    this.objects = canvasConverse.objects;
    this.canvas = canvasConverse.canvas;
    this.context = canvasConverse.context;
    this.bounceCoefficient = 0.5;
    // this.bounceCoefficient = 5; // TODO: put back to 5
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
    Object.entries(this.objects).forEach((entry) => {
      const [key, object] = entry;
      if (object.options.physics) {
        this.#handleGravity(key);
        this.#handleCollisions(key);
      }
      this.#redrawObject(object);
    });
  }

  #redrawObject(object) {
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
          options.bounceRemaining = Math.round(
            (options.bounceRemaining ?? -this.bounceCoefficient) * 0.5
          );
          options.gravityDeltaY = options.bounceRemaining;
        } else {
          options.gravityDeltaY =
            this.gravityCoefficient + (options.gravityDeltaY ?? 1);
        }
        options.y += options.gravityDeltaY;
        options.y = Math.min(options.y, this.canvasConverse.h - options.h);
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
        options.y += options.gravityDeltaY;
        const circleHeight = options.r; // TODO: ellipse, not circle
        options.y = Math.min(options.y, this.canvasConverse.h - circleHeight);
        break;
      case "draw":
        break;
      default:
        throw new Error("Unrecognized object.");
        break;
    }
  }

  #handleCollisions(key) {
    const object = this.objects[key];
    const options1 = object.options;
    switch (object.type) {
      case "ellipse":
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
              if (key === "4") console.log(dx, dy, hitObject2);

              options1.dx = options1.dx ?? dx;
              options1.dy = options1.dy ?? dy;
              options1.x += options1.dx * this.bounceCoefficient;
              options1.y += options1.dy * this.bounceCoefficient;
              const circleHeight = options1.r; // TODO: ellipse, not circle
              options1.y = Math.min(
                options1.y,
                this.canvasConverse.h - circleHeight
              );
            }
          });

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
    const dx = options1.x - options2.x + Math.random();
    const dy = options1.y - options2.y + Math.random();
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const ux = magnitude !== 0 ? dx / magnitude : 0;
    const uy = magnitude !== 0 ? dy / magnitude : 0;
    return { dx: ux * options1.r, dy: uy * options1.r };
  }
}
