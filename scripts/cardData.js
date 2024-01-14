const CARD_DATA = {
  'Gentle prod': {
    img: 'sword-1',
    text: 'Deal 1 damage.',
    effect: { damage: 1 },
    target: 'enemy',
  },
  'Strike': {
    img: 'sword-2',
    text: 'Deal 2 damage.',
    effect: { damage: 2 },
    target: 'enemy',
  },
  'Mighty slash': {
    img: 'sword-3',
    text: 'Deal 3 damage.',
    effect: { damage: 3 },
    target: 'enemy',
  },
  'Ultimate smash': {
    img: 'sword-4',
    text: 'Deal 5 damage.',
    effect: { damage: 5 },
    target: 'enemy',
  },
  'Poison blade': {
    img: 'sword-poison',
    text: 'Deal 2 damage and inflict 1 poison.',
    effect: { damage: 2, poison: 1 },
    target: 'enemy',
  },
  'Toxic bloom': {
    img: 'poison-mushroom',
    text: 'Double the poison on an enemy.',
    effect: { poison: (card) => card.game.enemy.poisonAmount },
    target: 'enemy',
    oneUse: true,
  },
  'Fever': {
    img: 'sickness',
    text: 'Deal 2 damage for every poison. Remove 1 poison.',
    effect: {
      damage: (card) => 2 * card.game.enemy.poisonAmount,
      poison: -1
    },
    target: 'enemy',
  },
  'Arcane sword': {
    img: 'sword-magic',
    text: 'Deal 2 damage for each card in hand.',
    effect: {
      damage: (card) => 2 * card.game.hand.cards.length
    },
    target: 'enemy',
  },
  'Scythe': {
    img: 'scythe',
    text: 'Deal 1 damage for each card in the discard pile.',
    effect: {
      damage: (card) => card.game.discard.cards.length
    },
    target: 'enemy',
  },
  'Blade vortex': {
    img: 'sword-spinning',
    text: 'Deal 2 damage for each time this card has been cast.',
    effect: {
      damage: (card) => card.castCount * 2
    },
    target: 'enemy',
  },
  'Quick shot': {
    img: 'arrow-1',
    text: 'Deal 2 damage and draw a card.',
    effect: { damage: 2, draw: 1 },
    target: 'enemy',
  },
  'Drain life': {
    img: 'fangs',
    text: 'Deal 2 damage and heal 2.',
    effect: { damage: 2, heal: 2 },
    target: 'enemy',
  },
  'Prepare': {
    img: 'draw-card',
    text: 'Draw 3 cards.',
    effect: { draw: 3 },
    target: 'self',
  },
  'Heal': {
    img: 'heart',
    text: 'Heal 8.',
    effect: { heal: 8 },
    target: 'self',
  },
  'Shield': {
    img: 'shield',
    text: 'Shield 4.',
    effect: { shield: 4 },
    target: 'self',
  },
  'Magic shield': {
    img: 'shield-magic',
    text: 'Shield 2 for each card in hand.',
    effect: {
      shield: (game) => 2 * game.hand.cards.length
    },
    target: 'self',
  },
  'Store magic': {
    img: 'potion',
    text: 'Gain 1 mana next turn.',
    effect: { store: 1 },
    target: 'self',
  }
};

// Add names as attributes to card for easier look up
Object.entries(CARD_DATA).forEach(([name, data]) => {
  data.name = name;
});

const startingDeck = {
  'Gentle prod': 3,
  'Strike': 2,
  'Mighty slash': 2,
  'Prepare': 1,
  'Heal': 1,
  'Shield': 1,
};

// const startingDeck = {
//   'Poison blade': 3,
//   'Toxic bloom': 1,
//   'Fever': 1,
//   'Mighty slash': 2,
//   'Prepare': 1,
//   'Heal': 1,
//   'Shield': 1,
// };