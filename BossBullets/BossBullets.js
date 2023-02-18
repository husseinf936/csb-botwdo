/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BossBullets extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("bullet", "./BossBullets/costumes/bullet.png", {
        x: 7,
        y: 5
      }),
      new Costume("big", "./BossBullets/costumes/big.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./BossBullets/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *startAsClone() {
    this.goto(this.sprites["Boss"].x, this.sprites["Boss"].y);
    this.direction = this.radToScratch(
      Math.atan2(
        this.sprites["Player"].y - this.y,
        this.sprites["Player"].x - this.x
      )
    );
    this.visible = true;
    while (true) {
      this.costume = "big";
      this.move(7);
      this.costume = "bullet";
      yield* this.shadow();
      yield;
    }
  }

  *shadow() {
    this.effects.clear();
    this.costume = "big";
    this.y += -7;
    this.costume = "bullet";
    this.effects.ghost = 25;
    this.stamp();
    this.effects.clear();
    this.effects.color = -1110;
    this.effects.brightness = 50;
    this.costume = "big";
    this.y += 7;
    this.costume = "bullet";
  }

  *startAsClone2() {
    while (true) {
      if (this.touching("edge")) {
        yield* this.wait(1);
        this.deleteThisClone();
      }
      yield;
    }
  }

  *startAsClone3() {
    while (true) {
      if (this.touching(this.sprites["Box"].andClones())) {
        this.deleteThisClone();
      }
      yield;
    }
  }
}
