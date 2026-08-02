// TODO: Move mana logic to character class, so that it can be used for enemies too

class Fight extends DraggableScene {
  constructor() {
    super("Fight");
  }

  init(data) {
    this.enemyType = data.enemyType;
    this.enemyLevel = data.enemyLevel;
    super.init();
  }

  preload() {
    this.load.image('sky', 'assets/sky.svg');
    this.load.image('floor', 'assets/floor.svg');
    this.load.image('button', 'assets/button.svg');
    this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
    this.load.image('skull', 'assets/cards/skull.svg');

    this.load.image('player', 'assets/characters/Character.png');
  }

  create() {
    this.add.image(MIDX, 150, 'sky');

    const flame = this.add.particles(600, 260, 'flares', {
      frame: 'white',
      color: [ 0xfacc22, 0xf89800, 0xf83600, 0x9f0404 ],
      colorEase: 'quad.out',
      lifespan: 1500,
      angle: { min: -100, max: -80 },
      scale: { start: 0.60, end: 0, ease: 'sine.out' },
      speed: { min: 100, max: 200 },
      advance: 2000,
      blendMode: 'ADD'
    });

    this.add.image(MIDX, 400, 'floor');

    this.nextTurnBtn = new Button(
      this,
      { x: MIDX, y: HEIGHT - 24, text: 'End turn', trigger: () => this.endTurn() }
    );

    // Display mana/cards spent this turn
    this.manaCount = this.add.text(MIDX, HEIGHT - 230, '', FIGHT_STYLE).setOrigin(0.5);
    this.discardMsg = this.add.text(MIDX, HEIGHT - 24, '', FIGHT_STYLE).setOrigin(0.5);

    // Objects to handle Player and Enemy characters
    this.player = new Player(this, PLAYER_DATA);
    this.enemy = new Enemy(this, this.enemyType, this.enemyLevel);

    // Objects to render Player and Enemy characters
    this.playerView = new RenderPlayer(this, this.player, 200, HEIGHT / 2 - 20);
    this.enemyView = new RenderEnemy(this, this.enemy, 810, HEIGHT / 2 - 10);

    // Deck
    const deckHeight = HEIGHT - 95;
    this.deck = new Deck(this, 'Draw pile', 65, deckHeight, startingDeck);
    this.deck.shuffle();

    this.discard = new Deck(this, 'Discard pile', WIDTH - 65, deckHeight);
    this.discard.isValidDrop = () => this.discarding;

    // Hand
    this.hand = new Hand(this, MIDX, HEIGHT - 130);

    this.graphics = this.add.graphics();

    this.playerTurn();
  }

  characterDies() {
    if (this.player.dead) {
      this.gameOver();
    } else if (this.enemy.dead) {
      const enemyData = ENEMY_DATA[this.enemyType];
      if (enemyData.level > (enemyData.baseLevel || 1)) {
        // Level up base level
        enemyData.baseLevel = (enemyData.baseLevel || 1) + 1;
        enemyData.defeated = 0;
      } else {
        enemyData.defeated = (enemyData.defeated || 0) + 1;
      }
      this.scene.start('CardChoice', { choices: getCardsToWin(3) });
    }
  }

  gameOver() {
    this.add.text(MIDX, MIDY, 'GAME OVER', IMPACT_STYLE).setOrigin(0.5);
    this.hand.disable();
    this.nextTurnBtn.disable();
  }

  drawCard() {
    const card = this.deck.draw();
    if (card) {
      card.setPlayability(this.maxMana - this.manaSpent);
      this.hand.addCard(card);
    } else if (this.discard.cards.length) {
      // Shuffle discard pile into the deck
      this.deck.addCards(this.discard.empty());
      this.deck.shuffle();
      this.drawCard();
    }
  }

  drawCards(nCards) {
    for (let i = 0; i < nCards; i++) {
      this.drawCard();
    }
  }

  drawCardsTo(maxCards) {
    const nCards = maxCards - this.hand.cards.length;
    if (nCards > 0) {
      this.drawCards(nCards);
    }
  }

  discardCard(card) {
    this.discard.addCard(card);
  }

  playCard(card, source, target) {
    // TODO: Move this logic to Character class, so that it can be used for enemies too
    this.spendMana(card.cost);
    this.hand.removeCard(card);

    source.playCard(card, target);

    // We need to keep track of this for some card effects
    card.castCount++;
  }

  selectCard(card) {
    this.hand.bringToFront(card.container);
  }

  drop(pointer, target, dropZone) {
    if (target) {
      // Drop card onto a zone, e.g. the player or enemy
      target.parent.clearTint();
      dropZone.parent.drop(target.parent, pointer);
    } else {
      // If the card is dropped outside of a zone, return it to the hand
      this.hand.reorderHand();
    }
  }

  setManaSpent(mana, maxMana = this.maxMana) {
    this.manaSpent = mana;
    this.manaCount.setText(`${mana} / ${maxMana}`);
    this.hand.showPlayableCards(maxMana - mana);
  }

  spendMana(mana) {
    this.setManaSpent(this.manaSpent + mana);
  }

  playerTurn() {
    this.nextTurnBtn.show();
    
    if (!this.player.dead) {
      this.maxMana = BASE_MANA;
      this.setManaSpent(0, this.maxMana);
      this.drawCardsTo(START_HAND_SIZE);
      this.player.tickDownActiveSpells();
    }
  }

  endTurn() {
    this.discardPhase();
    if (!this.discarding) {
      this.enemy.turn(this.player);
      this.playerTurn();
    }
  }

  discardPhase() {
    // Discard to four cards
    if (this.hand.size() > END_HAND_SIZE) {
      this.hand.enable();
      this.nextTurnBtn.hide();
      this.discarding = true;
      this.discardMsg.visible = true;
      const n = this.hand.size() - END_HAND_SIZE;
      const txt = n === 1 ? 'a card' : `${n} cards`;
      this.discardMsg.setText('Discard ' + txt);
    } else {
      this.discarding = false;
      this.discardMsg.visible = false;
    }
  }
}
