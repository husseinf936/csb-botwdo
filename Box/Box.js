/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Box extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("box", "./Box/costumes/box.png", { x: 11, y: 11 })
    ];

    this.sounds = [
      new Sound("Ping Pong Hit", "./Box/sounds/Ping Pong Hit.wav"),
      new Sound("Tennis Hit", "./Box/sounds/Tennis Hit.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.BROADCAST, { name: "dead" }, this.whenIReceiveDead),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4)
    ];

    this.vars.velDir = -117.04796318690484;
    this.vars.Clone = 0;
  }

  *whenGreenFlagClicked() {
    this.vars.Clone = 0;
    this.createClone();
    while (true) {
      if (this.stage.vars.pause == "no") {
        if (this.touching(this.sprites["Bat"].andClones())) {
          if (this.stage.vars.attacking == 1) {
            this.audioEffects.pitch = this.random(25, -25);
            yield* this.startSound("Ping Pong Hit");
            this.direction = this.radToScratch(
              Math.atan2(
                this.sprites["Player"].y - this.y,
                this.sprites["Player"].x - this.x
              )
            );
            this.direction += 180;
            this.stage.vars.vel = 30;
            this.stage.vars.attacking = 0;
          }
        }
        if (this.touching("edge")) {
          this.broadcast("bounce particle");
          this.audioEffects.pitch = this.random(25, -25);
          yield* this.startSound("Ping Pong Hit");
        }
        /* TODO: Implement motion_ifonedgebounce */ null;
        this.stage.vars.vel = this.stage.vars.vel * 0.988;
        this.move(this.stage.vars.vel);
        this.vars.velDir = this.direction;
        this.effects.ghost = 100;
      }
      this.size = 250 + this.stage.vars.upgradesList[4 - 1] * 35;
      yield;
    }
  }

  *startAsClone() {
    this.vars.Clone = 1;
    this.visible = true;
    while (true) {
      this.goto(this.sprites["Box"].x, this.sprites["Box"].y);
      if (this.stage.vars.pause == "no") {
        this.direction += this.stage.vars.vel;
      }
      this.size = 250 + this.stage.vars.upgradesList[4 - 1] * 35;
      yield;
    }
  }

  *shadow() {
    this.effects.clear();
    this.costume = "box";
    this.y += -7;
    this.effects.ghost = 25;
    this.stamp();
    this.effects.clear();
    this.effects.brightness = 100;
    this.y += 7;
  }

  *whenIReceiveTick() {
    if (this.vars.Clone == 1) {
      yield* this.shadow();
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.vel = 0;
    this.vars.velDir = 0;
    this.goto(0, 0);
  }

  *whenIReceiveDead() {}

  *startAsClone2() {
    while (true) {
      this.audioEffects.volume = this.stage.vars.Fx;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.audioEffects.volume = this.stage.vars.Fx;
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    while (true) {
      if (this.touching("edge")) {
        if (this.stage.vars.upgradesList[2 - 1] > 0) {
          this.sprites["Explosions"].createClone();
          while (
            !(
              this.touching(this.sprites["Bat"].andClones()) &&
              this.stage.vars.attacking == 1
            )
          ) {
            yield;
          }
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked4() {
    while (true) {
      for (let i = 0; i < 11 - this.stage.vars.upgradesList[5 - 1]; i++) {
        while (
          !(
            this.touching(this.sprites["Bat"].andClones()) &&
            this.stage.vars.attacking == 1
          )
        ) {
          yield;
        }
        while (!this.touching("edge")) {
          yield;
        }
        yield;
      }
      if (this.stage.vars.upgradesList[5 - 1] > 0) {
        this.broadcast("le snap");
      }
      yield;
    }
  }
}
