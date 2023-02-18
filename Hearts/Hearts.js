/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Hearts extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Hearts/costumes/1.png", { x: 8, y: 8 }),
      new Costume("2", "./Hearts/costumes/2.png", { x: 18, y: 7 }),
      new Costume("3", "./Hearts/costumes/3.png", { x: 27, y: 7 }),
      new Costume("0", "./Hearts/costumes/0.png", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("heart", "./Hearts/sounds/heart.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.Score = 0;
    this.stage.vars.Best = 0;
    this.stage.vars.Latest = 0;
    this.createClone();
    while (true) {
      this.effects.brightness = 100;
      if (this.stage.vars.play == 4) {
        this.visible = true;
        this.stamp();
        this.visible = false;
        if (this.stage.vars.lives == 0) {
          yield* this.broadcastAndWait("dead");
          this.stage.vars.Latest = this.stage.vars.Score;
          if (this.stage.vars.Score > this.stage.vars.Best) {
            this.stage.vars.Best = this.stage.vars.Score;
          }
          this.stage.vars.Score = 0;
          this.broadcast("reset");
        }
      }
      this.costume = this.stage.vars.lives;
      yield;
    }
  }

  *shadow() {
    this.effects.clear();
    this.costume = "player";
    this.y += -7;
    this.effects.ghost = 25;
    this.stamp();
    this.effects.clear();
    this.effects.brightness = 100;
    this.y += 7;
  }

  *startAsClone() {
    while (true) {
      this.costume = 1;
      this.visible = false;
      if (this.stage.vars.play == 4) {
        if (3 > this.stage.vars.lives) {
          yield* this.wait(this.random(5, 15));
          this.goto(this.random(-240, 240), this.random(-180, 180));
          this.size = 750;
          while (
            !(
              !this.touching(this.sprites["Box"].andClones()) &&
              !this.touching(this.sprites["Player"].andClones())
            )
          ) {
            null;
            yield;
          }
          this.size = 250;
          this.visible = true;
          while (
            !(
              this.touching(this.sprites["Box"].andClones()) ||
              this.touching(this.sprites["Player"].andClones()) ||
                !(this.stage.vars.play == 4) ||
              this.stage.vars.lives > 2
            )
          ) {
            this.direction =
              Math.cos(this.degToRad(this.sprites["Menu"].vars["cosine"])) * 3;
            this.direction += 90;
            yield* this.shadow();
            yield;
          }
          if (3 > this.stage.vars.lives) {
            yield* this.startSound("heart");
            this.stage.vars.lives += 1;
          }
          this.visible = false;
          yield* this.wait(this.random(1, 5));
        }
      }
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      this.audioEffects.volume = this.stage.vars.Fx;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    yield* this.wait(0);
    while (true) {
      if (this.stage.vars.Score > this.stage.vars.Wr) {
        this.stage.vars.Wr = this.stage.vars.Score;
      }
      yield;
    }
  }
}
