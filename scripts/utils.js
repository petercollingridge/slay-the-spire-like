// COnvert a dict mapping action name to value, into a string showing all the action - value pairs
function actionToString(action) {
  return Object.entries(action).map(([key, value]) => `${capitalise(key)}: ${value}`).join('; ');
}

function capitalise(str) {
  return str[0].toUpperCase() + str.slice(1);
}

// Convert an object mapping card name to count, into an array of card names
function convertCountsToList(cardCounts) {
  const cardList = [];
  Object.entries(cardCounts).forEach(([name, count]) => {
    for (let i = 0; i < count; i++) {
      cardList.push(name);
    }
  });
  return cardList;
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

function shuffleArray(arr) {
  return Phaser.Utils.Array.Shuffle(arr);
}

// Convert a given value into a numerical value
function getCardValue(givenValue, spell) {
  if (!givenValue) {
    return 0;
  }
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
