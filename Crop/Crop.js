/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Crop extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("crop1", "./Crop/costumes/crop1.png", { x: 32, y: 32 }),
      new Costume("crop2", "./Crop/costumes/crop2.png", { x: 32, y: 32 }),
      new Costume("crop3", "./Crop/costumes/crop3.png", { x: 32, y: 32 })
    ];

    this.sounds = [new Sound("Meow", "./Crop/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.costume = "crop1";
    this.stage.vars.cash = 0;
    this.stage.vars.seeds = 1;
    yield* this.cropGeneration();
    yield* this.cropToMoney();
  }

  *cropGeneration() {
    for (let i = 0; i < 3; i++) {
      this.createClone();
      this.x += 45;
      yield;
    }
    yield* this.wait(0.1);
    this.goto(0, 0);
    for (let i = 0; i < 3; i++) {
      this.createClone();
      this.x -= 45;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 3; i++) {
      this.createClone();
      this.y += 45;
      yield;
    }
    yield* this.wait(0.1);
    this.goto(0, 0);
    for (let i = 0; i < 3; i++) {
      this.createClone();
      this.y -= 45;
      yield;
    }
    this.goto(0, 0);
    yield* this.diagonalGenerationXY45();
    this.goto(0, 0);
    yield* this.diagonalGenerationXYExtra();
    this.goto(0, 0);
  }

  *diagonalGenerationXY45() {
    for (let i = 0; i < 1; i++) {
      this.createClone();
      this.goto(45, 45);
      yield;
    }
    for (let i = 0; i < 1; i++) {
      this.createClone();
      this.goto(-45, 45);
      yield;
    }
    for (let i = 0; i < 1; i++) {
      this.createClone();
      this.goto(-45, -45);
      yield;
    }
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.goto(45, -45);
      yield;
    }
  }

  *diagonalGenerationXYExtra() {
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x += 90;
      this.y += 90;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x -= 90;
      this.y += 90;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x += 90;
      this.y -= 90;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x -= 90;
      this.y -= 90;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x += 90;
      this.y -= 45;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x -= 90;
      this.y -= 45;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x -= 90;
      this.y += 45;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x += 90;
      this.y += 45;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x += 45;
      this.y += 90;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x -= 45;
      this.y += 90;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x -= 45;
      this.y -= 90;
      yield;
    }
    this.goto(0, 0);
    for (let i = 0; i < 2; i++) {
      this.createClone();
      this.x += 45;
      this.y -= 90;
      yield;
    }
  }

  *whenthisspriteclicked() {
    if (this.compare(this.stage.vars.seeds, 0) < 0) {
      this.costume = "crop1";
    }
    if (
      this.compare(this.stage.vars.seeds, 1) > 0 ||
      this.toNumber(this.stage.vars.seeds) === 1
    ) {
      this.costume = "crop2";
      this.stage.vars.seeds--;
      yield* this.wait(2);
      this.costume = "crop3";
    }
  }

  *cropToMoney() {
    if (this.costume.name === "crop3" && this.mouse.down) {
      this.costume = "crop1";
      this.stage.vars.cash += 2;
    }
  }
}
