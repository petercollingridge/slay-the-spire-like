function getRandN(arr, n) {
  return Phaser.Utils.Array.Shuffle(arr).slice(0, n);
}

function getCardsToWin(n) {
  return getRandN(Object.keys(CARD_DATA).slice(), n);
}

function getMonstersToFight(n) {
  const allMonsters = ['minotaur', 'spikey', 'yeti', 'poisonDemon'];
  return getRandN(allMonsters, n);
}

function getCardValue(valueOrFunction, game) {
  if (typeof valueOrFunction === 'number') {
    return valueOrFunction;
  } else {
    return valueOrFunction(game);
  }
}