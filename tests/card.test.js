const Card = require("../src/components/Card");

test("Instantiating card with specific properties should create instance of card with those properties.", () => {
  // Arrange
  const input = { type: "number", color: "blue", symbol: "3" };

  // Act
  const card = new Card(input.type, input.color, input.symbol);

  // Assert
  expect(card.type).toBe("number");
  expect(card.color).toBe("blue");
  expect(card.symbol).toBe("3");
});
