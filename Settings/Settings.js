/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Settings extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("fxoff", "./Settings/costumes/fxoff.png", { x: 5, y: 3 }),
      new Costume("fxon", "./Settings/costumes/fxon.png", { x: 5, y: 3 }),
      new Costume("musicoff", "./Settings/costumes/musicoff.png", {
        x: 7,
        y: 6
      }),
      new Costume("musicon", "./Settings/costumes/musicon.png", { x: 5, y: 4 })
    ];

    this.sounds = [new Sound("E", "./Settings/sounds/E.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];
  }

  *whenGreenFlagClicked() {
    this.createClone();
    this.costume = "musicon";
    while (true) {
      this.goto(-225, 165);
      if (this.touching(this.sprites["Crosshair"].andClones())) {
        this.size += (550 - this.size) / 5;
      } else {
        this.size += (350 - this.size) / 5;
      }
      this.stage.vars.Music = (this.costumeNumber - 3) * 100;
      yield;
    }
  }

  *startAsClone() {
    this.costume = "fxon";
    while (true) {
      this.goto(225, 165);
      if (this.touching(this.sprites["Crosshair"].andClones())) {
        this.size += (550 - this.size) / 5;
      } else {
        this.size += (350 - this.size) / 5;
      }
      this.stage.vars.Fx = (this.costumeNumber - 1) * 100;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (
        this.mouse.down &&
        this.touching(this.sprites["Crosshair"].andClones())
      ) {
        while (!!this.mouse.down) {
          yield;
        }
        if (this.touching(this.sprites["Crosshair"].andClones())) {
          yield* this.startSound("E");
          if (this.costumeNumber == 3) {
            this.costume = "musicon";
          } else {
            this.costume = "musicoff";
          }
        }
      }
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      if (
        this.mouse.down &&
        this.touching(this.sprites["Crosshair"].andClones())
      ) {
        while (!!this.mouse.down) {
          yield;
        }
        if (this.touching(this.sprites["Crosshair"].andClones())) {
          yield* this.startSound("E");
          if (this.costumeNumber == 1) {
            this.costume = "fxon";
          } else {
            this.costume = "fxoff";
          }
        }
      }
      yield;
    }
  }

  *startAsClone3() {
    while (true) {
      this.audioEffects.volume = this.stage.vars.Fx;
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    while (true) {
      this.audioEffects.volume = this.stage.vars.Fx;
      yield;
    }
  }
}
