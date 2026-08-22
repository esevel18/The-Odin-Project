// Factory to create GameBoard Object
// Game board should be a Singleton Object so wrap it in IIFE
// Handle
// store the data structure
// check the moves -> if there is more complex rule (consider to make a new class call gameRules or gameEngine)
const gameBoard = (function (){
    const board = new Array(3).fill(null).map(() => new Array(3).fill(null));

    // closure, keep board as private field
    const getBoard = () => board;

    // check if this is a valid cell
    const isValidCell = (r, c) => { return board[r][c] === null; };
    
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

    return { getBoard, mark, printBoard };
})();

// Factory to create Player Object
function createPlayer(name, token){
    let score = 0;    
    const getScore = () => { return score; };
    const giveScore = () => { return score++; };

    return { name, token, getScore, giveScore };
}

// Factory to create a controller
// Singleton Object
// Handle:
// 1. swicth player
// 2. check the game status
// 3. make a play
const gameController = (function (){
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
    const checkGameStatus = () => {
        // check if the row col and the diagonal cell having the same token as the active player token
        // check the row
        let isActivePlayerWin = false;
        for(let i = 0; i < board.getBoard().length; i++){
            // if it is a connect three
            if(board.getBoard()[i][0] === board.getBoard()[i][1] && board.getBoard()[i][1] === board.getBoard()[i][2]){
                // then check if its have the same token as the active player
                isActivePlayerWin = board.getBoard()[i][0] === activePlayer.token;
            }
        }
        // check the col
        // 1: means there is a winner
        // 0: means draw
        // -1: means still not decided yet
        for(let i = 0; i < board.getBoard()[0].length; i++){
            // if it is a connect three
            if(board.getBoard()[0][i] === board.getBoard()[1][i] && board.getBoard()[1][i] === board.getBoard()[2][i]){
                // then check if its have the same token as the active player
                isActivePlayerWin = board.getBoard()[0][i] === activePlayer.token;
            }
        }

        // check left diagonal
        if(board.getBoard()[0][0] === board.getBoard()[1][1] && board.getBoard()[1][1] === board.getBoard()[2][2]){
            isActivePlayerWin = board.getBoard()[0][0] === activePlayer.token;
        }
        
        // check right diagonal
        if(board.getBoard()[0][2] === board.getBoard()[1][1] && board.getBoard()[1][1] === board.getBoard()[2][0]){
            isActivePlayerWin = board.getBoard()[0][2] === activePlayer.token;
        }
        
        if(isActivePlayerWin) {
            console.log(`${activePlayer.name} is winning the game!`);
            return 1;
        }
        
        // check if there is a left over cell
        let isLeftOverCell = false;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board.getBoard()[i][j] === null){
                    isLeftOverCell = true;
                    break;
                }
            }
        }

        if(!isLeftOverCell){
            console.log("The game ends with a DRAW result!");
            return 0;
        }

        return -1;
    };

    const printNewRoundMsg = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    // this where you start the game
    const playRound = (row, col) => {
        console.log(
            `Marking ${getActivePlayer().token} to cell(${row}, ${col})`
        );

        const isOK = board.mark(activePlayer.token, row, col);

        if (!isOK) {
            console.log("Invalid move!");
            return;
        }

        const gameStatus = checkGameStatus();
        
        if(gameStatus === 1 || gameStatus === 0){
            console.log("END OF THE GAME");
            
            if (gameStatus === 1) {
                activePlayer.giveScore();
                console.log(`${activePlayer.name} score is ${activePlayer.getScore()}`);
            }
            
            board.printBoard();
            return;
        }

        switchPlayer();
        printNewRoundMsg();
    };

    // initial message in the beginning of the game
    printNewRoundMsg();

    return { getActivePlayer, playRound };
})();

function handleCellOnClick(e, activePlayer){
    console.log(activePlayer);
    
    e.preventDefault();
    const target = e.target;
    if(target.matches(".cell")){
        const token = activePlayer.token;

        const board = target.parentElement;
        const rect = board.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cellWidth = rect.width / 3;
        const cellHeight = rect.height / 3;

        const row = Math.floor(y / cellHeight);
        const col = Math.floor(x / cellWidth);
        
        gameController.playRound(row, col);
        gameDisplayer.reRender();
    }
}

// handle all the display logic
const gameDisplayer = (() => {
    const reRender = () => {
        const grid = document.querySelector("main");
        // destroy it first
        grid.innerHTML = "";
        // re render
        gameBoard.getBoard().map( row => 
            row.map( cell => {                
                const div = document.createElement("div");
                div.setAttribute("class", "cell");
                div.appendChild(document.createTextNode(cell !== null ? cell : ""));

                grid.appendChild(div);
            })
        );
    };

    return { reRender };
}
)();

// MAIN FUNCTION
(function (){
    const ticTacToe = document.getElementsByClassName("tic-tac-toe-container")[0];
    ticTacToe.addEventListener("click", (e) => handleCellOnClick(e, gameController.getActivePlayer()));


})();