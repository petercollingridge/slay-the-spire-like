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

function removeFromArray(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

// Convert a given value into a numerical value
function getCardValue(givenValue, spell) {
  if (typeof givenValue === 'number') {
    return givenValue;
  } else if (typeof givenValue === 'string') {
    // e.g. "power" - get the value from the spell object
    if (givenValue[0] === '-') {
      return -spell[givenValue.slice(1)];
    }
    return spell[givenValue];
  } else {
    return givenValue(spell);
  }
}
