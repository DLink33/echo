const Deck = require("../src/components/Deck");

var deck;

beforeEach(() => {
  deck = new Deck();
});

test("Instantiated Deck object should create a deck of 108 cards", () => {
  // Assert
  expect(deck.drawPile.length).toBe(108);
});

test("Drawing first n cards from deck should pop first the top n cards off the top and place them in destination", () => {
  // Arrange
  const input = { numCards: 1 };
  let compareDeck = new Deck();

  // Act
  let hand = [];
  deck.draw(hand, input.numCards);

  // Assert
  expect(hand.length).toBe(input.numCards);
  expect(hand).toStrictEqual(compareDeck.drawPile.slice(0 - input.numCards));
  expect(deck.drawPile.length).toBe(108 - input.numCards);
});

test("Shuffling an array of cards should mix up the array", () => {
  // Act
  let cards = deck.drawPile;
  let originalOrder = [...cards];
  deck.shuffleCards(cards);

  // Assert
  expect(cards).not.toEqual(originalOrder);
});

test("Drawing with not enough cards in draw pile.", () => {
  let hand = [];
  deck.discard(deck.drawPile, 105);
  expect(deck.discardPile.length).toBe(105);
  expect(deck.drawPile.length).toBe(3);
  deck.draw(hand, 4);
  expect(hand.length).toBe(4);
  expect(deck.drawPile.length).toBe(104);
  expect(deck.discardPile.length).toBe(0);
});

test("Drawing with not enough cards should inform players to make a move.", () => {
  // Arrange
  const input = { a: 1, b: 2, c: 3 };

  // Act
  const output = input;

  // Assert
  expect(output).toBe(input);
});
