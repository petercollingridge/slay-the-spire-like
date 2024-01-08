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
  minotaur: {
    img: 'enemy-2',
    health: 64,
    attack: 8,
    shield: 16,
  },
  poisonDemon: {
    img: 'enemy-4',
    health: 64,
    attack: 4,
    poisonAttack: {
      chance: 0.5,
      amount: 2,
    },
  },
  spikey: {
    img: 'enemy-3',
    health: 48,
    attack: 12,
  },
  yeti: {
    img: 'enemy-1',
    health: 120,
    attack: 5,
  },
};
