// Play the most expensive that we can player cards first
function expensiveFirst(self, player) {
  const playableCards = self.cards.hand.filter((card) => card.cost <= self.mana);

  if (playableCards.length === 0) {
    return null;
  }
  
  const cardToPlay = playableCards.sort((a, b) => b.cost - a.cost)[0];
  const target = cardToPlay.target === 'self' ? self : player;
  return { card: cardToPlay, target };
}
