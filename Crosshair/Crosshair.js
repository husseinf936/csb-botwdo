/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Crosshair extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("crosshair", "./Crosshair/costumes/crosshair.png", {
        x: 8,
        y: 8
      })
    ];

    this.sounds = [new Sound("pop", "./Crosshair/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];
  }

  *whenIReceiveTick() {
    this.goto(this.mouse.x, this.mouse.y);
    this.moveAhead();
    this.moveBehind(1);
    this.direction += 3;
    yield* this.shadow();
  }

  *shadow() {
    this.effects.clear();
    this.costume = "box";
    this.y += -7;
    this.effects.ghost = 25;
    this.stamp();
    this.effects.clear();
    this.effects.brightness = 100;
    this.y += 7;
  }
}
