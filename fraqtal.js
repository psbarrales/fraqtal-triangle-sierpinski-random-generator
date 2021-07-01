const MAX_DOT = 10000;
const DICE_SIZE = 6;
const SIDES = 3;
window.onload = (e) => {
  const pageElement = document.getElementById("fraqtal-wrapper");
  const [a, b, c] = generateTriangle(pageElement);
  generateDot(a, b, c);
};

function generateTriangle() {
  const a = {
    x: 250 + Math.random() * 250,
    y: Math.random() * 100,
  };
  const b = {
    x: Math.random() * 250,
    y: a.y + 250 + Math.random() * 250,
  };
  const c = {
    x: a.x + 150 + Math.random() * 150,
    y: a.y + 250 + Math.random() * 250,
  };
  appendDot(a, "triangle-dot", 10);
  appendDot(b, "triangle-dot", 10);
  appendDot(c, "triangle-dot", 10);
  return [a, b, c];
}

function dice(size) {
  return 1 + Math.round(Math.random() * (size - 1));
}

function generateDot(a, b, c, dot, total = 0) {
  const d = dice(DICE_SIZE);
  let thisDot = dot || {
    x:
      Math.min(a.x, b.x, c.x) +
      Math.random() * (Math.max(a.x, b.x, c.x) - Math.min(a.x, b.x, c.x)),
    y:
      Math.min(a.y, b.y, c.y) +
      Math.random() * (Math.max(a.y, b.y, c.y) - Math.min(a.y, b.y, c.y)),
  };
  if (dot) {
    if (d <= (1 / SIDES) * DICE_SIZE) {
      thisDot = getCenterDot(a, thisDot);
    } else if (
      d > (1 / SIDES) * DICE_SIZE &&
      d <= (1 / SIDES) * DICE_SIZE * 2
    ) {
      thisDot = getCenterDot(b, thisDot);
    } else if (d > (1 / SIDES) * DICE_SIZE) {
      thisDot = getCenterDot(c, thisDot);
    }
  }

  appendDot(thisDot, "fractal-dot");
  if (total < MAX_DOT) {
    setTimeout(() => {
      generateDot(a, b, c, thisDot, ++total);
    }, 1);
  }
}

function appendDot(coords, className, size) {
  const pageElement = document.getElementById("fraqtal-wrapper");
  const element = document.createElement("span");
  const randomSize = size || 1 + Math.random() * 5;
  element.className = className;
  element.style.top = `${coords.y}px`;
  element.style.left = `${coords.x}px`;
  element.style.width = `${randomSize}px`;
  element.style.height = `${randomSize}px`;
  pageElement.appendChild(element);
}

function getCenterDot(dotA, dotB) {
  const x =
    Math.min(dotA.x, dotB.x) +
    (Math.max(dotA.x, dotB.x) - Math.min(dotA.x, dotB.x)) / 2;
  const y =
    Math.min(dotA.y, dotB.y) +
    (Math.max(dotA.y, dotB.y) - Math.min(dotA.y, dotB.y)) / 2;
  return { x, y };
}
