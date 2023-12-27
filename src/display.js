export const getCanvasCtx = () => {
  const canvas = document.getElementById("display");
  const ctx = canvas.getContext("2d");
  return ctx;
};

export function drawDeck(Deck) {
  const ctx = getCanvasCtx();
}

export function drawHand(Hand) {
  const ctx = getCanvasCtx();
}

export function drawCard(Card) {
  const ctx = getCanvasCtx();
}

export function clearCanvas(width, height) {
  const ctx = getCanvasCtx();
  ctx.clearRect(0, 0, width, height);
}
