class Enchantment {
  constructor(scene, x, y, card) {
    const { name, energy } = card.data;
    this.energy = energy;

    const cardImg = scene.add.sprite(0, 0, 'card-small');
    const image = scene.add.sprite(cardImg.width / 2 - 13, 0, card.data.img).setScale(0.3);
    
    const cardName = scene.add.text(0, 0, name, CARD_NAME_STYLE).setOrigin(0.5);
    this.energyImg = scene.add.text(13 - cardImg.width / 2, 1, energy, CIRCLE_NUM_STYLE).setOrigin(0.5);

    scene.add.container(x, y, [cardImg, image, this.energyImg, cardName]);
  }

  setValue(value) {
    this.energy = value;
    this.energyImg.setText(value);
  }
}
