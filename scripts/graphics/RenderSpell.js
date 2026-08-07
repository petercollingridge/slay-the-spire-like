// Class to handle rendering of a spell on a character.

class RenderSpell {
  constructor(scene, spell) {
    this.scene = scene;
    this.spell = spell;
    this.target = spell.target.view;

    this.card = spell.card;
    this.energy = spell.cost;

    this._create_graphics();
    this.updatePosition();
      
    spell.on("updateTime", (value) => {
      this.timeSprite.setValue(value.toString());
    });
    spell.on("updatePower", (value) => {
      this.powerSprite.setValue(value.toString());
    });

    spell.on("remove", () => {
      this.container.destroy();
    });
  }

  _create_graphics() {
    // Temporary constants for spell graphics
    const SPELL_WIDTH = 24;
    const SPELL_HEIGHT = 66;

    const w2 = SPELL_WIDTH / 2;
    const h2 = SPELL_HEIGHT / 2;
    const cornerR = 12;

    const background = this.scene.add.graphics();
    const colour = this.spell.type === 'boon' ? 0xffffff : 0xffa0b0;
    const startY = this.spell.type === 'boon' ? HEIGHT + SPELL_HEIGHT : -SPELL_HEIGHT;

    background.fillStyle(colour, 1);
    background.fillRoundedRect(-w2, 1 - h2, SPELL_WIDTH, SPELL_HEIGHT, cornerR);
    background.lineStyle(1, 0x000000, 0.9);
    background.strokeRoundedRect(-w2 + 0.5, 1 - h2, SPELL_WIDTH, SPELL_HEIGHT, cornerR);

    const { img, time, power } = this.card.data;
    const image = this.scene.add.sprite(12 - w2, 1, img).setScale(0.28);
    // const cardName = scene.add.text(24 - w2, 2, data.name, CARD_NAME_STYLE).setOrigin(0, 0.5);

    this.x = this.target.x + (this.target.img.displayWidth / 2 + 16) * this.target.direction;
    this.y = this.target.y;
    this.timeSprite = new PropertySprite(this.scene, w2 - 12, 12 - h2, time, 0x416296);
    this.powerSprite = new PropertySprite(this.scene, w2 - 12, h2 - 10, power, 0x8b4348);

    const elements = [background, image, this.timeSprite, this.powerSprite];

    const startX = this.spell.source.view.x + this.spell.source.view.img.displayWidth * 0.4 * this.spell.source.view.direction;
    this.container = this.scene.add.container(startX, this.y , elements);
    this.container.setSize(SPELL_WIDTH, SPELL_HEIGHT);

    this.container.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, SPELL_WIDTH, SPELL_HEIGHT),
      Phaser.Geom.Rectangle.Contains
    );

    this.container.on('pointerover', () => this.showCard());
    this.container.on('pointerout', () => this.hideCard());
  }

  _getX(offset = 0) {
    const index = this.spell.target.enchantments.indexOf(this.spell);
    return this.x + this.target.direction * (index + offset) * 27;
  }
  _getY() {
    const target = this.spell.target;
    const index = target.enchantments.indexOf(this.spell);
    return this.target.y + this.target.img.displayHeight / 2 - (index + 0.5) * 25;
  }

  showCard() {
    this.mouseOverCard = getCardSprite(this.scene, this.card.data, this.x + CARD_WIDTH / 2 + 20, this.y);
  }

  hideCard() {
    if (this.mouseOverCard) {
      this.mouseOverCard.destroy();
      this.mouseOverCard = null;
    }
  }

  updatePosition() {
    this.moveTo(this._getX(), this.y);
  }

  moveTo(x, y) {
    this.scene.tweens.add({
      targets: this.container,
      x, y,
      duration: 240,
      ease: 'Sine.easeOut',
    });
  }
}
