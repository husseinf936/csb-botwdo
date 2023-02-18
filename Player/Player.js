/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("player", "./Player/costumes/player.png", { x: 6, y: 6 })
    ];

    this.sounds = [new Sound("hurt", "./Player/sounds/hurt.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset" },
        this.whenIReceiveReset2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];
  }

  *movement(speed) {
    if (this.keyPressed("w") || this.keyPressed("up arrow")) {
      this.stage.vars.speedY += speed;
    }
    if (this.keyPressed("s") || this.keyPressed("down arrow")) {
      this.stage.vars.speedY += 0 - speed;
    }
    if (this.keyPressed("d") || this.keyPressed("right arrow")) {
      this.stage.vars.speedX += speed;
    }
    if (this.keyPressed("a") || this.keyPressed("left arrow")) {
      this.stage.vars.speedX += 0 - speed;
    }
    this.stage.vars.speedX = this.stage.vars.speedX * 0.8;
    this.stage.vars.speedY = this.stage.vars.speedY * 0.8;
    this.x += this.stage.vars.speedX;
    this.y += this.stage.vars.speedY;
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.direction = 90;
      if (this.stage.vars.pause == "no") {
        yield* this.movement(1.7 + this.stage.vars.upgradesList[3 - 1] * 0.2);
        this.direction = this.radToScratch(
          Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
        );
      }
      this.broadcast("tick");
      yield;
    }
  }

  *shadow() {
    this.effects.clear();
    this.costume = "player";
    this.y += -7;
    this.effects.ghost = 25;
    this.stamp();
    this.effects.clear();
    this.effects.brightness = 100;
    this.y += 7;
  }

  *whenIReceiveTick() {
    yield* this.shadow();
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (
        this.touching(this.sprites["Enemies"].andClones()) ||
        this.touching(this.sprites["BossBullets"].andClones())
      ) {
        this.broadcast("flash");
        yield* this.startSound("hurt");
        yield* this.wait(0.75);
      }
      yield;
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.lives = 3;
  }

  *whenIReceiveReset2() {
    this.goto(0, -100);
    this.stage.vars.speedX = 0;
    this.stage.vars.speedY = 0;
  }

  *whenGreenFlagClicked3() {
    while (true) {
      this.audioEffects.volume = this.stage.vars.Fx;
      yield;
    }
  }

  *startAsClone() {
    while (true) {
      this.audioEffects.volume = this.stage.vars.Fx;
      yield;
    }
  }
}
