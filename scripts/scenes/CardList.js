// TODO: Scrolling if there are too many cards to fit in the list

class CardListItem {
  constructor(scene, index, parent, name, count, coords) {
    this.scene = scene;
    this.index = index;
    this.parent = parent;
    this.card = new Card(scene, name);
    this.count = count;
    this.coords = coords;
    this.selected = false;

    // Create a container for the card and its background
    this.container = scene.add.container(coords.mx, coords.my);
    this.container.setSize(coords.w, coords.h);
    this.container.setInteractive({ useHandCursor: true });

    this.background = scene.add.graphics();
    this._updateBackground(0xffffff); // Light grey background

    this.countText = this.scene.add.text(8 - coords.w / 2, 0, count, CARD_NAME_STYLE).setOrigin(0, 0.5);
    const cardName = this.scene.add.text(20 - coords.w / 2, 0, this.card.data.name, CARD_NAME_STYLE).setOrigin(0, 0.5);
    const rarityText = RARITY_LETTERS[this.card.data.rarity - 1];
    const cardRarity = this.scene.add.text(coords.w / 2 - 8, 0, rarityText, CARD_NAME_STYLE).setOrigin(1, 0.5);
    this.container.add([this.background, this.countText, cardName, cardRarity]);

    // Change background color on hover
    this.container.on('pointerover', () => {
      this._updateBackground(0xaaccff);
    });

    this.container.on('pointerout', () => {
      if (!this.selected) {
        this._updateBackground(0xffffff);
      }
    });

    this.container.on('pointerup', () => {
      this.parent.selectItem(this.index);
    });
  }

  _updateBackground(colour) {
    this.background.clear();
    this.background.fillStyle(colour, 0.8);
    this.background.fillRect(-this.coords.w / 2, -this.coords.h / 2, this.coords.w, this.coords.h);
  };

  deselect() {
    this.selected = false;
    this._updateBackground(0xffffff);
  }

  select() {
    this.selected = true;
    this._updateBackground(0xaaccff);
  }

  updateCount(count) {
    this.count = count;
    this.countText.setText(count);
  }
}

class CardList {
  constructor(scene, name, x, y, width, height) {
    this.scene = scene;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x2 = x + width;
    this.y2 = y + height;
    this.margin = 10;

    this.items = [];
    this.itemHeight = 20;
    this.itemWidth = width - 2 * this.margin;
    this.selectedItemIndex = null;

    // Light grey background
    const background = scene.add.graphics();
    background.fillStyle(0xffffff, 0.8);
    background.fillRect(x, y + 20, width, height - 20);

    // Add title text
    this.title = scene.add.text(x + width / 2, y, '', OPTION_STYLE).setOrigin(0.5);
    this._updateTitle();
  }

  _addItem(name, count, index) {
      const containerProps = this._getContainerCoords(index);
      const item = new CardListItem(this.scene, index, this, name, count, containerProps);
      this.items.push(item);
  }

  _getContainerCoords(index) {
    const x = this.x + this.margin;
    const y = this.y + this.margin + 20 + index * (this.itemHeight + 2);
    const w = this.itemWidth;
    const h = this.itemHeight;
    const mx = x + w / 2
    const my = y + h / 2;
    return { x, y, w, h, mx, my };
  }

  _updateListPositions() {
    this.items.forEach((item, index) => {
      const { mx, my } = this._getContainerCoords(index);
      item.container.setPosition(mx, my);
      item.index = index;
    });
  }

  _updateTitle() {
    const count = this.items.reduce((sum, item) => sum + item.count, 0);
    const titleText = `${this.name} (${count})`;
    this.title.setText(titleText);
  }

  addItems(cardCounts) {
    Object.entries(cardCounts).forEach(([name, count], index) => {
      this._addItem(name, count, index);
    });

    this._updateTitle();
  }

  selectItem(index) {
    if (index < 0 || index >= this.items.length) {
      return;
    }

    if (this.selectedItemIndex !== null && this.selectedItemIndex !== index) {
      // Deselect the previously selected item
      this.items[this.selectedItemIndex].deselect();
    }

    this.selectedItemIndex = index;
    this.items[index].select();
    this.scene.selectCard(this.name, this.items[index].card);
  }

  deselectItem() {
    if (this.selectedItemIndex !== null) {
      this.items[this.selectedItemIndex].deselect();
      this.selectedItemIndex = null;
    }
  }

  addItem(card) {
    if (!card) {
      return;
    }

    const cardName = card.data.name;
    const existingItem = this.items.find(item => item.card.data.name === cardName);
    if (existingItem) {
      // If the card already exists in the list, increment its count
      const newCount = parseInt(existingItem.count) + 1;
      existingItem.updateCount(newCount);
    } else {
      this._addItem(cardName, 1, this.items.length);
    }
    this._updateTitle();
  }

  removeSelectedItem() {
    if (this.selectedItemIndex === null) {
      return;
    }

    const item = this.items[this.selectedItemIndex];
    if (item.count > 1) {
      // If the count is greater than 1, decrement the count
      const newCount = parseInt(item.count) - 1;
      item.updateCount(newCount);
    } else {
      // If the count is 1, remove the item from the list
      this.items[this.selectedItemIndex].container.destroy();
      this.items.splice(this.selectedItemIndex, 1);
      this._updateListPositions();

      if (this.selectedItemIndex >= this.items.length) {
        this.selectedItemIndex = this.items.length - 1;
      }

      if (this.selectedItemIndex === -1) {
        this.scene.deselectCard();
      } else {
        this.selectItem(this.selectedItemIndex);
      }

    }
    this._updateTitle();
  }

};