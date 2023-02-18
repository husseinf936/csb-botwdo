/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Counters extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Counters/costumes/1.svg", { x: 18.5, y: 20 }),
      new Costume("2", "./Counters/costumes/2.svg", { x: 20, y: 20 }),
      new Costume("3", "./Counters/costumes/3.svg", { x: 20.5, y: 20 }),
      new Costume("4", "./Counters/costumes/4.svg", { x: 20.5, y: 20 }),
      new Costume("5", "./Counters/costumes/5.svg", { x: 20, y: 20 }),
      new Costume("6", "./Counters/costumes/6.svg", { x: 20, y: 20 }),
      new Costume("7", "./Counters/costumes/7.svg", { x: 20.5, y: 20 }),
      new Costume("8", "./Counters/costumes/8.svg", { x: 20.5, y: 20 }),
      new Costume("9", "./Counters/costumes/9.svg", { x: 20, y: 20 }),
      new Costume("0", "./Counters/costumes/0.svg", { x: 20.5, y: 20 }),
      new Costume("~", "./Counters/costumes/~.svg", {
        x: 137.3329225057,
        y: 12.499921077300002
      }),
      new Costume("`", "./Counters/costumes/`.svg", {
        x: 104.79072955126662,
        y: 15.498964070500051
      }),
      new Costume("'", "./Counters/costumes/'.svg", {
        x: 134.97916666666669,
        y: 15.500000000000028
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "deleteClones" },
        this.whenIReceiveDeleteclones
      ),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset)
    ];

    this.vars.I = 8;
    this.vars.Cloneid = 1;
    this.vars.Clonex = 0;
    this.vars.Cloney = 0;
  }

  *textSizeXYSpacingCenteredTextid(text, size, x2, y, spacing, centered, id2) {
    if (centered == "true") {
      this.goto(
        text.length * (spacing * size) * -0.5 + (spacing * size) / 2 + x2,
        y
      );
    } else {
      this.goto(x2, y);
    }
    this.size = size;
    this.vars.I = 1;
    for (let i = 0; i < text.length; i++) {
      this.costume = String(text)[this.vars.I - 1];
      this.vars.Cloneid = id2;
      this.createClone();
      this.x += spacing * size;
      this.vars.I += 1;
    }
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.broadcast("deleteClones");
      if (3 > this.stage.vars.play) {
        yield* this.textSizeXYSpacingCenteredTextid(
          "" + "~" + this.stage.vars.Latest,
          35,
          -134,
          -170,
          0.34,
          "true",
          1
        );
        yield* this.textSizeXYSpacingCenteredTextid(
          "" + "`" + this.stage.vars.Best,
          35,
          13,
          -170,
          0.34,
          "true",
          1
        );
        yield* this.textSizeXYSpacingCenteredTextid(
          "" + "'" + this.stage.vars.Wr,
          35,
          170,
          -170,
          0.34,
          "true",
          1
        );
      }
      if (this.stage.vars.play == 4) {
        yield* this.textSizeXYSpacingCenteredTextid(
          this.stage.vars.Score,
          35,
          0,
          -55,
          0.34,
          "true",
          1
        );
      }
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.effects.clear();
    this.effects.brightness = 100;
    this.moveBehind();
    this.vars.Clonex = this.x;
    this.vars.Cloney = this.y;
    if (this.vars.Cloneid == 1) {
      this.y += 9;
    } else {
      null;
    }
    while (true) {
      this.x += (this.vars.Clonex - this.x) / 5;
      this.y += (this.vars.Cloney - this.y) / 5;
      this.visible = true;
      this.moveBehind();
      yield;
    }
  }

  *whenIReceiveDeleteclones() {
    this.deleteThisClone();
  }

  *whenIReceiveReset() {
    this.stage.vars.Score = 0;
  }
}
