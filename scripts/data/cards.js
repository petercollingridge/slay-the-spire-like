const CARD_DATA = {
  'Gentle jab': {
    img: 'sword-1',
    type: ['attack', 'hex'],
    text: 'Deal (P) damage.',
    cost: 1,
    time: 1,
    power: 5,
    onResolve: { type: 'damage', value: 'power' },
    target: 'enemy',
    rarity: 1,
  },
  'Strike': {
    img: 'sword-2',
    type: ['attack', 'hex'],
    text: 'Deal (P) damage.',
    cost: 2,
    time: 1,
    power: 12,
    onResolve: { type: 'damage', value: 'power' },
    target: 'enemy',
    rarity: 1,
  },
  'Mighty slash': {
    img: 'sword-3',
    type: ['attack', 'hex'],
    text: 'Deal (P) damage.',
    cost: 3,
    time: 1,
    power: 20,
    onResolve: { type: 'damage', value: 'power' },
    target: 'enemy',
    rarity: 1,
  },
  "Slice 'n' dice": {
    img: 'sword-3',
    type: ['attack', 'hex'],
    text: 'Deal (P) damage twice.',
    cost: 2,
    time: 1,
    power: 3,
    onResolve: [{ type: 'damage', value: 'power' }, { type: 'damage', value: 'power' }],
    target: 'enemy',
    rarity: 2,
  },
  "Smash 'n' bash": {
    img: 'sword-4',
    type: ['attack', 'hex'],
    text: 'Deal (P) damage twice.',
    cost: 3,
    time: 1,
    power: 5,
    onResolve: [{ type: 'damage', value: 'power' }, { type: 'damage', value: 'power' }],
    target: 'enemy',
    rarity: 2,
  },
  'Slow blow': {
    img: 'sword-3',
    type: ['attack', 'hex'],
    text: 'Deal (P) damage after (T).',
    cost: 2,
    time: 2,
    power: 10,
    onResolve: { type: 'damage', value: 'power' },
    target: 'enemy',
    rarity: 2,
  },
  'Flashback': {
    img: 'sword-3',
    type: ['attack', 'hex'],
    text: 'Deal (P) damage each turn.',
    cost: 2,
    time: 2,
    power: 3,
    onTick: { type: 'damage', value: 'power' },
    target: 'enemy',
    rarity: 2,
  },
  'Lightning strike': {
    img: 'lightning',
    type: ['attack', 'instant'],
    text: 'Deal (P) damage immediately.',
    cost: 2,
    time: 0,
    power: 3,
    onCast: { type: 'damage', value: 'power' },
    target: 'enemy',
    rarity: 2,
  },
  'Quick shot': {
    img: 'arrow-1',
    type: ['attack', 'hex'],
    text: 'Deal 2 damage. Draw 1 card.',
    cost: 1,
    time: 1,
    power: 2,
    onCast: { draw: 1 },
    onResolve: { type: 'damage', value: 'power' },
    target: 'enemy',
    rarity: 1,
  },
  'Rapid shot': {
    img: 'arrow-1',
    type: ['attack', 'hex'],
    text: 'Deal 3 damage and draw 2 cards.',
    cost: 1,
    time: 1,
    power: 3,
    onCast: { draw: 2 },
    onResolve: { type: 'damage', value: 'power' },
    target: 'enemy',
    rarity: 2,
  },
  'Poison blade': {
    img: 'sword-poison',
    type: ['attack', 'hex'],
    text: 'Deal [P] damage, reduce power by one each tick.',
    cost: 1,
    time: 5,
    power: 4,
    onTick: [{ type: 'damage', value: 'power' }, { type: 'power', value: -1 }],
    target: 'enemy',
    rarity: 1,
  },
  'Toxic bloom': {
    img: 'poison-mushroom',
    type: ['attack', 'hex'],
    text: 'Deal [P] damage, reduce power by one each tick.',
    cost: 2,
    time: 5,
    power: 7,
    onTick: [{ type: 'damage', value: 'power' }, { type: 'power', value: -1 }],
    target: 'enemy',
    rarity: 2,
  },
  'Constrict': {
    img: 'sword-poison',
    type: ['attack', 'hex'],
    text: 'Deal [P] damage, increase power by one each tick.',
    cost: 1,
    time: 5,
    power: 1,
    onTick: [{ type: 'damage', value: 'power' }, { type: 'power', value: 1 }],
    target: 'enemy',
    rarity: 2,
  },
  'Blade vortex': {
    img: 'sword-spinning',
    type: ['attack', 'hex'],
    text: 'Deal (P) damage for each time this card has been cast.',
    cost: 2,
    time: 1,
    power: 3,
    onCast: { type: 'special', effect: (spell) => { spell.card.castCount = (spell.card.castCount || 0) + 1 } },
    onResolve: { type: 'damage', value: (spell) => (spell.card.castCount || 0) * spell.power },
    target: 'enemy',
    rarity: 3,
  },
  'Arcane sword': {
    img: 'sword-magic',
    text: 'Deal (P) damage for each card in hand.',
    cost: 2,
    power: 2,
    onResolve: { type: 'damage', value: (card) => card.source.hand.cards.length * card.power },
    target: 'enemy',
    rarity: 3,
  },
  'Scythe': {
    img: 'scythe',
    type: ['attack', 'hex'],
    text: 'Deal (P) damage for each card in the discard pile.',
    cost: 2,
    time: 1,
    power: 1,
    onResolve: { type: 'damage', value: (card) => card.source.cards.discard.length * card.power },
    target: 'enemy',
    rarity: 3,
  },
  'Quick shield': {
    img: 'shield',
    type: ['shield', 'boon'],
    text: 'Block (P) damage',
    target: 'self',
    cost: 1,
    time: 1,
    power: 4,
    onDamagePass: { type: 'block', value: 'power' },
    rarity: 1,
  },
  'Tough shield': {
    img: 'shield-2',
    type: ['shield', 'boon'],
    text: 'Block (P) damage',
    target: 'self',
    cost: 2,
    time: 2,
    power: 8,
    onDamagePass: { type: 'block', value: 'power' },
    rarity: 2,
  },
  'Absorption shield': {
    img: 'shield-2',
    type: ['shield', 'boon'],
    text: 'Block (P) damage. Gain (T) whenever you block damage.',
    target: 'self',
    cost: 2,
    time: 1,
    power: 2,
    onDamagePass: [{ type: 'block', value: 'power' }, { type: 'time', value: 1 }],
    rarity: 2,
  },
  'Unstable shield': {
    img: 'shield-2',
    type: ['shield', 'boon'],
    text: 'Reduce damage by (P)',
    target: 'self',
    cost: 1,
    time: 3,
    power: 10,
    // TODO: implement reducing power each time damage is blocked
    onDamagePass: [{ type: 'damage', value: '-power' }, { type: 'power', value: '-damage' }],
    onTick: { power: -1 },
    onResolve: { type: 'damage', value: 'power' },
    rarity: 2,
  },
  'Pulse shield': {
    img: 'shield-2',
    type: ['shield', 'boon'],
    text: 'Reduce damage by (P)',
    target: 'self',
    cost: 2,
    time: 5,
    power: 5,
    onDamagePass: { type: 'damage', value: '-power' },
    onTick: { power: -1 },
    rarity: 2,
  },
  'Growing shield': {
    img: 'shield-2',
    type: ['shield', 'boon'],
    text: 'Reduce damage by (P)',
    target: 'self',
    cost: 2,
    time: 5,
    power: 1,
    onDamagePass: { type: 'damage', value: '-power' },
    onTick: { power: 1 },
    rarity: 2,
  },
  'Soften up': {
    img: 'hammer',
    type: ['hex'],
    text: 'Increase damage taken by (P)',
    target: 'enemy',
    cost: 1,
    time: 2,
    power: 1,
    onDamagePass: { type: 'damage', value: 'power' },
    rarity: 1,
  },
  'Tenderise': {
    img: 'hammer',
    type: ['hex'],
    text: 'Increase damage by (P)',
    target: 'enemy',
    cost: 2,
    time: 3,
    power: 2,
    onDamagePass: { type: 'damage', value : 'power' },
    rarity: 2,
  },
  'Anticipate': {
    img: 'draw-card',
    type: ['instant'],
    text: 'Draw (P) cards.',
    cost: 1,
    power: 2,
    onCast: { type: 'draw', value: 'power' },
    target: 'self',
    rarity: 1,
  },
  'Prepare': {
    img: 'draw-card',
    type: ['instant'],
    text: 'Draw (P) cards.',
    cost: 1,
    power: 3,
    onCast: { type: 'draw', value: 'power' },
    target: 'self',
    rarity: 2,
  },
  'Deliberate': {
    img: 'draw-card',
    type: ['boon'],
    text: 'Draw (P) cards next turn.',
    cost: 1,
    time: 2,
    power: 4,
    onTick: { type: 'draw', value: 'power' },
    target: 'self',
    rarity: 2,
  },
  'Study': {
    img: 'draw-card',
    type: ['boon'],
    text: 'Draw (P) cards each turn.',
    cost: 2,
    time: 3,
    power: 1,
    onTick: { type: 'draw', value: 'power' },
    target: 'self',
    rarity: 3,
  },
  'Research': {
    img: 'draw-card',
    type: ['boon'],
    text: 'Draw (P) cards.',
    cost: 2,
    time: 6,
    power: 5,
    onCast: { type: 'draw', value: 'power' },
    target: 'self',
    rarity: 3,
  },
  'Store magic': {
    img: 'potion',
    type: ['boon'],
    text: 'Gain (P) mana next turn.',
    cost: 1,
    power: 1,
    time: 1,
    onResolve: { type: 'mana', value: 'power' },
    target: 'self',
    rarity: 2,
  },
  'Accumulate magic': {
    img: 'potion',
    type: ['boon'],
    text: 'Gain (P) mana next turn.',
    cost: 2,
    power: 2,
    time: 1,
    onResolve: { type: 'mana', value: 'power' },
    target: 'self',
    rarity: 2,
  },
  'Sustain magic': {
    img: 'potion',
    type: ['boon'],
    text: 'Gain (P) mana each turn.',
    cost: 2,
    power: 1,
    time: 2,
    onResolve: { type: 'mana', value: 'power' },
    target: 'self',
    rarity: 3,
  },
  'Strengthen': {
    img: 'sword-clash',
    type: ['boon'],
    text: 'Add +(P) power to attacks.',
    cost: 1,
    power: 1,
    time: 2,
    onDamageOut: { type: 'damage', value: 'power' },
    target: 'self',
    rarity: 2,
  },
};

