/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Enemies extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("enemy", "./Enemies/costumes/enemy.png", { x: 6, y: 6 }),
      new Costume("big", "./Enemies/costumes/big.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("oof", "./Enemies/sounds/oof.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.BROADCAST, { name: "dead" }, this.whenIReceiveDead),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "le snap" },
        this.whenIReceiveLeSnap
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "boss battle" },
        this.whenIReceiveBossBattle
      )
    ];

    this.vars.Clone2 = 0;
    this.vars.listspot = 0;
    this.vars.oldDirection = -160.37398368861977;
  }

  *startAsClone() {
    this.vars.Clone2 = 1;
    this.costume = "big";
    this.goto(this.random(-200, 200), 250);
    this.costume = "enemy";
    this.visible = true;
    while (true) {
      this.costume = "big";
      if (this.stage.vars.pause == "no") {
        this.stage.vars.timeDelay +=
          "" + "-" + Math.abs(this.stage.vars.timeDelay * 0.00005);
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Player"].y - this.y,
            this.sprites["Player"].x - this.x
          )
        );
        this.move(1.1);
        if (this.stage.vars.timeDelay.includes("-")) {
          this.move(Math.abs(this.stage.vars.timeDelay));
        }
      }
      this.costume = "enemy";
      if (
        (this.touching(this.sprites["Box"].andClones()) &&
          this.stage.vars.vel > 2) ||
        this.touching(this.sprites["Bullet"].andClones()) ||
          this.touching(this.sprites["Explosions"].andClones()) || null
      ) {
        this.stage.vars.particlesX = this.x;
        this.stage.vars.particlesY = this.y;
        this.broadcast("enemy particles");
        this.stage.vars.Score += 100;
        if (this.stage.vars.Bossbattle == "no") {
          if (this.stage.vars.timeDelay.includes("-")) {
            this.stage.vars.levelUp += 0.5;
          } else {
            this.stage.vars.levelUp += this.stage.vars.timeDelay * 5 + 0.8;
          }
        }
        this.audioEffects.pitch = this.random(-25, 25);
        yield* this.startSound("oof");
        this.deleteThisClone();
      }
      if (this.touching(this.sprites["Player"].andClones())) {
        yield* this.wait(0);
        this.move(-2.2);
      }
      if (!(this.stage.vars.play == 4)) {
        this.deleteThisClone();
      }
      yield;
    }
  }

  *shadow() {
    this.effects.clear();
    this.costume = "big";
    this.y += -7;
    this.costume = "enemy";
    this.effects.ghost = 25;
    this.stamp();
    this.effects.clear();
    this.effects.color = -1110;
    this.effects.brightness = 50;
    this.costume = "big";
    this.y += 7;
    this.costume = "enemy";
  }

  *whenIReceiveReset() {
    this.stage.vars.Bossbattle = "no";
    if (this.vars.Clone2 == 0) {
      this.stage.vars.timeDelay = 1;
    }
    while (!(this.stage.vars.play == 4)) {
      yield;
    }
    while (!(0.01 > this.stage.vars.timeDelay)) {
      yield* this.wait(this.stage.vars.timeDelay);
      if (this.stage.vars.pause == "no") {
        this.createClone();
      }
      yield;
    }
    this.broadcast("boss battle");
  }

  *whenIReceiveDead() {
    if (this.vars.Clone2 == 0) {
      /* TODO: Implement stop other scripts in sprite */ null;
    }
    this.deleteThisClone();
  }

  *whenGreenFlagClicked() {
    this.vars.Clone2 = 0;
  }

  *whenIReceiveTick() {
    if (this.vars.Clone2 == 1) {
      yield* this.shadow();
    }
  }

  *startAsClone2() {
    while (true) {
      this.audioEffects.volume = this.stage.vars.Fx;
      yield;
    }
  }

  *whenIReceiveLeSnap() {
    yield* this.wait(this.random(-1, 0.1));
    if (this.random(1, 5) == 1) {
      this.stage.vars.particlesX = this.x;
      this.stage.vars.particlesY = this.y;
      this.broadcast("enemy particles");
      if (this.stage.vars.timeDelay.includes("-")) {
        this.stage.vars.levelUp += 0.5;
      } else {
        this.stage.vars.levelUp += this.stage.vars.timeDelay * 5 + 0.8;
      }
    }
    this.audioEffects.pitch = this.random(-25, 25);
    yield* this.startSound("oof");
    this.deleteThisClone();
  }

  *whenIReceiveBossBattle() {
    yield* this.wait(this.random(-1, 0.25));
    if (this.random(1, 5) == 1) {
      this.stage.vars.particlesX = this.x;
      this.stage.vars.particlesY = this.y;
      this.broadcast("enemy particles");
      if (this.stage.vars.timeDelay.includes("-")) {
        this.stage.vars.levelUp += 0.5;
      } else {
        this.stage.vars.levelUp += this.stage.vars.timeDelay * 5 + 0.8;
      }
    }
    this.audioEffects.pitch = this.random(-25, 25);
    yield* this.startSound("oof");
    this.deleteThisClone();
  }
}
