import { useSocket } from "@/context/SocketContext";
import dynamic from "next/dynamic";

const PhaserGame = dynamic(() => import("../phaser/components/Main"), {
  ssr: false,
});

export default function Home() {
  const { playerJoin, newPlayer } = useSocket();
  console.log("Joined players : ",newPlayer);

  return (
    <div>
      <h1>My Phaser Game</h1>
      <button
        onClick={() => playerJoin({ name: `${new Date()}`, room: "1", avatar: "NPC11" })}
      >
        Join
      </button>
      <PhaserGame />
    </div>
  );
}
