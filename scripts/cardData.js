const CARD_DATA = {
  'Gentle prod': {
    img: 'sword-1',
    effect: { damage: 1 }
  },
  'Strike': {
    img: 'sword-2',
    effect: { damage: 2 },
  },
  'Mighty slash': {
    img: 'sword-3',
    effect: { damage: 3 },
  },
  'Ultimate smash': {
    img: 'sword-4',
    effect: { damage: 5 },
  },
  'Poison blade': {
    img: 'sword-poison',
    effect: { damage: 2, poison: 1 },
  },
  'Arcane sword': {
    img: 'sword-magic',
    effect: {
      damage: (game) => game.hand.cards.length
    },
  },
  'Drain life': {
    img: 'fangs',
    effect: { damage: 2, heal: 2 },
  },
  'Prepare': {
    img: 'draw-card',
    effect: { draw: 3 },
  },
  'Heal': {
    img: 'heart',
    effect: { heal: 8 },
  },
  'Shield': {
    img: 'shield',
    effect: { shield: 4 },
  },
  'Magic shield': {
    img: 'magic-shield',
    effect: { shield: 8 },
  },
  'Store magic': {
    img: 'potion',
    effect: { store: 1 },
  }
};

const startingDeck = {
  'Gentle prod': 3,
  'Strike': 2,
  'Mighty slash': 2,
  'Prepare': 1,
  'Heal': 1,
  'Shield': 1,
};
