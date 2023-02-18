/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Music2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [new Costume("", "./Music2/costumes/.svg", { x: 0, y: 0 })];

    this.sounds = [
      new Sound("instance83779", "./Music2/sounds/instance83779.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];

    this.audioEffects.volume = 0;
  }

  *whenGreenFlagClicked() {
    this.audioEffects.volume = 0;
    while (true) {
      yield* this.playSoundUntilDone("instance83779");
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.audioEffects.volume = 0;
      yield* this.wait(0.2);
      while (!(this.stage.vars.play == 4)) {
        yield;
      }
      for (let i = 0; i < 100; i++) {
        if (this.stage.vars.Music == 100) {
          this.audioEffects.volume += 1;
        } else {
          this.audioEffects.volume = 0;
        }
        yield;
      }
      while (!(this.stage.vars.play == 0)) {
        if (this.stage.vars.Music == 100) {
          this.audioEffects.volume = 100;
        } else {
          this.audioEffects.volume = 0;
        }
        yield;
      }
      for (let i = 0; i < 20; i++) {
        this.audioEffects.volume += -5;
        yield;
      }
      yield;
    }
  }
}
