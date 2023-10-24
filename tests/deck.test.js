const Deck = require("../src/components/Deck");
//import { Deck } from '../components/Deck';

test("Instantiating Deck object should create a deck of 108 cards", () => {
  // Arrange
  const input = {};

  // Act
  const deck = new Deck(input);

  // Assert
  expect(deck.cards.length).toBe(108);
});
