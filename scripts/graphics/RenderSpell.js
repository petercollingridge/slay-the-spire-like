// Class to handle rendering of a spell on a character.

class RenderSpell {
  constructor(scene, spell, targetView) {
    this.scene = scene;
    this.spell = spell;
    this.targetView = targetView;

    this.card = spell.card;
    this.energy = spell.cost;

    this._create_graphics();
    this.moveTo(this._getY());
      
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
    const w2 = SPELL_WIDTH / 2;
    const h2 = SPELL_HEIGHT / 2;

    const background = this.scene.add.graphics();
    const colour = this.spell.type === 'boon' ? 0xffffff : 0xffa0b0;
    const startY = this.spell.type === 'boon' ? HEIGHT + SPELL_HEIGHT : -SPELL_HEIGHT;
    
    background.fillStyle(colour, 1);
    background.fillRoundedRect(-w2, 1 - h2, SPELL_WIDTH, SPELL_HEIGHT, 5);
    background.lineStyle(1, 0x000000, 1);
    background.strokeRoundedRect(-w2, 1 - h2, SPELL_WIDTH, SPELL_HEIGHT, 5);

    const { img, time, power } = this.card.data;
    const image = this.scene.add.sprite(12 - w2, 1, img).setScale(0.28);
    // const cardName = scene.add.text(24 - w2, 2, data.name, CARD_NAME_STYLE).setOrigin(0, 0.5);

    this.timeSprite = new PropertySprite(this.scene, w2 - 27, 1, time, 0x416296);
    this.powerSprite = new PropertySprite(this.scene, w2 - 10, 1, power, 0x8b4348);

    const elements = [background, image, this.timeSprite, this.powerSprite];
    this.container = this.scene.add.container(this.targetView.x, startY, elements);
    this.container.setSize(SPELL_WIDTH, SPELL_HEIGHT);
  }

  _getY() {
    const target = this.spell.target;
    const index = target.enchantments.indexOf(this.spell);
    return this.targetView.y + this.targetView.img.displayHeight / 2 - (index + 0.5) * 25;
  }

  updatePosition() {
    const y = this._getY();
    this.moveTo(y);
  }

  moveTo(y) {
    this.scene.tweens.add({
      targets: this.container,
      y,
      duration: 240,
      ease: 'Sine.easeOut',
    });
  }
}
