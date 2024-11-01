import dynamic from "next/dynamic";

const PhaserGame = dynamic(() => import("../phaser/components/Main"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1>My Phaser Game</h1>
      <PhaserGame />
    </div>
  );
}
