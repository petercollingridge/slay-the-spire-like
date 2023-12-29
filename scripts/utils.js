function getCardsToWin() {
  const cards = Phaser.Utils.Array.Shuffle(Object.keys(CARD_DATA).slice()).slice(0, 3);
  return cards;
}

function getCardValue(valueOrFunction, game) {
  if (typeof valueOrFunction === 'number') {
    return valueOrFunction;
  } else {
    return valueOrFunction(game);
  }
}