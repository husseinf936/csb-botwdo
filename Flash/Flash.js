/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Flash extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("player", "./Flash/costumes/player.png", { x: 6, y: 6 })
    ];

    this.sounds = [new Sound("pop", "./Flash/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "flash" }, this.whenIReceiveFlash)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveFlash() {
    this.restartTimer();
    this.stage.vars.lives += -1;
    while (!(this.timer > 0.24)) {
      this.visible = true;
      this.moveAhead();
      this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
      this.direction = this.sprites["Player"].direction;
      this.effects.color = -1110;
      this.effects.brightness = 50;
      yield;
    }
    this.visible = false;
    this.effects.clear();
  }
}
