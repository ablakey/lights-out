const rows = 7;
const cols = 5;
const levels = [
  [12, 16, 17, 18, 22],
  [2, 6, 7, 8, 12, 22, 26, 27, 28, 32],
  [7, 11, 13, 16, 18, 22],
  [10, 14, 15, 16, 18, 19, 20, 24],
  [1, 5, 6, 7, 11, 12, 16, 17, 18, 22, 23, 27, 28, 29, 33],
  [1, 2, 3, 5, 7, 9, 11, 12, 13, 21, 22, 23, 25, 27, 29, 31, 32, 33],
  [0, 4, 6, 8, 11, 13, 21, 23, 26, 28, 30, 34],
  [5, 7, 9, 10, 14, 16, 18, 20, 21, 22, 23, 24, 25, 29],
  [1, 3, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 18, 19, 20, 21, 23, 24, 25, 26, 28, 29, 31, 33],
  [0, 2, 4, 6, 7, 8, 12, 16, 17, 18, 22, 26, 27, 28, 30, 32, 34],
];

// Game state.
let level = 0;
let elements = [];
let acceptInput = true;

function toggleLevelName(newName) {
  const element = document.querySelector(".levelName");

  if (newName !== undefined) {
    element.innerHTML = newName;
  }

  element.classList.toggle("none");
}

function handleWinCondition() {
  acceptInput = false;
  elements.forEach((e, i) => setTimeout(() => e.classList.toggle("none"), 300 + 25 * i));

  // Start next level after a small delay.
  setTimeout(() => {
    level++;
    toggleLevelName(level < levels.length ? `Level ${level + 1}` : "You Win!");
    initialize();
  }, 1500);
}

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

function getActiveCells() {
  return elements.map((e, idx) => (e.classList.contains("active") ? idx : -1)).filter((e) => e !== -1);
}

function handleClick(cell) {
  if (!acceptInput) {
    return;
  }

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
  // Clear any previous DOM state.
  document.querySelector(".container").innerHTML = "";
  elements = [];

  // Populate grid and set up DOM events.
  for (let cell = 0; cell < rows * cols; cell++) {
    const element = document.createElement("div");
    document.querySelector(".container").appendChild(element);
    element.onclick = () => handleClick(cell);
    element.classList.toggle("none");
    elements.push(element);

    // Set the cells that begin active.
    if (levels[level].includes(cell)) {
      element.classList.toggle("active");
    }

    // Unhide and hide level name.
    setTimeout(toggleLevelName, 1500);
    setTimeout(() => element.classList.toggle("none"), 1500 + cell * 25);
    setTimeout(() => (acceptInput = true), 1500 + 25 * rows * cols);
  }

  // Set up application state.
  state = new Array(cols * rows).fill(false);
}

window.onload = initialize;
