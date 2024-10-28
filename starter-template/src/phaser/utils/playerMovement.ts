
import Phaser from "phaser";

function handlePlayerMovement(
  player: Phaser.Physics.Arcade.Sprite,
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  xKey: Phaser.Input.Keyboard.Key
): void {
  const speed = 200;
  player.setVelocity(0);

  if (xKey.isDown) {
    player.anims.play("x", true);
  } else if (cursors.left?.isDown) {
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

export default handlePlayerMovement;
