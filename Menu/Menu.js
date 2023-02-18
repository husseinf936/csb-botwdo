/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Menu extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("wasd", "./Menu/costumes/wasd.png", { x: 178, y: 40 }),
      new Costume("click", "./Menu/costumes/click.png", { x: 157, y: 40 }),
      new Costume("box", "./Menu/costumes/box.png", { x: 203, y: 40 }),
      new Costume("boom bam bop", "./Menu/costumes/boom bam bop.png", {
        x: 380,
        y: 40
      }),
      new Costume("gameover", "./Menu/costumes/gameover.svg", {
        x: 161,
        y: 120
      }),
      new Costume("text", "./Menu/costumes/text.png", { x: 428, y: 344 }),
      new Costume(
        "numbers/specialcharacters",
        "./Menu/costumes/numbers/specialcharacters.png",
        { x: 450, y: 96 }
      ),
      new Costume("more text", "./Menu/costumes/more text.png", {
        x: 203,
        y: 136
      }),
      new Costume("latestbestworld", "./Menu/costumes/latestbestworld.svg", {
        x: 61,
        y: 99
      })
    ];

    this.sounds = [
      new Sound(
        "boom bam bop sound effect",
        "./Menu/sounds/boom bam bop sound effect.mp3"
      ),
      new Sound(
        "Boom Bam Bop Badabop boomp POW",
        "./Menu/sounds/Boom Bam Bop Badabop boomp POW.wav"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset" },
        this.whenIReceiveReset2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];

    this.audioEffects.volume = 0;

    this.vars.id = 99999;
    this.vars.cosine = 114;
  }

  *whenGreenFlagClicked() {
    this.vars.id = 99999;
    this.costume = "wasd";
    for (let i = 0; i < 3; i++) {
      this.createClone();
      this.costumeNumber += 1;
      yield;
    }
    this.broadcast("reset");
    this.vars.cosine = 0;
    while (true) {
      this.vars.cosine += 9.5;
      this.costume = "boom bam bop";
      if (3 > this.stage.vars.play) {
        this.visible = true;
      } else {
        this.visible = false;
      }
      this.direction = Math.cos(this.degToRad(this.vars.cosine)) * 3;
      this.goto(0, 100);
      this.direction += 90;
      this.size = 100;
      yield;
    }
  }

  *startAsClone() {
    this.vars.id = this.costumeNumber;
    this.visible = true;
    while (true) {
      this.direction = 90;
      this.size = 50;
      if (this.vars.id == 1) {
        this.goto(-100, -100);
        this.costume = "wasd";
        this.moveBehind();
      } else {
        if (this.vars.id == 2) {
          this.goto(105, -100);
          this.costume = "click";
          this.moveBehind();
        } else {
          if (this.vars.id == 3) {
            this.goto(0, 35);
            this.costume = "box";
            this.moveBehind();
          } else {
            null;
          }
        }
      }
      yield;
    }
  }

  *whenIReceiveReset() {
    yield* this.wait(0.1);
    this.stage.vars.vel = 0;
    this.visible = true;
    if (this.vars.id == 1) {
      while (
        !!(
          this.keyPressed("w") ||
          this.keyPressed("up arrow") ||
          this.keyPressed("d") ||
            this.keyPressed("right arrow") ||
            this.keyPressed("a") || this.keyPressed("left arrow") ||
            this.keyPressed("s") || this.keyPressed("down arrow")
        )
      ) {
        yield;
      }
      while (
        !(
          this.keyPressed("w") ||
          this.keyPressed("up arrow") ||
          this.keyPressed("d") ||
            this.keyPressed("right arrow") ||
            this.keyPressed("a") || this.keyPressed("left arrow") ||
            this.keyPressed("s") || this.keyPressed("down arrow")
        )
      ) {
        yield;
      }
      this.stage.vars.play += 1;
      this.visible = false;
      return;
    } else {
      if (this.vars.id == 2) {
        while (!!this.mouse.down) {
          yield;
        }
        while (!this.mouse.down) {
          yield;
        }
        this.stage.vars.play += 1;
        this.visible = false;
        return;
      } else {
        if (this.vars.id == 3) {
          while (!(this.stage.vars.vel == 0)) {
            yield;
          }
          while (!(this.stage.vars.vel > 0)) {
            yield;
          }
          this.stage.vars.play += 1;
          this.visible = false;
          return;
        } else {
          null;
        }
      }
    }
  }

  *whenIReceiveReset2() {
    this.stage.vars.play = 0;
    this.stage.vars.pause = "no";
  }

  *whenGreenFlagClicked2() {
    while (true) {
      yield* this.wait(0.1);
      if (this.stage.vars.play == 3) {
        this.audioEffects.volume = 100;
        yield* this.startSound("Boom Bam Bop Badabop boomp POW");
        yield* this.wait(4.5);
        this.stage.vars.play = 4;
        this.broadcast("fade in");
        for (let i = 0; i < 100; i++) {
          this.audioEffects.volume += -1;
          yield;
        }
        while (!!(this.stage.vars.play == 3)) {
          yield;
        }
      }
      yield;
    }
  }
}
