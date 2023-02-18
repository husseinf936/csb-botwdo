/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Bullet extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("bullet", "./Bullet/costumes/bullet.png", { x: 7, y: 5 }),
      new Costume("big", "./Bullet/costumes/big.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("shoot", "./Bullet/sounds/shoot.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];

    this.vars.x = 1005;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      if (this.stage.vars.play == 4) {
        if (this.stage.vars.upgradesList[1 - 1] == 1) {
          yield* this.wait(3);
        } else {
          if (this.stage.vars.upgradesList[1 - 1] == 2) {
            yield* this.wait(2);
          } else {
            if (this.stage.vars.upgradesList[1 - 1] == 3) {
              yield* this.wait(1.5);
            } else {
              if (this.stage.vars.upgradesList[1 - 1] == 4) {
                yield* this.wait(1);
              } else {
                if (this.stage.vars.upgradesList[1 - 1] == 5) {
                  yield* this.wait(0.5);
                } else {
                  if (this.stage.vars.upgradesList[1 - 1] == 6) {
                    yield* this.wait(0.25);
                  } else {
                    null;
                  }
                }
              }
            }
          }
        }
        this.direction = 90;
        if (
          this.stage.vars.pause == "no" &&
          this.stage.vars.upgradesList[1 - 1] > 0
        ) {
          yield* this.createBullets();
        }
      }
      yield;
    }
  }

  *startAsClone() {
    this.audioEffects.pitch = this.random(-25, 25);
    this.audioEffects.volume = 100;
    yield* this.startSound(this.stage.vars.Fx);
    this.costume = "big";
    this.goto(this.sprites["Box"].x, this.sprites["Box"].y);
    this.costume = "bullet";
    this.visible = true;
    this.effects.clear();
    while (true) {
      if (this.stage.vars.pause == "no") {
        this.costume = "big";
        this.move(7);
        this.costume = "bullet";
        if (this.touching(this.sprites["Enemies"].andClones())) {
          yield* this.wait(0);
          this.move(3);
          this.deleteThisClone();
        }
      }
      yield* this.shadow();
      yield;
    }
  }

  *findPos() {
    this.vars.x = 5;
    while (
      !(
        this.touching(this.sprites["Enemies"].andClones()) || this.vars.x > 1000
      )
    ) {
      this.goto(this.sprites["Box"].x, this.sprites["Box"].y);
      if (!this.touching(this.sprites["Enemies"].andClones())) {
        this.x += 0 - this.vars.x;
      }
      if (!this.touching(this.sprites["Enemies"].andClones())) {
        this.y += this.vars.x;
      }
      if (!this.touching(this.sprites["Enemies"].andClones())) {
        this.x += this.vars.x;
        this.x += this.vars.x;
      }
      if (!this.touching(this.sprites["Enemies"].andClones())) {
        this.y += 0 - this.vars.x;
        this.y += 0 - this.vars.x;
      }
      if (!this.touching(this.sprites["Enemies"].andClones())) {
        this.x += 0 - this.vars.x;
        this.x += 0 - this.vars.x;
      }
      if (!this.touching(this.sprites["Enemies"].andClones())) {
        this.y += this.vars.x;
      }
      this.vars.x += 5;
    }
    this.direction = this.radToScratch(
      Math.atan2(this.sprites["Box"].y - this.y, this.sprites["Box"].x - this.x)
    );
    this.direction += 180;
    this.goto(this.sprites["Box"].x, this.sprites["Box"].y);
    if (this.vars.x > 999) {
      this.direction = this.random(90, -90);
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
    this.effects.brightness = 100;
    this.costume = "big";
    this.y += 7;
    this.costume = "bullet";
  }

  *createBullets() {
    for (let i = 0; i < 5; i++) {
      this.createClone();
      this.direction += 72;
    }
  }

  *startAsClone2() {
    while (true) {
      if (this.stage.vars.pause == "no") {
        if (this.touching("edge")) {
          yield* this.wait(1);
          this.deleteThisClone();
        }
      }
      yield;
    }
  }
}
