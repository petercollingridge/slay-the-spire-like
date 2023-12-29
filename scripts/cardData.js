const CARD_DATA = {
  'Gentle prod': {
    img: 'sword-1',
    effect: { damage: 1 },
    text: 'Deal 1 damage',
  },
  'Strike': {
    img: 'sword-2',
    effect: { damage: 2 },
    text: 'Deal 2 damage',
  },
  'Mighty slash': {
    img: 'sword-3',
    effect: { damage: 3 },
    text: 'Deal 3 damage',
  },
  'Ultimate smash': {
    img: 'sword-4',
    effect: { damage: 5 },
    text: 'Deal 5 damage',
  },
  'Poison blade': {
    img: 'sword-poison',
    effect: { damage: 2, poison: 1 },
    text: 'Deal 2 damage and inflict 1 poison.',
  },
  'Arcane sword': {
    img: 'sword-magic',
    effect: {
      damage: (game) => game.hand.cards.length
    },
    text: 'Deal 1 damage for each card in hand.'
  },
  'Drain life': {
    img: 'fangs',
    effect: { damage: 2, heal: 2 },
    text: 'Deal 2 damage and heal 2.',
  },
  'Prepare': {
    img: 'draw-card',
    effect: { draw: 3 },
    text: 'Draw 3 cards.',
  },
  'Heal': {
    img: 'heart',
    effect: { heal: 8 },
    text: 'Heal 8.',
  },
  'Shield': {
    img: 'shield',
    effect: { shield: 4 },
    text: 'Shield 4.',
  },
  'Magic shield': {
    img: 'magic-shield',
    effect: {
      shield: (game) => game.hand.cards.length
    },
    text: 'Shield 1 for each card in hand.'
  },
  'Store magic': {
    img: 'potion',
    effect: { store: 1 },
    text: 'Gain 1 mana next turn.'
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
