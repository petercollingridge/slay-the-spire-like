// TODO: This class is currently unused, and should be used to create card objects that are not rendered, for use in the game logic. The RenderCard class should be used for cards that are rendered on screen.
class Card {
  constructor(name) {
    this.data = CARD_DATA[name];

    if (!this.data) {
      console.error(`No data for card: ${name}`);
    }

    // Copy some values from data to make look up easier
    this.cost = this.data.cost;
    this.power = this.data.power;
    this.time = this.data.time;
  };
}
