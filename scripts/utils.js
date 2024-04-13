// COnvert a dict mapping action name to value, into a string showing all the action - value pairs
function actionToString(action) {
  return Object.entries(action).map(([key, value]) => `${capitalise(key)}: ${value}`).join('; ');
}

function capitalise(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function getRand(arr) {
  return Phaser.Utils.Array.GetRandom(arr);
}

function getRandN(arr, n) {
  return Phaser.Utils.Array.Shuffle(arr).slice(0, n);
}

function getCardValue(valueOrFunction, game, target) {
  if (typeof valueOrFunction === 'number') {
    return valueOrFunction;
  } else {
    return valueOrFunction(game, target);
  }
}