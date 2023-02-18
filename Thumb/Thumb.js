/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Thumb extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "C021F2D7-3F53-4906-95AD-8983422C58CE",
        "./Thumb/costumes/C021F2D7-3F53-4906-95AD-8983422C58CE.svg",
        { x: 240, y: 180 }
      )
    ];

    this.sounds = [new Sound("pop", "./Thumb/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    while (true) {
      this.effects.ghost = 100;
      this.moveAhead();
      this.goto(0, 0);
      yield;
    }
  }
}
