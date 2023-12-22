class Icon {
  constructor(game, x, y, img, value) {
    const txtStyle = { fontSize: '18px', fill: '#000' };
    const icon = game.add.image(x, y, img);
    icon.displayWidth = 20;
    icon.displayHeight = 20;
    this.txt = game.add.text(x + 12, y, value, txtStyle).setOrigin(0, 0.5);
  }

  setValue(x) {
    this.txt.setText(x);
  }
}
