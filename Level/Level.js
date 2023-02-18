/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Level extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Level/costumes/costume1.svg", {
        x: 2.5,
        y: 2.5
      })
    ];

    this.sounds = [new Sound("pop", "./Level/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset)
    ];
  }

  *whenGreenFlagClicked() {
    this.clearPen();
    this.goto(0, 0);
    this.penSize = 10;
    while (true) {
      if (this.stage.vars.play == 4) {
        if (this.stage.vars.Bossbattle == "no") {
          yield* this.drawHealth(-50, -20, this.stage.vars.levelUp, "Y", 10);
          if (this.stage.vars.levelUp > 100) {
            this.stage.vars.pause = "yes";
            this.broadcast("upgrade");
            while (!(this.stage.vars.pause == "no")) {
              yield* this.drawHealth(
                -50,
                -20,
                this.stage.vars.levelUp,
                "Y",
                10
              );
              yield;
            }
            this.stage.vars.levelUp = 1;
          }
        } else {
          yield* this.drawBossHealth(
            -50,
            -20,
            100 - this.sprites["Boss"].vars["hits"],
            "Y",
            10
          );
        }
      }
      yield;
    }
  }

  *drawHealth(x3, y2, number, outline, healthBarWidth) {
    if (outline == "Y") {
      this.penColor = Color.rgb(0, 0, 0);
      this.penColor.a = 1 - 75 / 100;
      this.penSize = healthBarWidth;
      this.goto(x3, y2);
      this.penDown = true;
      this.goto(x3 + 100, y2);
    }
    this.penDown = false;
    this.penColor = Color.rgb(255, 255, 255);
    this.penSize = healthBarWidth;
    this.goto(x3, y2);
    this.penDown = true;
    this.goto(number + x3, y2);
  }

  *whenIReceiveReset() {
    this.stage.vars.levelUp = 1;
  }

  *drawBossHealth(x4, y3, _, outline2, barWidth) {
    if (outline2 == "Y") {
      this.penColor = Color.rgb(0, 0, 0);
      this.penColor.a = 1 - 75 / 100;
      this.penSize = barWidth;
      this.goto(x4, y3);
      this.penDown = true;
      this.goto(x4 + 100, y3);
    }
    this.penDown = false;
    this.penColor = Color.rgb(255, 142, 129);
    this.penSize = barWidth;
    this.goto(x4, y3);
    this.penDown = true;
    this.goto(_ + x4, y3);
  }
}
