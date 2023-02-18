/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Upgrades extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("pew pew", "./Upgrades/costumes/pew pew.svg", {
        x: 60.833315,
        y: 19.333335000000062
      }),
      new Costume("boom boom", "./Upgrades/costumes/boom boom.svg", {
        x: 60.833305000000024,
        y: 19.333335000000147
      }),
      new Costume("run fast", "./Upgrades/costumes/run fast.svg", {
        x: 60.833305000000024,
        y: 19.333335000000204
      }),
      new Costume("size plus", "./Upgrades/costumes/size plus.svg", {
        x: 60.833305000000024,
        y: 19.33332500000006
      }),
      new Costume("snap", "./Upgrades/costumes/snap.svg", {
        x: 60.833305000000024,
        y: 19.33333500000012
      }),
      new Costume("banana", "./Upgrades/costumes/banana.svg", {
        x: 60.833305000000024,
        y: 19.333325000000116
      }),
      new Costume("powerups", "./Upgrades/costumes/powerups.png", {
        x: 310,
        y: 344
      }),
      new Costume("poweruptext", "./Upgrades/costumes/poweruptext.png", {
        x: 434,
        y: 198
      })
    ];

    this.sounds = [new Sound("pop", "./Upgrades/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "upgrade" },
        this.whenIReceiveUpgrade
      ),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(-100, 0);
    this.createClone();
    this.goto(-100, 73);
    this.createClone();
    this.goto(-100, -73);
    this.createClone();
    this.goto(1, 0);
    this.stage.vars.currentUpgrades = [];
    this.visible = false;
  }

  *startAsClone() {
    this.stage.vars.currentUpgrades = [];
    while (true) {
      if (this.stage.vars.pause == "yes") {
        this.visible = true;
      } else {
        this.visible = false;
      }
      yield;
    }
  }

  *whenIReceiveUpgrade() {
    this.stage.vars.pause = "yes";
    this.stage.vars.currentUpgrades = [];
    if (this.x == -100) {
      if (this.y > 1) {
        yield* this.wait(0.1);
        this.stage.vars.currentUpgrades.push(7);
        this.costume = this.random(1, 5);
        while (!!this.stage.vars.currentUpgrades.includes(this.costumeNumber)) {
          this.costume = this.random(1, 5);
          yield;
        }
        this.stage.vars.currentUpgrades = [];
        this.stage.vars.currentUpgrades.push(this.costumeNumber);
      } else {
        if (this.y == 0) {
          yield* this.wait(0.2);
          this.costume = this.random(1, 5);
          while (
            !!this.stage.vars.currentUpgrades.includes(this.costumeNumber)
          ) {
            this.costume = this.random(1, 5);
            yield;
          }
          this.stage.vars.currentUpgrades.push(this.costumeNumber);
        } else {
          yield* this.wait(0.3);
          this.costume = this.random(1, 5);
          while (
            !!this.stage.vars.currentUpgrades.includes(this.costumeNumber)
          ) {
            this.costume = this.random(1, 5);
            yield;
          }
          this.stage.vars.currentUpgrades.push(this.costumeNumber);
        }
      }
    }
    if (this.x == -100) {
      while (!(this.stage.vars.pause == "no")) {
        if (this.mouse.down && this.touching("mouse")) {
          while (!!this.mouse.down) {
            yield;
          }
          if (this.touching("mouse")) {
            if (this.stage.vars.pause == "yes") {
              this.stage.vars.upgradesList.splice(
                this.costumeNumber - 1,
                1,
                this.stage.vars.upgradesList[this.costumeNumber - 1] + 1
              );
            }
            this.stage.vars.pause = "no";
          }
        }
        yield;
      }
    }
  }

  *whenIReceiveReset() {
    if (this.x == 1) {
      this.stage.vars.upgradesList = [];
      for (let i = 0; i < 6; i++) {
        this.stage.vars.upgradesList.push(0);
        yield;
      }
    }
  }
}
