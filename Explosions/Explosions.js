/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Explosions extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("explosion", "./Explosions/costumes/explosion.png", {
        x: 25,
        y: 25
      })
    ];

    this.sounds = [new Sound("pop", "./Explosions/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *startAsClone() {
    this.goto(this.sprites["Box"].x, this.sprites["Box"].y);
    this.size = 250 + this.stage.vars.upgradesList[2 - 1] * 25;
    this.effects.clear();
    this.visible = true;
    for (let i = 0; i < 20; i++) {
      this.effects.ghost += 4;
      this.size += 4;
      yield* this.shadow();
      yield;
    }
    this.deleteThisClone();
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *shadow() {
    this.effects.brightness = 0;
    this.costume = "player";
    this.y += -7;
    this.effects.ghost += 25;
    this.stamp();
    this.effects.ghost += -25;
    this.effects.brightness = 100;
    this.y += 7;
  }
}
