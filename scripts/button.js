class Button {
  constructor(game, x, y, txt, onClick) {
    this.container = game.add.container(x, y);

    // Create the background for the button
    this.background = game.add.sprite(0, 0, 'button');
    this.background.setOrigin(0.5, 0.5);

    // Create text for the button
    const buttonText = game.add.text(0, 0, txt, {
      fill: '#111',
      fontFamily: 'Arial',
      fontSize: '20px',
    });
    buttonText.setOrigin(0.5, 0.5);

    // Add the background and text to the button container
    this.container.add([this.background, buttonText]);

    // Make the button interactive
    this.container.setSize(this.background.width, this.background.height);
    this.container.setInteractive({ useHandCursor: true });

    // Set up event listeners for the button
    this.container.on('pointerover', () => {
      this.background.setTint(0xaaccff);
    });

    this.container.on('pointerout', () => {
      this.background.clearTint();
    });

    let pressed = false;
    this.container.on('pointerdown', () => {
      pressed = true;
    });

    this.container.on('pointerup', () => {
      if (pressed && onClick) {
        onClick();
      }
      pressed = false;
    });
  }

  enable() {
    this.background.clearTint();
    this.container.setInteractive({ useHandCursor: true });
  }

  disable() {
    this.background.setTint(0x707070);
    this.container.disableInteractive();
  }
}