// Factory to create GameBoard Object
// Game board should be a Singleton Object so wrap it in IIFE
// Handle
// store the data structure
// check the moves -> if there is more complex rule (consider to make a new class call gameRules or gameEngine)
const gameBoard = (function () {
    let board = new Array(3).fill(null).map(() => new Array(3).fill(null));

    // closure, keep board as private field
    const getBoard = () => board;

    // check if this is a valid cell
    const isValidCell = (r, c) => { return board[r][c] === null; };

    const newBoard = () => {
        board = new Array(3).fill(null).map(() => new Array(3).fill(null));
    };

    // mark cell
    const mark = (playersToken, r, c) => {
        if (!isValidCell(r, c)) {
            return false;
        }
        board[r][c] = playersToken;
        return true;
    };

    const printBoard = () => {
        const b = board.map(row => row.map(cell => cell));
        console.log(b);
    };

    return { getBoard, mark, printBoard, newBoard };
})();

// Factory to create Player Object
function createPlayer(name, token) {
    let score = 0;
    const getScore = () => { return score; };
    const giveScore = () => { score++; };

    return { name, token, getScore, giveScore };
}

// Factory to create a controller
// Singleton Object
// Handle:
// 1. swicth player
// 2. check the game status
// 3. make a play
const gameController = (function () {
    let gameOver = false;
    const players = [
        createPlayer("Ana", "O"),
        createPlayer("Bob", "X")
    ];
    const board = gameBoard;
    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = getActivePlayer() === players[0] ? players[1] : players[0];
    };

    // Check the game status
    // 1 -> means active player is the winner
    // 0 -> draw
    // -1 -> game still not over yet
    const checkGameStatus = () => {
        const b = board.getBoard();
        const token = activePlayer.token;

        // rows
        for (let i = 0; i < 3; i++) {
            if (
                b[i][0] === token &&
                b[i][1] === token &&
                b[i][2] === token
            ) {
                return 1;
            }
        }

        // columns
        for (let i = 0; i < 3; i++) {
            if (
                b[0][i] === token &&
                b[1][i] === token &&
                b[2][i] === token
            ) {
                return 1;
            }
        }

        // left diagonal
        if (
            b[0][0] === token &&
            b[1][1] === token &&
            b[2][2] === token
        ) {
            return 1;
        }

        // right diagonal
        if (
            b[0][2] === token &&
            b[1][1] === token &&
            b[2][0] === token
        ) {
            return 1;
        }

        // check draw
        for (let row of b) {
            for (let cell of row) {
                if (cell === null) {
                    return -1;
                }
            }
        }

        return 0;
    };

    const printNewRoundMsg = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const newGame = () => {
        board.newBoard();
        activePlayer = players[0];
        gameOver = false;
    }

    // this where you start the game
    const playRound = (row, col) => {
        if (gameOver) {
            return;
        }
        console.log(
            `Marking ${getActivePlayer().token} to cell(${row}, ${col})`
        );

        const isMarked = board.mark(activePlayer.token, row, col);

        if (!isMarked) {
            console.log("Invalid move!");
            return;
        }

        // rerender
        gameDisplayer.reRender();

        const gameStatus = checkGameStatus();

        // show win/draw
        gameDisplayer.displayStatus(gameStatus, activePlayer);

        // the game is finished
        if (gameStatus !== -1) {
            gameOver = true;
            return;
        }

        // continue the game
        switchPlayer();
        printNewRoundMsg();
    };

    // initial message in the beginning of the game
    printNewRoundMsg();

    return { getActivePlayer, playRound, newGame };
})();

// handle all the display logic
const gameDisplayer = (() => {
    const reRender = () => {
        const grid = document.querySelector("main");
        // destroy it first
        grid.innerHTML = "";
        // re render
        gameBoard.getBoard().map(row =>
            row.map(cell => {
                const div = document.createElement("div");
                div.setAttribute("class", "cell");
                div.appendChild(document.createTextNode(cell !== null ? cell : ""));

                grid.appendChild(div);
            })
        );
    };

    const displayStatus = (gameStatus, activePlayer) => {
        // if wins or draw
        if (gameStatus === 1 || gameStatus === 0) {
            // if wins
            const popup = document.querySelector(".popup");
            const h1 = document.createElement("h1");
            h1.setAttribute("id", "res");
            if (gameStatus === 1) {
                activePlayer.giveScore();
                console.log(`${activePlayer.name} score is ${activePlayer.getScore()}`);
                h1.appendChild(document.createTextNode(`${activePlayer.name} is Winning The Game!`));
                popup.prepend(h1);
                return;
            }

            // if draws
            h1.appendChild(document.createTextNode("The Game Ends With a Draw Result!"));
            popup.prepend(h1);
            console.log("END OF THE GAME");
            return;
        }
    }

    return { reRender, displayStatus };
}
)();

// HANDLE INPUT 
function handleCellOnClick(e) {
    e.preventDefault();
    const target = e.target;
    if (target.matches(".cell")) {
        const board = target.parentElement;
        const rect = board.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cellWidth = rect.width / 3;
        const cellHeight = rect.height / 3;

        const row = Math.floor(y / cellHeight);
        const col = Math.floor(x / cellWidth);

        gameController.playRound(row, col);
    }
}

function handleNewGameOnClick(){
    const res = document.querySelector(".popup h1#res");
    if(res !== null) {
        res.innerHTML = "";
    }
    gameController.newGame();
    gameDisplayer.reRender();
}

// MAIN FUNCTION
(function () {
    const ticTacToe = document.getElementsByClassName("tic-tac-toe-container")[0];
    ticTacToe.addEventListener("click", handleCellOnClick);

    const newGameBtn = document.querySelector(".popup > input[type='button']");
    newGameBtn.addEventListener("click", handleNewGameOnClick);
})();