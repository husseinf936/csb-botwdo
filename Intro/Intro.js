/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Intro extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("bigbouncybanana", "./Intro/costumes/bigbouncybanana.svg", {
        x: 829.4330612123513,
        y: 628.8835799699698
      }),
      new Costume("black bg", "./Intro/costumes/black bg.svg", {
        x: 248.49849849849852,
        y: 192.19219219219218
      }),
      new Costume("costume1", "./Intro/costumes/costume1.svg", {
        x: -2.755252252252234,
        y: 4.268657842091301
      })
    ];

    this.sounds = [new Sound("pop", "./Intro/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.Timesopened += 1;
    this.visible = true;
    if (this.stage.vars.Timesopened == 1) {
      this.direction = -120;
      this.goto(0, 0);
      this.size = 1;
      while (true) {
        this.costume = "black bg";
        this.size += (100 - this.size) / 8;
        this.direction += (90 - this.direction) / 8;
        this.costume = "bigbouncybanana";
        yield;
      }
    }
    this.visible = false;
  }

  *startAsClone() {
    this.direction = 90;
    this.goto(0, 0);
    this.size = 100;
    this.costume = "black bg";
  }

  *startAsClone2() {
    yield* this.wait(2);
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    /* TODO: Implement stop other scripts in sprite */ null;
    return;
  }

  *whenGreenFlagClicked2() {
    yield* this.wait(2);
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    /* TODO: Implement stop other scripts in sprite */ null;
    return;
  }

  *startAsClone3() {
    while (true) {
      this.moveAhead();
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    while (true) {
      this.moveAhead();
      this.moveAhead(1);
      yield;
    }
  }
}
