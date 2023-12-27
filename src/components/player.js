export class Player {
  constructor(params) {
    const {
      name = "",
      player2Left = undefined,
      player2Right = undefined,
      isUser = false,
    } = params || {};
    this.isUser = isUser;
    this.name = name;
    this.points = 0;
    this.hand = [];
    this.adjacentPlayers = (player2Left, player2Right);
  }
}
