function capitalise(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function getRand(arr) {
  return Phaser.Utils.Array.GetRandom(arr);
}

function getRandN(arr, n) {
  return Phaser.Utils.Array.Shuffle(arr).slice(0, n);
}

function getCardValue(valueOrFunction, game) {
  if (typeof valueOrFunction === 'number') {
    return valueOrFunction;
  } else {
    return valueOrFunction(game);
  }
}