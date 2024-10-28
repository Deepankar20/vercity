// src/phaser/config.ts
import Phaser from "phaser";
import MainScene from "./scenes/Mainscene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#028af8",
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

export default config;
