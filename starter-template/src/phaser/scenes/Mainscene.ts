// src/phaser/scenes/MainScene.ts
import Phaser from "phaser";
import handlePlayerMovement from "../utils/playerMovement";



class MainScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private xKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("background", "/assets/bg1.png");
    this.load.spritesheet("character", "/assets/NPC11.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create() {
    const { width, height } = this.scale;
   
    this.add.image(width / 2, height / 2, "background");

    this.player = this.physics.add.sprite(0, 0, "character");

    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("character", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("character", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("character", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("character", {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "x",
      frames: this.anims.generateFrameNumbers("character", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.xKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.X);
  }

  update() {
    handlePlayerMovement(this.player, this.cursors, this.xKey);
  }

  addPlayers(){

  }
}

export default MainScene;
