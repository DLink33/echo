Game = require("./Game");

const Player = class {
  constructor(name, player2Left = undefined, player2Right = undefined) {
    this.name = "";
    this.points = 0;
    this.hand = [];
    this.adjacentPlayers = (player2Left, player2Right);
  }
};

module.exports = Player;
