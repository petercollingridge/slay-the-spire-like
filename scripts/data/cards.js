const CARD_DATA = {
  'Gentle jab': {
    img: 'sword-1',
    text: 'Deal 2 damage.',
    cost: 1,
    effect: { damage: 2 },
    target: 'enemy',
  },
  'Strike': {
    img: 'sword-2',
    text: 'Deal 3 damage.',
    cost: 1,
    effect: { damage: 3 },
    target: 'enemy',
  },
  'Mighty slash': {
    img: 'sword-3',
    text: 'Deal 5 damage.',
    cost: 1,
    effect: { damage: 5 },
    target: 'enemy',
  },
  'Ultimate smash': {
    img: 'sword-4',
    text: 'Deal 8 damage.',
    cost: 2,
    effect: { damage: 8 },
    target: 'enemy',
  },
  'Poison blade': {
    img: 'sword-poison',
    text: 'Deal 2 damage and inflict 1 poison.',
    cost: 1,
    effect: { damage: 2, poison: 1 },
    target: 'enemy',
  },
  'Toxic bloom': {
    img: 'poison-mushroom',
    text: 'Double the poison on an enemy. Use once.',
    cost: 1,
    effect: { poison: (card) => card.game.enemy.poisonAmount },
    target: 'enemy',
    oneUse: true,
  },
  'Fever': {
    img: 'sickness',
    text: 'Deal 2 damage for every poison. Remove 1 poison.',
    cost: 2,
    effect: {
      damage: (card) => 2 * card.game.enemy.poisonAmount,
      poison: -1
    },
    target: 'enemy',
  },
  'Arcane sword': {
    img: 'sword-magic',
    text: 'Deal 2 damage for each card in hand.',
    cost: 2,
    effect: {
      damage: (card) => 2 * card.game.hand.cards.length
    },
    target: 'enemy',
  },
  'Scythe': {
    img: 'scythe',
    text: 'Deal 1 damage for each card in the discard pile.',
    cost: 2,
    effect: {
      damage: (card) => card.game.discard.cards.length
    },
    target: 'enemy',
  },
  'Blade vortex': {
    img: 'sword-spinning',
    text: 'Deal 3 damage for each time this card has been cast.',
    cost: 2,
    effect: {
      damage: (card) => card.castCount * 3
    },
    target: 'enemy',
  },
  'Quick shot': {
    img: 'arrow-1',
    text: 'Deal 2 damage and draw 2 cards.',
    cost: 1,
    effect: { damage: 2, draw: 2 },
    target: 'enemy',
  },
  'Double damage': {
    img: 'arrow-2',
    text: 'Double the amount of damage dealt to enemy this turn.',
    cost: 2,
    effect: { 
      special: (card) => {
        const enemy = card.game.enemy;
        enemy.damageMultiplier *= 2;
      }
     },
    target: 'enemy',
  },
  'Drain life': {
    img: 'fangs',
    text: 'Deal 2 damage and heal 2.',
    cost: 1,
    effect: { damage: 3, heal: 3 },
    target: 'enemy',
  },
  'Prepare': {
    img: 'draw-card',
    text: 'Draw 3 cards.',
    cost: 1,
    effect: { draw: 3 },
    target: 'self',
  },
  'Heal': {
    img: 'heart',
    text: 'Heal 10.',
    cost: 1,
    effect: { heal: 10 },
    target: 'self',
  },
  'Basic shield': {
    img: 'shield',
    text: 'Shield 4.',
    cost: 1,
    effect: { shield: 4 },
    target: 'self',
  },
  'Tough shield': {
    img: 'shield-2',
    text: 'Shield 8.',
    cost: 1,
    effect: { shield: 8 },
    target: 'self',
  },
  'Arcane shield': {
    img: 'shield-magic',
    text: 'Shield 3 for each card in hand.',
    cost: 2,
    effect: {
      shield: (card) => 2 * card.game.hand.cards.length
    },
    target: 'self',
  },
  'Store magic': {
    img: 'potion',
    text: 'Gain 1 mana next turn.',
    cost: 1,
    effect: { store: 1 },
    target: 'self',
  }
};

// Add names as attributes to card for easier look up
Object.entries(CARD_DATA).forEach(([name, data]) => {
  data.name = name;
});

const startingDeck = {
  'Gentle jab': 3,
  'Strike': 2,
  'Mighty slash': 1,
  'Ultimate smash': 1,
  'Prepare': 1,
  'Heal': 1,
  'Basic shield': 1,
  'Double damage': 1,
};

// const startingDeck = {
//   'Poison blade': 3,
//   'Toxic bloom': 1,
//   'Fever': 1,
//   'Mighty slash': 2,
//   'Prepare': 1,
//   'Heal': 1,
//   'Basic shield': 1,
// };