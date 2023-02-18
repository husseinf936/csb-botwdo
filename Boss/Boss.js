/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Boss extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("boss", "./Boss/costumes/boss.png", { x: 23, y: 35 }),
      new Costume("shadow", "./Boss/costumes/shadow.png", { x: 23, y: 35 }),
      new Costume("big", "./Boss/costumes/big.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./Boss/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "boss battle" },
        this.whenIReceiveBossBattle
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "boss battle" },
        this.whenIReceiveBossBattle2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "boss battle" },
        this.whenIReceiveBossBattle3
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "boss battle" },
        this.whenIReceiveBossBattle4
      )
    ];

    this.vars.i = 55;
    this.vars.hits = 101;
    this.vars.dir2 = -32;
    this.vars.dialogue = [
      "w",
      "h",
      "y",
      0,
      "t",
      "r",
      "y",
      "?",
      0,
      "y",
      "o",
      "u",
      0,
      "k",
      "n",
      "o",
      "w",
      0,
      "i",
      "n",
      0,
      "t",
      "h",
      "e",
      0,
      "e",
      "n",
      "d",
      ",",
      0,
      "y",
      "o",
      "u",
      "’",
      "r",
      "e",
      0,
      "j",
      "u",
      "s",
      "t",
      0,
      "g",
      "o",
      "i",
      "n",
      "g",
      0,
      "t",
      "o",
      0,
      "d",
      "i",
      "e"
    ];
    this.vars.quotes = [
      "i enjoy watching you try so hard, just so you can fail",
      "why try? you know in the end, you’re just going to die",
      "you got real courage in ya, don’t you?",
      "i am the true, one and only, sir Boom Bam Bop!!!"
    ];
  }

  *shadow() {
    this.effects.clear();
    this.costume = "big";
    this.y += -7;
    this.costume = "shadow";
    this.effects.ghost = 25;
    this.stamp();
    this.effects.clear();
    this.costume = "big";
    this.y += 7;
    this.costume = "boss";
  }

  *whenGreenFlagClicked() {
    this.stage.vars.Bossbattle = "no";
    this.visible = false;
    while (true) {
      this.clearPen();
      if (this.stage.vars.Bossbattle == "yes") {
        yield* this.shadow();
      }
      yield;
    }
  }

  *whenIReceiveBossBattle() {
    this.stage.vars.Bossbattle = "yes";
    this.visible = true;
    this.costume = "big";
    this.goto(0, 350);
    this.costume = "boss";
    for (let i = 0; i < 75; i++) {
      this.y += (75 - this.y) / 15;
      yield;
    }
    yield* this.speak("you’ve made it far and wide young traveler…");
    yield* this.speak("but now it is time for you to feel true pain.");
    yield* this.speak("good luck, you’ll need it ;)");
    yield* this.wait(3);
    while (!(this.stage.vars.Bossbattle == "no")) {
      yield* this.wait(this.random(1, 10));
      if (this.stage.vars.Bossbattle == "yes") {
        yield* this.speak(this.vars.quotes[this.random(1, 4) - 1]);
      }
      yield;
    }
    this.stage.vars.Bossbattle = "no";
    this.visible = false;
  }

  *speak(dialogue2) {
    this.vars.dialogue = [];
    this.vars.i = 1;
    for (let i = 0; i < dialogue2.length; i++) {
      this.vars.dialogue.push(String(dialogue2)[this.vars.i - 1]);
      this.vars.i += 1;
      this.say(this.vars.dialogue.join(" "));
      yield* this.wait(0.03);
      if (
        String(dialogue2)[this.vars.i - 1 - 1] == "." ||
        String(dialogue2)[this.vars.i - 1 - 1] == "…"
      ) {
        yield* this.wait(1);
      }
      yield;
    }
    yield* this.wait(2);
    this.say("");
  }

  *whenIReceiveBossBattle2() {
    yield* this.wait(18);
    while (!(this.stage.vars.Bossbattle == "no")) {
      if (this.random(1, 2) == 1) {
        yield* this.shoot();
      } else {
        yield* this.zombies();
      }
      yield* this.wait(1);
      yield;
    }
  }

  *shoot() {
    for (let i = 0; i < 5; i++) {
      this.sprites["BossBullets"].createClone();
      yield* this.wait(0.25);
      yield;
    }
  }

  *zombies() {
    for (let i = 0; i < 10; i++) {
      this.sprites["Enemies"].createClone();
      yield;
    }
  }

  *whenIReceiveBossBattle3() {
    this.vars.hits = 0;
    yield* this.wait(18);
    while (!(this.stage.vars.Bossbattle == "no")) {
      if (
        this.touching(this.sprites["Box"].andClones()) ||
        this.touching(this.sprites["Bullet"].andClones()) ||
          this.touching(this.sprites["Explosions"].andClones()) || null
      ) {
        this.vars.hits += 1;
        this.effects.brightness = 100;
        yield* this.wait(0.25);
        this.effects.brightness = 0;
        if (this.vars.hits > 100) {
          this.broadcast("win!!!");
          this.stage.vars.Bossbattle = "no";
        }
      }
      yield;
    }
  }

  *whenIReceiveBossBattle4() {
    yield* this.wait(18);
    while (!(this.stage.vars.Bossbattle == "no")) {
      yield* this.wait(this.random(1, 10));
      this.vars.dir2 = this.random(180, -180);
      for (let i = 0; i < this.random(10, 135); i++) {
        this.direction = this.vars.dir2;
        this.move(1);
        if (this.touching("edge")) {
          this.move(-1);
        }
        this.direction = 90;
        yield;
      }
      yield;
    }
  }
}
