/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Particles extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("enemy particle", "./Particles/costumes/enemy particle.png", {
        x: 5,
        y: 5
      }),
      new Costume("box particle", "./Particles/costumes/box particle.png", {
        x: 5,
        y: 5
      }),
      new Costume("size", "./Particles/costumes/size.png", { x: 229, y: 229 })
    ];

    this.sounds = [new Sound("pop", "./Particles/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "bounce particle" },
        this.whenIReceiveBounceParticle
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "enemy particles" },
        this.whenIReceiveEnemyParticles
      )
    ];

    this.vars.clone = 0;
    this.vars.moveVel = 0.07735681502711965;
    this.vars.dir = -152;
    this.vars.costume = 0;
  }

  *whenIReceiveBounceParticle() {
    if (this.vars.clone == 0) {
      yield* this.createBoxParticles();
    }
  }

  *startAsClone() {
    this.vars.clone = 1;
    this.vars.costume = this.costumeNumber;
    this.vars.moveVel = this.random(0.2, 2);
    this.vars.dir = this.random(180, -180);
    this.x += this.random(-10, 10);
    this.y += this.random(-10, 10);
    this.visible = true;
    this.costume = this.vars.costume;
    this.size = 150;
    for (let i = 0; i < 50; i++) {
      this.direction = this.vars.dir;
      this.move(this.vars.moveVel);
      this.vars.moveVel = this.vars.moveVel * 0.9;
      this.direction = 90;
      this.costume = "size";
      this.size += -7.5;
      this.costume = this.vars.costume;
      yield;
    }
    this.deleteThisClone();
  }

  *whenGreenFlagClicked() {
    this.vars.clone = 0;
  }

  *createBoxParticles() {
    this.costume = "box particle";
    this.effects.clear();
    this.goto(this.sprites["Box"].x, this.sprites["Box"].y);
    for (let i = 0; i < 10; i++) {
      this.createClone();
    }
  }

  *whenIReceiveEnemyParticles() {
    if (this.vars.clone == 0) {
      yield* this.createEnemyParticles();
    }
  }

  *createEnemyParticles() {
    this.costume = "enemy particle";
    this.effects.clear();
    this.goto(this.stage.vars.particlesX, this.stage.vars.particlesY);
    for (let i = 0; i < 10; i++) {
      this.createClone();
    }
  }
}
