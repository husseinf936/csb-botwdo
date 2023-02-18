/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class UpgradeLabels extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "faster shooting",
        "./UpgradeLabels/costumes/faster shooting.svg",
        { x: 216, y: 18 }
      ),
      new Costume("explosion", "./UpgradeLabels/costumes/explosion.svg", {
        x: 225,
        y: 18
      }),
      new Costume("fast", "./UpgradeLabels/costumes/fast.svg", {
        x: 216,
        y: 18
      }),
      new Costume("big", "./UpgradeLabels/costumes/big.svg", {
        x: 140.5,
        y: 18
      }),
      new Costume("le snap", "./UpgradeLabels/costumes/le snap.svg", {
        x: 177,
        y: 39.5
      }),
      new Costume("new!", "./UpgradeLabels/costumes/new!.svg", { x: 56, y: 18 })
    ];

    this.sounds = [new Sound("pop", "./UpgradeLabels/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(130, 72);
    this.createClone();
    this.goto(130, 0);
    this.createClone();
    this.goto(130, -72);
    this.createClone();
  }

  *startAsClone() {
    while (true) {
      if (this.stage.vars.pause == "yes") {
        this.visible = true;
      } else {
        this.visible = false;
      }
      if (this.y > 1) {
        if (
          this.stage.vars.upgradesList[
            this.stage.vars.currentUpgrades[1 - 1] - 1
          ] == 0
        ) {
          this.costume = "new!";
        } else {
          this.costume = this.stage.vars.currentUpgrades[1 - 1];
        }
      } else {
        if (this.y == 0) {
          if (
            this.stage.vars.upgradesList[
              this.stage.vars.currentUpgrades[2 - 1] - 1
            ] == 0
          ) {
            this.costume = "new!";
          } else {
            this.costume = this.stage.vars.currentUpgrades[2 - 1];
          }
        } else {
          if (
            this.stage.vars.upgradesList[
              this.stage.vars.currentUpgrades[3 - 1] - 1
            ] == 0
          ) {
            this.costume = "new!";
          } else {
            this.costume = this.stage.vars.currentUpgrades[3 - 1];
          }
        }
      }
      yield;
    }
  }
}