const OLD_CARD_DATA = {
  'Fortify': {
    img: 'sword-clash',
    text: 'Boon 3. Attacks deal +2 damage.',
    cost: 2,
    enchant: {
      energy: 3,
      type: 'attack',
      effect: (damage) => damage + 2,
    },
    target: 'self',
    rarity: 2,
  },
  'Weaken': {
    img: 'weaken',
    text: 'Hex 3. Attacks deal -1 damage.',
    cost: 1,
    enchant: {
      energy: 3,
      type: 'attack',
      effect: (damage) => Math.max(0, damage - 1),
    },
    target: 'enemy',
    rarity: 1,
  },
  'Enfeeble': {
    img: 'weaken',
    text: 'Hex 4. Attacks deal -2 damage.',
    cost: 1,
    enchant: {
      energy: 4,
      type: 'attack',
      effect: (damage) => Math.max(0, damage - 2),
    },
    target: 'enemy',
    rarity: 1,
  },
  'Double damage': {
    img: 'arrow-2',
    text: 'Boon 1. Your attacks deal 2x damage.',
    cost: 2,
    enchant: {
      energy: 1,
      type: 'attack',
      effect: (damage) => damage * 2 ,
    },
    target: 'self',
    rarity: 2,
  },
  'Boon blast': {
    img: 'boon-blast',
    text: 'Deal 2 damage for each energy your boons.',
    cost: 2,
    effect: { 
      damage: (card) => {
        let damage = 0;
        card.game.player.enchantments.forEach((enchantment) => {
          if (enchantment.mode === 'boon') {
            damage += enchantment.energy * 2;
          }
        });
        return damage;
      }
    },
    target: 'enemy',
    rarity: 3,
  },
  'Hex blast': {
    img: 'boon-blast',
    text: "Deal 2 damage for each energy on target's hexes.",
    cost: 2,
    effect: { 
      damage: (_, target) => {
        let damage = 0;
        target.enchantments.forEach((enchantment) => {
          if (enchantment.mode === 'hex') {
            damage += enchantment.energy * 2;
          }
        });
        return damage;
      }
    },
    target: 'enemy',
    rarity: 3,
  },
  'Hex boost': {
    img: 'orb-up',
    text: 'Add 1 energy to each hex.',
    cost: 1,
    effect: { 
      special: (_, target) => {
        target.enchantments.forEach((enchantment) => {
          if (enchantment.mode === 'hex') {
            enchantment.setValue(enchantment.energy + 1);
          }
        })
      }
    },
    target: 'enemy',
    rarity: 1,
  },
  'Boon boost': {
    img: 'orb-up',
    text: 'Add 1 energy to each boon.',
    cost: 1,
    effect: { 
      special: (_, target) => {
        target.enchantments.forEach((enchantment) => {
          if (enchantment.mode === 'boon') {
            enchantment.setValue(enchantment.energy + 1);
          }
        })
      }
    },
    target: 'self',
    rarity: 1,
  },
  'Enchant boost': {
    img: 'orb-up',
    text: 'Add 1 energy to each boon or hex.',
    cost: 1,
    effect: { 
      special: (_, target) => {
        target.enchantments.forEach((enchantment) => {
          enchantment.setValue(enchantment.energy + 1);
        })
      }
    },
    target: 'any',
    rarity: 1,
  },
  'Arcane shield': {
    img: 'shield-magic',
    text: 'Boon 3 for each card in hand. Damage reduces shield energy instead of health',
    cost: 2,
    enchant: {
      type: 'shield',
      energy: (card) => 3 * card.game.hand.cards.length,
    },
    target: 'self',
    rarity: 3,
  },
  'Drain life': {
    img: 'fangs',
    text: 'Deal 3 damage and heal 3.',
    cost: 1,
    effect: { damage: 3, heal: 3 },
    target: 'enemy',
    rarity: 2,
  },
  'Formulate': {
    img: 'draw-card',
    text: 'Draw 1 card for every boon +1.',
    cost: 2,
    effect: {
      draw: (_, target) => 1 + target.enchantments.length
    },
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

const ENEMY_DECK = {
  'Gentle jab': 4,
  'Strike': 4,
  'Quick shield': 2,
  'Tough shield': 2,
};

const RARITY_LETTERS = ['C', 'U', 'R'];

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

const startingDeck = {
  'Gentle jab': 2,
  'Strike': 1,
  'Quick shield': 1,
  'Tough shield': 1,
  'Anticipate': 1,
  
  Scythe: 1,
  // 'Quick shot': 1,
  // 'Lightning strike': 1,
  // 'Store magic': 1,
  // 'Research': 1,
  // 'Blade vortex': 1,
};

function convertNamesToCards(names) {
  return names.map((name) => {
    const data = CARD_DATA[name];

    if (!data) {
      console.error(`No data for card: ${name}`);
    }
    data.name = name;

    return data;
  });
}

function getPackOfCards() {
  const deck = {};

  // for (let i = 0; i < 1; i++) {
  //   const card = getRand(RARE_CARDS);
  //   deck[card] = (deck[card] || 0) + 1;
  // }
  for (let i = 0; i < 3; i++) {
    const card = getRand(UNCOMMON_CARDS);
    deck[card] = (deck[card] || 0) + 1;
  }
  for (let i = 0; i < 6; i++) {
    const card = getRand(COMMON_CARDS);
    deck[card] = (deck[card] || 0) + 1;
  }

  return deck;
}

function getCardsToWin(n) {
  return getRandN(Object.keys(PLAYER_CARDS).slice(), n);
}

const firstPack = getPackOfCards();
