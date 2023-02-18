/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Bat extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("bat", "./Bat/costumes/bat.svg", {
        x: 17.231151729145125,
        y: 4.569036409670076
      }),
      new Costume("actual bat", "./Bat/costumes/actual bat.png", {
        x: 11,
        y: 4
      })
    ];

    this.sounds = [new Sound("swing", "./Bat/sounds/swing.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenIReceiveTick() {
    if (this.stage.vars.pause == "no") {
      this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      this.direction += this.stage.vars.offset;
      this.move(25);
      this.direction += this.stage.vars.offset * 0.5;
    }
    yield* this.shadow();
  }

  *whenGreenFlagClicked() {
    this.stage.vars.offset = -110;
    while (true) {
      this.stage.vars.attacking = 0;
      if (this.mouse.down) {
        if (this.stage.vars.pause == "no") {
          this.stage.vars.attacking = 1;
          this.audioEffects.pitch = this.random(-25, 25);
          yield* this.startSound("swing");
          if (this.stage.vars.offset.includes("-")) {
            while (!(this.stage.vars.offset > 100 && !this.mouse.down)) {
              this.stage.vars.offset += (110 - this.stage.vars.offset) / 3;
              if (this.mouse.down && this.stage.vars.offset > 55) {
                this.stage.vars.attacking = 0;
              }
              yield;
            }
          } else {
            while (!(-100 > this.stage.vars.offset && !this.mouse.down)) {
              this.stage.vars.offset += (-110 - this.stage.vars.offset) / 3;
              if (this.mouse.down && -55 > this.stage.vars.offset) {
                this.stage.vars.attacking = 0;
              }
              yield;
            }
            this.stage.vars.attacking = 0;
          }
        }
      }
      yield;
    }
  }

  *shadow() {
    this.effects.clear();
    this.costume = "actual bat";
    this.y += -7;
    this.effects.ghost = 25;
    this.stamp();
    this.effects.clear();
    this.effects.brightness = 100;
    this.y += 7;
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.audioEffects.volume = this.stage.vars.Fx;
      yield;
    }
  }
}
