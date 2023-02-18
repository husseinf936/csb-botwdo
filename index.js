import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Bat from "./Bat/Bat.js";
import Box from "./Box/Box.js";
import Enemies from "./Enemies/Enemies.js";
import Crosshair from "./Crosshair/Crosshair.js";
import Bullet from "./Bullet/Bullet.js";
import Menu from "./Menu/Menu.js";
import Particles from "./Particles/Particles.js";
import Counters from "./Counters/Counters.js";
import Level from "./Level/Level.js";
import Hearts from "./Hearts/Hearts.js";
import Flash from "./Flash/Flash.js";
import Settings from "./Settings/Settings.js";
import Music2 from "./Music2/Music2.js";
import Upgrades from "./Upgrades/Upgrades.js";
import Thumb from "./Thumb/Thumb.js";
import Explosions from "./Explosions/Explosions.js";
import Banana from "./Banana/Banana.js";
import Boss from "./Boss/Boss.js";
import BossBullets from "./BossBullets/BossBullets.js";
import Debug from "./Debug/Debug.js";
import UpgradeLabels from "./UpgradeLabels/UpgradeLabels.js";
import Intro from "./Intro/Intro.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Player: new Player({
    x: 0,
    y: -100,
    direction: -32.59020020085329,
    costumeNumber: 1,
    size: 250,
    visible: true,
    layerOrder: 1
  }),
  Bat: new Bat({
    x: -15.187792663274763,
    y: -119.85776810261862,
    direction: 162.4097997991467,
    costumeNumber: 2,
    size: 250,
    visible: true,
    layerOrder: 2
  }),
  Box: new Box({
    x: 0,
    y: 0,
    direction: -117.04796318690484,
    costumeNumber: 1,
    size: 250,
    visible: true,
    layerOrder: 3
  }),
  Enemies: new Enemies({
    x: -180.5535811144963,
    y: 232.59870205301922,
    direction: 151.50436138175502,
    costumeNumber: 1,
    size: 250,
    visible: true,
    layerOrder: 4
  }),
  Crosshair: new Crosshair({
    x: -179,
    y: 180,
    direction: 33,
    costumeNumber: 1,
    size: 240,
    visible: true,
    layerOrder: 22
  }),
  Bullet: new Bullet({
    x: 12.152731220654964,
    y: 132.16028769469136,
    direction: 90,
    costumeNumber: 1,
    size: 250,
    visible: false,
    layerOrder: 5
  }),
  Menu: new Menu({
    x: 0,
    y: 100,
    direction: 88.7797900707,
    costumeNumber: 4,
    size: 100,
    visible: true,
    layerOrder: 6
  }),
  Particles: new Particles({
    x: -93.85041690652744,
    y: 170.3586417637706,
    direction: 90,
    costumeNumber: 1,
    size: 231.5298839218106,
    visible: false,
    layerOrder: 7
  }),
  Counters: new Counters({
    x: 217.60000000000005,
    y: -170,
    direction: 90,
    costumeNumber: 10,
    size: 35,
    visible: false,
    layerOrder: 8
  }),
  Level: new Level({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 9
  }),
  Hearts: new Hearts({
    x: 0,
    y: 0.9411764705882342,
    direction: 90,
    costumeNumber: 3,
    size: 250,
    visible: false,
    layerOrder: 10
  }),
  Flash: new Flash({
    x: 73.10886937284154,
    y: -132.94398810088686,
    direction: 42.31215984614477,
    costumeNumber: 1,
    size: 250,
    visible: false,
    layerOrder: 19
  }),
  Settings: new Settings({
    x: -225,
    y: 165,
    direction: 90,
    costumeNumber: 4,
    size: 548.2000000000443,
    visible: true,
    layerOrder: 11
  }),
  Music2: new Music2({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 12
  }),
  Upgrades: new Upgrades({
    x: 1,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 200,
    visible: false,
    layerOrder: 13
  }),
  Thumb: new Thumb({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 23
  }),
  Explosions: new Explosions({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 386,
    visible: false,
    layerOrder: 14
  }),
  Banana: new Banana({
    x: 106.69316479514036,
    y: 135.70536904206932,
    direction: -125.00000000000009,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 15
  }),
  Boss: new Boss({
    x: 4.195381774522934,
    y: 136.19991343759597,
    direction: 90,
    costumeNumber: 1,
    size: 250,
    visible: false,
    layerOrder: 16
  }),
  BossBullets: new BossBullets({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 250,
    visible: false,
    layerOrder: 17
  }),
  Debug: new Debug({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 20
  }),
  UpgradeLabels: new UpgradeLabels({
    x: 130,
    y: -72,
    direction: 90,
    costumeNumber: 3,
    size: 35,
    visible: false,
    layerOrder: 18
  }),
  Intro: new Intro({
    x: 0,
    y: 0,
    direction: 89.98168600858381,
    costumeNumber: 1,
    size: 99.5,
    visible: false,
    layerOrder: 21
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
