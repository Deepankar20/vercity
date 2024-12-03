// src/components/PhaserGame.tsx
import { useEffect, useRef } from "react";
import Phaser from "phaser";
import config from "../config";
import { useSocket } from "@/context/SocketContext";
import MainScene from "../scenes/Mainscene"; 

const PhaserGame: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const { newPlayer } = useSocket();

  useEffect(() => {
    if (typeof window === "undefined" || !gameRef.current) return;

    const game = new Phaser.Game({ ...config, parent: gameRef.current });

    return () => {
      game.destroy(true); // Clean up the game instance on unmount
    };
  }, []);

  useEffect(() => {
    

  }, [newPlayer]);

  return <div ref={gameRef} style={{ width: "100%", height: "100%" }} />;
};

export default PhaserGame;
