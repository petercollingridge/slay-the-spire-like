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
    attack: 6,
  },
  yeti: {
    img: 'enemy-1',
    health: 20,
    attack: 5,
  },
};
