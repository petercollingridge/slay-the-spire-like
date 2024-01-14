const WIDTH = 1000;
const HEIGHT = 500;

const CARD_WIDTH = 108;
const CARD_HEIGHT = 164;

const MIDX = WIDTH / 2;
const MIDY = HEIGHT / 2;

const RED_TINT = 0xcc2200;
const BLUE_TINT = 0x2288dd;
const YELLOW_TINT = 0xffff88;

const START_HAND_SIZE = 5;
const END_HAND_SIZE = 4;
const BASE_MANA = 3;

const OPTION_STYLE = {
  fill: '#f8f8f8',
  fontFamily: 'Arial',
  fontSize: '20px',
};

const IMPACT_STYLE = {
  fill: '#600',
  fontFamily: 'Impact',
  fontSize: '80px',
};

const CIRCLE_NUM_STYLE = {
  fill: '#202030',
  fontFamily: 'Arial',
  fontSize: '13px',
};

const FIGHT_STYLE = {
  fill: '#111',
  fontFamily: 'Arial',
  fontSize: '20px',
};

const PLAYER_DATA = {
  img: 'player',
  health: 60,
};

const ENEMY_DATA = {
  ghost: {
    img: 'enemy-5',
    name: 'Ghost',
    health: 30,
    actions: [
      { damage: 6, heal: 2 },
      { damage: 4, heal: 4 },
      { heal: 8 },
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
      { damage: 2, poison: 1 },
      { poison: 2 },
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
      { damage: 5 },
      { shield: 2 },
      { heal: 10 },
    ]
  },
};
