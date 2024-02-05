const CARD_DATA = {
  'Gentle jab': {
    img: 'sword-1',
    text: 'Deal 2 damage.',
    cost: 1,
    effect: { damage: 2 },
    target: 'enemy',
    rarity: 1,
  },
  'Strike': {
    img: 'sword-2',
    text: 'Deal 3 damage.',
    cost: 1,
    effect: { damage: 3 },
    target: 'enemy',
    rarity: 1,
  },
  'Mighty slash': {
    img: 'sword-3',
    text: 'Deal 5 damage.',
    cost: 1,
    effect: { damage: 5 },
    target: 'enemy',
    rarity: 1,
  },
  'Ultimate smash': {
    img: 'sword-4',
    text: 'Deal 8 damage.',
    cost: 2,
    effect: { damage: 8 },
    target: 'enemy',
    rarity: 2,
  },
  'Strengthen': {
    img: 'sword-clash',
    text: 'Boon 2. Your attacks deal +2 damage.',
    cost: 2,
    effect: {
      enchant: { type: 'attack', func: (damage) => damage + 2 },
      energy: 2,
    },
    target: 'self',
    rarity: 2,
  },
  'Double damage': {
    img: 'arrow-2',
    text: 'Boon 1. Your attacks deal 2x damage.',
    cost: 2,
    effect: {
      enchant: { type: 'attack', func: (damage) => damage * 2 },
      energy: 1,
    },
    target: 'self',
    rarity: 2,
  },
  'Boon blast': {
    img: 'boon-blast',
    text: 'Deal 1 damage for each energy on a boon.',
    cost: 2,
    effect: { 
      damage: (card) => {
        let damage = 0;
        card.game.player.enchantments.forEach((enchantment) => {
          damage += enchantment.energy;
        });
        return damage;
      }
    },
    target: 'enemy',
    rarity: 3,
  },
  'Boon boost': {
    img: 'orb-up',
    text: 'Add 1 energy to each boon.',
    cost: 1,
    effect: { 
      special: (_, target) => {
        target.enchantments.forEach((enchantment) => {
          enchantment.setValue(enchantment.energy + 1);
        })
      }
    },
    target: 'self',
    rarity: 2,
  },
  'Basic shield': {
    img: 'shield',
    text: 'Boon 5. Damage reduces shield energy instead of health',
    cost: 1,
    effect: {
      enchant: { type: 'shield' },
      energy: 5,
    },
    target: 'self',
    rarity: 1,
  },
  'Tough shield': {
    img: 'shield-2',
    text: 'Shield 8.',
    cost: 1,
    effect: {
      enchant: { type: 'shield' },
      energy: 10,
    },
    target: 'self',
    rarity: 2,
  },
  'Arcane shield': {
    img: 'shield-magic',
    text: 'Shield 3 for each card in hand.',
    cost: 2,
    effect: {
      enchant: { type: 'shield' },
      energy: (card) => 2 * card.game.hand.cards.length,
    },
    target: 'self',
    rarity: 3,
  },
  'Poison blade': {
    img: 'sword-poison',
    text: 'Deal 2 damage and inflict 1 poison.',
    cost: 1,
    effect: { damage: 2, poison: 1 },
    target: 'enemy',
    rarity: 2,
  },
  'Toxic bloom': {
    img: 'poison-mushroom',
    text: 'Double the poison on an enemy. Use once.',
    cost: 1,
    effect: { poison: (card) => card.game.enemy.poisonAmount },
    target: 'enemy',
    oneUse: true,
    rarity: 3,
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
    rarity: 3,
  },
  'Arcane sword': {
    img: 'sword-magic',
    text: 'Deal 2 damage for each card in hand.',
    cost: 2,
    effect: {
      damage: (card) => 2 * card.game.hand.cards.length
    },
    target: 'enemy',
    rarity: 3,
  },
  'Scythe': {
    img: 'scythe',
    text: 'Deal 1 damage for each card in the discard pile.',
    cost: 2,
    effect: {
      damage: (card) => card.game.discard.cards.length
    },
    target: 'enemy',
    rarity: 3,
  },
  'Blade vortex': {
    img: 'sword-spinning',
    text: 'Deal 3 damage for each time this card has been cast.',
    cost: 2,
    effect: {
      damage: (card) => card.castCount * 3
    },
    target: 'enemy',
    rarity: 3,
  },
  'Quick shot': {
    img: 'arrow-1',
    text: 'Deal 2 damage and draw 2 cards.',
    cost: 1,
    effect: { damage: 2, draw: 2 },
    target: 'enemy',
    rarity: 2,
  },
  'Drain life': {
    img: 'fangs',
    text: 'Deal 3 damage and heal 3.',
    cost: 1,
    effect: { damage: 3, heal: 3 },
    target: 'enemy',
    rarity: 2,
  },
  'Anticipate': {
    img: 'draw-card',
    text: 'Draw 2 cards.',
    cost: 1,
    effect: { draw: 2 },
    target: 'self',
    rarity: 1,
  },
  'Prepare': {
    img: 'draw-card',
    text: 'Draw 3 cards.',
    cost: 1,
    effect: { draw: 3 },
    target: 'self',
    rarity: 3,
  },
  'Heal': {
    img: 'heart',
    text: 'Heal 5.',
    cost: 1,
    effect: { heal: 5 },
    target: 'self',
    rarity: 2,
  },
  'Store magic': {
    img: 'potion',
    text: 'Gain 1 mana next turn.',
    cost: 1,
    effect: { store: 1 },
    target: 'self',
    rarity: 2,
  },
  'Curse': {
    img: 'curse',
    text: 'Take 3 damage.',
    cost: 1,
    effect: { damage: 3 },
    target: 'self',
    rarity: 0,
    oneUse: true,
  }
};

