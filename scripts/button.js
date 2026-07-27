class Button extends Phaser.GameObjects.Container {
  constructor(
    scene,
    {
      x = 0,
      y = 0,
      width = 120,
      height = 32,
      radius = 10,
      text = "",
      trigger = () => {},
      backgroundColor = 0x3366ff,
      hoverColor = 0x5588ff,
      textStyle = {}
    } = {}
  ) {
    super(scene, x, y);

    this.buttonWidth = width;
    this.buttonHeight = height;
    this.radius = radius;
    this.backgroundColor = backgroundColor;
    this.hoverColor = hoverColor;
    this.trigger = trigger;

    this.background = scene.add.graphics();

    this.label = scene.add
      .text(0, 0, text, {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#ffffff",
        ...textStyle
      })
      .setOrigin(0.5);

    this.add([this.background, this.label]);

    // The Container origin is effectively its local 0,0 point,
    // so draw around that centre.
    this.drawBackground(this.backgroundColor);

    this.setSize(width, height);
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -width / 2,
        -height / 2,
        width,
        height
      ),
      Phaser.Geom.Rectangle.Contains
    );

    this.on("pointerover", () => {
      this.drawBackground(this.hoverColor);
      scene.input.setDefaultCursor("pointer");
    });

    this.on("pointerout", () => {
      this.drawBackground(this.backgroundColor);
      scene.input.setDefaultCursor("default");
    });

    this.on("pointerdown", () => {
      this.setScale(0.97);
    });

    this.on("pointerup", (pointer) => {
      this.setScale(1);
      this.trigger(pointer, this);
    });

    scene.add.existing(this);
  }

  drawBackground(color) {
    this.background.clear();

    this.background.fillStyle(color, 1);
    this.background.fillRoundedRect(
      -this.buttonWidth / 2,
      -this.buttonHeight / 2,
      this.buttonWidth,
      this.buttonHeight,
      this.radius
    );
  }

  setText(text) {
    this.label.setText(text);
    return this;
  }

  setEnabled(enabled) {
    if (enabled) {
      this.setInteractive();
      this.setAlpha(1);
    } else {
      this.disableInteractive();
      this.setAlpha(0.5);
    }

    return this;
  }

  hide() {
    this.setVisible(false);
  }

  show() {
    this.setVisible(true);
  }
}