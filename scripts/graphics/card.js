function getCostSprite(scene, elements, x, y, value, colour) {
  const costBackground = scene.add.graphics();
  costBackground.fillStyle(colour, 1);
  costBackground.fillCircle(x, y, 8);
  const costText = scene.add.text(x, y, value, CIRCLE_NUM_STYLE).setOrigin(0.5);
  elements.push(costBackground, costText);
}

function getCardSprite(scene, data, x, y) {
  const width = 108;
  const height = 164;

  // const cardImg = scene.add.sprite(0, 0, 'card');
  const background = scene.add.graphics();
  background.fillStyle(0xffffff, 1);
  background.fillRoundedRect(-width / 2, 1 - height / 2, width, height, 10);
  background.lineStyle(1, 0x000000, 1);
  background.strokeRoundedRect(-width / 2, 1 - height / 2, width, height, 10);

  const image = scene.add.sprite(0, -13, data.img); 

  const detailY = 12 - height / 2;
  const headerY = 28 - height / 2;
  const cardName = scene.add.text(0, headerY, data.name, CARD_NAME_STYLE).setOrigin(0.5);

  const text = scene.add.text(10 - width / 2, 24, data.text || '', {
    fill: '#202030',
    fontFamily: 'Arial',
    fontSize: '11px',
    wordWrap: { width: width - 20 }
  });

  const elements = [background, image, cardName, text];

  getCostSprite(scene, elements, 12 - width / 2, detailY, data.cost, 0x51814f);
  
  if (data.time) {
    getCostSprite(scene, elements, width / 2 - 30, detailY, data.time, 0x416296);
  }
  if (data.power) {
    getCostSprite(scene, elements, width / 2 - 12, detailY, data.power, 0x8b4348);
  }

  const container = scene.add.container(x, y, elements);
  container.setSize(width, height);
  return container
}
