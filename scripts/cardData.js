const CARD_DATA = {
  'Gentle prod': {
    img: 'sword-1',
    effect: { damage: 1 },
    text: 'Deal 1 damage.',
  },
  'Strike': {
    img: 'sword-2',
    effect: { damage: 2 },
    text: 'Deal 2 damage.',
  },
  'Mighty slash': {
    img: 'sword-3',
    effect: { damage: 3 },
    text: 'Deal 3 damage.',
  },
  'Ultimate smash': {
    img: 'sword-4',
    effect: { damage: 5 },
    text: 'Deal 5 damage.',
  },
  'Poison blade': {
    img: 'sword-poison',
    effect: { damage: 2, poison: 1 },
    text: 'Deal 2 damage and inflict 1 poison.',
  },
  'Toxic bloom': {
    img: 'poison-mushroom',
    effect: { poison: (card) => card.game.enemy.poisonAmount },
    text: 'Double the poison on an enemy.',
  },
  'Fever': {
    img: 'sickness',
    effect: {
      damage: (card) => 3 * card.game.enemy.poisonAmount,
      poison: -1
    },
    text: 'Deal 3 damage for every poison. Remove 1 poison.',
  },
  'Arcane sword': {
    img: 'sword-magic',
    effect: {
      damage: (card) => card.game.hand.cards.length
    },
    text: 'Deal 1 damage for each card in hand.'
  },
  'Scythe': {
    img: 'scythe',
    effect: {
      damage: (card) => card.game.discard.cards.length
    },
    text: 'Deal 1 damage for each card in the discard pile.'
  },
  'Blade vortex': {
    img: 'sword-spinning',
    effect: {
      damage: (card) => card.castCount * 2
    },
    text: 'Deal 2 damage for each time this card has been cast.'
  },
  'Quick shot': {
    img: 'arrow-1',
    effect: { damage: 2, draw: 1 },
    text: 'Deal 2 damage and draw a card.'
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
    img: 'shield-magic',
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

// const startingDeck = {
//   'Gentle prod': 3,
//   'Strike': 2,
//   'Mighty slash': 2,
//   'Prepare': 1,
//   'Heal': 1,
//   'Shield': 1,
// };

const startingDeck = {
  'Poison blade': 3,
  'Toxic bloom': 1,
  'Fever': 1,
  'Mighty slash': 2,
  'Prepare': 1,
  'Heal': 1,
  'Shield': 1,
};