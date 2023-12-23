Game = require("./components/Game");
utils = require("./utils");

function gameLoop() {
  let game = new game(3, 7, 1, false);
  console.log(game.players);
  console.log(game.deck);
  for (let i = 0; i < game.numPlayers; i++) {
    console.log(game.players[i].name);
    console.log(game.players[i].hand);
    console.log(game.players[i].player2Left);
    console.log(game.players[i].player2Right);
  }
}

gameLoop();
