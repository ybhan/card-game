export function addButtonRestart(scene) {
  const restartButton = scene.add.image(scene.game.config.width / 2,
    scene.game.config.height / 2, 'restart-button');
  restartButton.depth = 2;
  restartButton.setInteractive();
  restartButton.on('pointerover', () => { restartButton.tint = 0xCCCCCC });
  restartButton.on('pointerout', () => { restartButton.tint = 0xFFFFFF });
  restartButton.on('pointerup', () => {
    restartButton.tint = 0xFFFFFF;
    scene.scene.restart();
  });
}
