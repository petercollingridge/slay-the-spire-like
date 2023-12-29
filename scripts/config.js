const WIDTH = 1000;
const HEIGHT = 500;

const MIDX = WIDTH / 2;
const MIDY = HEIGHT / 2;

const RED_TINT = 0xcc2200;
const BLUE_TINT = 0x0066bb;
const YELLOW_TINT = 0xffff88;

const HAND_SIZE = 5;
const MAX_MANA = 3;

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
  }
};

const ENEMY_DATA = {
  minotaur: {
    img: 'enemy-2',
    health: 30,
    attack: 8,
    shield: 12,
  },
  spikey: {
    img: 'enemy-3',
    health: 24,
    attack: 12,
  },
  yeti: {
    img: 'enemy-1',
    health: 20,
    attack: 5,
  },
};
