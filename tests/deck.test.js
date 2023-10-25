const deck = require("../src/components/Deck");

beforeAll(() => {
  var deck = new Deck();
});

test("Instantiated Deck object should create a deck of 108 cards", () => {
  // Arrange
  const input = {};

  // Act
  const deck = new Deck(input);

  // Assert
  expect(deck.cards.length).toBe(108);
});
