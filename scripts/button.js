class Button {
  constructor(game, x, y, txt, onClick) {
    const button = game.add.container(x, y);

    // Create the background for the button
    const buttonBackground = game.add.sprite(0, 0, 'button');
    buttonBackground.setOrigin(0.5, 0.5);

    // Create text for the button
    const buttonText = game.add.text(0, 0, txt, {
      fill: '#111',
      fontFamily: 'Arial',
      fontSize: '20px',
    });
    buttonText.setOrigin(0.5, 0.5);

    // Add the background and text to the button container
    button.add([buttonBackground, buttonText]);

    // Make the button interactive
    button.setSize(buttonBackground.width, buttonBackground.height);
    button.setInteractive();

    // Set up event listeners for the button
    button.on('pointerover', () => {
        buttonBackground.setTint(0xaaccff);
    });

    button.on('pointerout', () => {
        buttonBackground.clearTint();
    });

    let pressed = false;
    button.on('pointerdown', () => {
      pressed = true;
    });

    button.on('pointerup', () => {
      if (pressed && onClick) {
        onClick();
      }
      pressed = false;
    });
  }
}