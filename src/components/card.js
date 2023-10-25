class Card {
  constructor(type, color, symbol) {
    this.type = type;
    this.color = color;
    this.symbol = symbol;
  }
  toString() {
    return `${this.color} ${this.symbol}`;
  }
}

module.exports = Card;
