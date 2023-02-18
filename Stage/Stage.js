/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("grass", "./Stage/costumes/grass.svg", {
        x: 281.399995,
        y: 194.100005
      }),
      new Costume("bg", "./Stage/costumes/bg.svg", {
        x: 281.399995,
        y: 194.099985
      })
    ];

    this.sounds = [];

    this.triggers = [];

    this.vars.speedX = 0;
    this.vars.speedY = 0;
    this.vars.offset = -110;
    this.vars.attacking = 0;
    this.vars.vel = 0;
    this.vars.particlesX = -93.85041690652744;
    this.vars.particlesY = 170.3586417637706;
    this.vars.timeDelay = 1;
    this.vars.play = 0;
    this.vars.Score = 0;
    this.vars.levelUp = 1;
    this.vars.pause = "no";
    this.vars.lives = 3;
    this.vars.Timesopened = 0;
    this.vars.Music = 100;
    this.vars.Fx = 100;
    this.vars.Latest = 0;
    this.vars.Best = 0;
    this.vars.Bossbattle = 0;
    this.vars.Wr = 139000;
    this.vars.currentUpgrades = [];
    this.vars.upgradesList = [0, 0, 0, 0, 0, 0];
  }
}
