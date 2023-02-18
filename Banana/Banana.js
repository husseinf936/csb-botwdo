/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Banana extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("banana", "./Banana/costumes/banana.png", { x: 20, y: 18 })
    ];

    this.sounds = [new Sound("pop", "./Banana/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *shadow() {
    this.effects.clear();
    this.costume = "banana";
    this.y += -7;
    this.effects.ghost = 25;
    this.stamp();
    this.effects.clear();
    this.effects.brightness = 100;
    this.y += 7;
  }

  *whenGreenFlagClicked() {}
}
