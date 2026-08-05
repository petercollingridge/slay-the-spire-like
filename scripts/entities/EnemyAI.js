// Play the most expensive that we can player cards first
function expensiveFirst(self, player) {
  const playableCards = self.cards.hand.filter((card) => card.cost <= self.mana);

  console.log(self.mana, self.cards.hand, playableCards);

  if (playableCards.length === 0) {
    return null;
  }
  return playableCards.sort((a, b) => b.cost - a.cost)[0];
}