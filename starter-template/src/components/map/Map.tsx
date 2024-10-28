import { useEffect, useRef } from "react";
import Phaser from "phaser";

const PhaserGame: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !gameRef.current) return;

    // Phaser configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: gameRef.current,
      scene: {
        preload,
        create,
      },
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
    };

    // Initialize the Phaser game instance
    const game = new Phaser.Game(config);

    // Preload assets
    function preload(this: Phaser.Scene) {
      this.load.image("background", "/assets/bg1.png"); // Load the map background
      this.load.spritesheet("character", "/assets/NPC11.png", {
        frameWidth: 32,
        frameHeight: 64,
      });
    }

    // Create game objects
    function create(this: Phaser.Scene) {
      // Add the background image
      const { width, height } = this.scale;
      this.add.image(width / 2, height / 2, "background"); // Position in the center

      // Add player character
      const player = this.physics.add.sprite(400, 300, "character");
      
      player.setCollideWorldBounds(true);

      // Define animations for character movement
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

      // Set up cursor keys for movement
      let cursors: any;
      let xKey: any;
      if (this.input.keyboard) {
        cursors = this.input.keyboard.createCursorKeys();
        xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      }

      this.events.on("update", () =>
        handlePlayerMovement(player, cursors, xKey),
      );
    }

    // Update loop to handle player movement
    function handlePlayerMovement(
      player: Phaser.Physics.Arcade.Sprite,
      cursors: Phaser.Types.Input.Keyboard.CursorKeys,
      xKey: any,
    ): void {
      const speed = 200;
      player.setVelocity(0);
  

      if (xKey.isDown) {
        player.anims.play("x", true);
      }
      if (cursors.left?.isDown) {
        player.setVelocityX(-speed);
        player.anims.play("left", true);
      } else if (cursors.right?.isDown) {
        player.setVelocityX(speed);
        player.anims.play("right", true);
      } else if (cursors.up?.isDown) {
        player.setVelocityY(-speed);
        player.anims.play("up", true);
      } else if (cursors.down?.isDown) {
        player.setVelocityY(speed);
        player.anims.play("down", true);
      } else {
        player.anims.stop();
      }
    }

    return () => {
      game.destroy(true); // Clean up the game instance on unmount
    };
  }, []);

  return <div ref={gameRef} style={{ width: "100%", height: "100%" }} />;
};

export default PhaserGame;