// Add names as attributes to card for easier look up
Object.entries(CARD_DATA).forEach(([name, data]) => {
  data.name = name;
});

function getCardsByFunc(func) {
  return Object.entries(CARD_DATA).reduce((cards, [name, data]) => {
    if (func(data)) {
      cards[name] = data;
    }
    return cards;
  }, {});
}

const PLAYER_CARDS = Object.entries(CARD_DATA)
  .reduce((cards, [name, data]) => {
    if (data.rarity) {
      cards[name] = data;
    }
    return cards;
  }, {});

const COMMON_CARDS = Object.keys(PLAYER_CARDS).filter((card) => PLAYER_CARDS[card].rarity === 1);
const UNCOMMON_CARDS = Object.keys(PLAYER_CARDS).filter((card) => PLAYER_CARDS[card].rarity === 2);
const RARE_CARDS = Object.keys(PLAYER_CARDS).filter((card) => PLAYER_CARDS[card].rarity === 3);

function getStartingDeck() {
  const deck = {};

  for (i = 0; i < 2; i++) {
    const card = getRand(RARE_CARDS);
    deck[card] = (deck[card] || 0) + 1;
  }
  for (i = 0; i < 4; i++) {
    const card = getRand(UNCOMMON_CARDS);
    deck[card] = (deck[card] || 0) + 1;
  }
  for (i = 0; i < 6; i++) {
    const card = getRand(COMMON_CARDS);
    deck[card] = (deck[card] || 0) + 1;
  }

  return deck;
}

const startingDeck = getStartingDeck();

function getCardsToWin(n) {
  return getRandN(Object.keys(PLAYER_CARDS).slice(), n);
}

/*
const startingDeck = {
  'Gentle jab': 3,
  'Strike': 2,
  'Mighty slash': 1,
  'Ultimate smash': 1,
  'Prepare': 1,
  'Heal': 1,
  'Basic shield': 1,
  'Double damage': 1,
  'Strengthen': 2,
  'Boon boost': 1,
  'Boon blast': 2
};
*/

// const startingDeck = {
//   'Poison blade': 3,
//   'Toxic bloom': 1,
//   'Fever': 1,
//   'Mighty slash': 2,
//   'Prepare': 1,
//   'Heal': 1,
//   'Basic shield': 1,
// };