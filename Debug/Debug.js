/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Debug extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("win", "./Debug/costumes/win.svg", {
        x: 277.027027027027,
        y: 192.4436936936937
      })
    ];

    this.sounds = [new Sound("pop", "./Debug/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "win!!!" }, this.whenIReceiveWin),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];

    this.vars._2 = 0.611;
  }

  *whenIReceiveWin() {
    this.visible = true;
    this.effects.ghost = 100;
    for (let i = 0; i < 100; i++) {
      this.moveAhead();
      this.effects.ghost += -2;
      yield;
    }
    yield* this.wait(999);
    /* TODO: Implement stop all */ null;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenGreenFlagClicked2() {
    this.restartTimer();
    while (true) {
      this.vars._2 = this.timer + 0.1;
      yield;
    }
  }
}
