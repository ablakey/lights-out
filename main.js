const levels = [
  [12, 16, 17, 18, 22],
  [0, 5, 47, 42],
  [12, 16, 17, 18, 22],
  [12, 16, 17, 18, 22],
];
const rows = 7;
const cols = 5;

// Game state.
const level = 0;
const elements = [];

function getActiveCells() {
  return elements
    .map((e, idx) => (e.classList.contains("active") ? idx : -1))
    .filter((e) => e !== -1);
}

function handleWinCondition() {
  // Hide all elements.
  elements.forEach((e, i) =>
    setTimeout(() => e.classList.toggle("hidden"), 300 + 25 * i)
  );
}

/**
 * Get the cells that need to be toggled given a target cell.
 * This is where the game's rules will be encoded.
 */
function getToggleCells(cell) {
  const col = cell % cols;

  return [
    cell, // The target cell.
    cell - cols, // Above.
    cell + cols, // Below.
    col < cols - 1 ? cell + 1 : -1, // Right
    col > 0 ? cell + -1 : -1, // Left
  ].filter((c) => c >= 0 && c < rows * cols); // Remove values outside grid.
}

function handleClick(cell) {
  // Get cells that should be toggled and toggle them.
  const toToggle = getToggleCells(cell);
  toToggle.forEach((c) => {
    elements[c].classList.toggle("active");
  });

  // Check to see if game has ended.
  if (getActiveCells().length === 0) {
    handleWinCondition();
  }
}

function initialize() {
  // Populate grid and set up DOM events.
  for (let cell = 0; cell < rows * cols; cell++) {
    const element = document.createElement("div");
    document.querySelector(".container").appendChild(element);
    element.onclick = () => handleClick(cell);
    elements.push(element);

    if (levels[level].includes(cell)) {
      element.classList.toggle("active");
    }
  }

  // Set up application state.
  state = new Array(cols * rows).fill(false);
}

function main() {
  initialize();
}

window.onload = main;
