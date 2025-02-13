document.addEventListener("DOMContentLoaded", () => {
  const cellsContents = document.querySelectorAll(".cell-content");
  const cells = document.querySelectorAll(".cell");
  const playerDisplay = document.getElementById("current-player");
  const restartButton = document.getElementById("restart-button");
  let currentPlayer = localStorage.getItem("localPlayer") ?? "X";
  let board;
  if (JSON.parse(localStorage.getItem("board") ?? "null") === null) {
    board = ["", "", "", "", "", "", "", "", ""];
  } else {
    board = JSON.parse(localStorage.getItem("board"));
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") continue;
      cellsContents[i].textContent = board[i];
      cellsContents[i].classList.add("filled");
    }
  }
  playerDisplay.innerHTML = `<b>Current player: </b>${currentPlayer}`;
  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let combo of winningCombinations) {
      let [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setTimeout(() => alert(`Player ${currentPlayer} wins!`), 100);
        return true;
      }
    }
    return false;
  }
  function checkDraw() {
    return board.every((cell) => cell !== "");
  }
  function handleClick(event) {
    if (!event.target) return;
    const index = +(event.target.dataset.index ?? "");
    if (!board[index]) {
      board[index] = currentPlayer;
      localStorage.setItem("board", JSON.stringify(board));
      cellsContents[index].textContent = currentPlayer;
      cellsContents[index].classList.add("filled");
      if (checkWinner()) {
        cellsContents.forEach((cell) => cell.removeEventListener("click", handleClick));
        cells.forEach((cell) => cell.removeEventListener("mouseover", handleHover));
        cells.forEach((cell) => cell.removeEventListener("mouseleave", handleEndHover));
        return;
      }
      if (checkDraw()) {
        setTimeout(() => alert("It's a draw!"), 100);
        return;
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      localStorage.setItem("localPlayer", currentPlayer);
      playerDisplay.innerHTML = `<b>Current player: </b>${currentPlayer}`;
    }
  }
  function handleHover(event) {
    const index = +(event.target.dataset.index ?? "");
    if (!board[index]) {
      cellsContents[index].textContent = currentPlayer;
    }
  }
  function handleEndHover(event) {
    const index = +(event.target.dataset.index ?? "");
    if (cellsContents[index].textContent && !board[index]) {
      cellsContents[index].textContent = "";
    }
  }
  function restartGame() {
    localStorage.clear();
    board.fill("");
    cellsContents.forEach((cell) => {
      cell.textContent = "";
      cell.addEventListener("click", handleClick);
      cell.classList.remove("filled");
    });
    cells.forEach((cell) => {
      cell.addEventListener("mouseover", handleHover);
      cell.addEventListener("mouseleave", handleEndHover);
    });
    currentPlayer = "X";
    playerDisplay.innerHTML = `<b>Current player: </b>${currentPlayer}`;
  }
  if (!checkWinner() && !checkDraw()) {
    cells.forEach((cell) => cell.addEventListener("mouseover", handleHover));
    cells.forEach((cell) => cell.addEventListener("mouseleave", handleEndHover));
    cellsContents.forEach((cell) => cell.addEventListener("click", handleClick));
  }
  restartButton.addEventListener("click", restartGame);
});
//# sourceMappingURL=main.js.map
