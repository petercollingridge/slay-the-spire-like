const ENEMY_DATA = {
  ghost: {
    img: 'enemy-5',
    name: 'Ghost',
    health: 30,
    actions: [
      { damage: 6, heal: 2 },
      { damage: 4, heal: 4 },
      { curse: 2 },
    ]
  },
  serpent: {
    img: 'enemy-6',
    name: 'Giant serpent',
    health: 45,
    actions: [
      { damage: 2, poison: 2 },
      { damage: 3, damage: 4 },
      { poison: 1 },
    ]
  },
  minotaur: {
    img: 'enemy-2',
    name: 'Minotaur',
    health: 80,
    actions: [
      { damage: 8 },
      { shield: 8 },
      { damage: 4, shield: 4 },
    ],
  },
  poisonDemon: {
    img: 'enemy-4',
    name: 'Poison demon',
    health: 64,
    actions: [
      { damage: 6 },
      { damage: 2, poison: 4 },
      { poison: 8 },
    ],
  },
  spikey: {
    img: 'enemy-3',
    name: 'Spike',
    health: 40,
    actions: [
      { damage: 15 },
      { damage: 10 },
      { damage: 5 },
    ]
  },
  yeti: {
    img: 'enemy-1',
    name: 'Yeti',
    health: 120,
    actions: [
      { damage: 8 },
      { damage: 2, shield: 4 },
      { heal: 10 },
    ]
  },
  gorgon: {
    img: 'enemy-7',
    name: 'Gorgon',
    health: 75,
    actions: [
      { damage: 16, poison: 6 },
      { damage: 2, curse: 10 },
      { damage: 1 },
      { damage: 2, curse: 1},
    ]
  },
};

// Given an attribute with value n, get the value for the levelled up value
const nextLevel = (n) => Math.ceil(n * 1.25);

function getEnemyData(data, level = 1) {
  // Copy data
  const newData = Object.assign({}, data);

  // Level up base stats for each level above level 1
  for (let i = 1; i < level; i++) {
    newData.health = nextLevel(newData.health);
    newData.actions = newData.actions.map((action) => {
      const newActions = {};
      for (let actionName in action) {
        newActions[actionName] = nextLevel(action[actionName]);
      }
      return newActions;
    })
  }

  return newData;
}

function getMonstersToFight(n) {
  return getRandN(Object.keys(ENEMY_DATA).slice(), n);
}
