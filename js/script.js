const spacebarPress = document.body;
const start = document.getElementById("startButton");
const holdButton = document.getElementById("holdButtons");
const diceDiv = document.getElementById("diceDiv");

const imageEl = document.createElement("img");
const winnerEl = document.createElement("h1");
winnerEl.innerText = "'Click' Start button to play";
diceDiv.appendChild(winnerEl);

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.hold = 0;
    this.board_Element = document.getElementById(`${name}_board`);
    this.score_Element = document.getElementById(`${name}_score`);
    this.holdscore_Element = document.getElementById(`${name}_holdscore`);
  }
}

let player1 = new Player("player1");
let player2 = new Player("player2");
let currentPlayer = player1;
////////////////////////////

const rollDice = () => {
  let randNum = Math.ceil(Math.random() * 6);
  let imagePath = `./img/dice${randNum}.png`; // create dice face path/image
  imageEl.setAttribute("src", imagePath);
  diceDiv.appendChild(imageEl);

  if (randNum == 1) {
    setTimeout(() => {
      diceDiv.removeChild(imageEl);
      resetPlayer();
    }, 1000);
  }

  currentPlayer.score += randNum;
  currentPlayer.hold += randNum;
  currentPlayer.score_Element.innerText = currentPlayer.score;
  currentPlayer.holdscore_Element.innerText = currentPlayer.hold;

  if (currentPlayer.score >= 21) {
    declareWinner(currentPlayer.name);
  }
};

const resetPlayer = () => {
  // debugger;
  console.log("a 1 was thrown");

  if (currentPlayer == player1) {
    currentPlayer.score = 0;
    currentPlayer.hold = 0;
    currentPlayer.score_Element.innerText = 0;
    currentPlayer.holdscore_Element.innerText = 0;

    player1.board_Element.classList.toggle("activeBg", false);
    player2.board_Element.classList.toggle("activeBg", true);

    currentPlayer = player2;
    return;
  }
  if (currentPlayer == player2) {
    currentPlayer.score = 0;
    currentPlayer.hold = 0;
    currentPlayer.score_Element.innerText = 0;
    currentPlayer.holdscore_Element.innerText = 0;

    player2.board_Element.classList.toggle("activeBg", false);
    player1.board_Element.classList.toggle("activeBg", true);

    currentPlayer = player1;
    return;
  }
};

const declareWinner = winner => {
  diceDiv.removeChild(imageEl);
  winnerEl.innerHTML = `Winner is: ${winner}`;
  diceDiv.appendChild(winnerEl);
  setTimeout(() => {
    winnerEl.innerText = "'Click' Start button to play";
    setTimeout(() => {
      location.reload(true);
    }, 2000);
  }, 3000);
};

const mainLoop = () => {
  rollDice();
};

console.log(document.ready);
start.addEventListener("click", () => {
  diceDiv.removeChild(winnerEl);
  start.setAttribute("disabled", "disabled");
  // listen for click to start game
  spacebarPress.addEventListener("keydown", event => {
    // listen for spaceBar press
    if (event.keyCode == 32) {
      mainLoop();
    }
  });
});
