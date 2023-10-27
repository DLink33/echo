Game = require("./game");

const Player = class {
  constructor(name, player2Left, player2Right) {
    this.name = "";
    this.points = 0;
    this.hand = [];
    this.adjacentPlayers = (player2Left, player2Right);
  }
};

module.exports = Player;
