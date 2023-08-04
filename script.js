const boxes = document.querySelectorAll(".box");
const playerInfo = document.querySelector(".player-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gridArray;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// EVENTLISTENERS 
newGameBtn.addEventListener('click' , init);   
boxes.forEach((box , index) => {
    box.addEventListener('click' , () => { handleClick(index) })
})

// INITIALIZE GAME
function init(){
    currentPlayer = "X" 
    gridArray = ["","","","","","","","",""];  //  CLEAR THE GRID
    boxes.forEach((box, index) => {           // CLEAR THE BOXES ON UI
        box.innerText = "";
        box.classList = `box box${index+1}`;  // CLEAR GREEN BOXES -> by setting css class again
        boxes[index].style.pointerEvents = "all";  // MAKE ALL BOXES CLICKABLE
    })
    newGameBtn.classList.remove("active");  // HIDE NEW GAME BUTTON
    playerInfo.innerText = `Current Player - ${currentPlayer}`;  // UPDATE PLAYER ON UI
}
init();

// functions

function handleClick(index){
    if(gridArray[index] === ""){
        boxes[index].innerText = currentPlayer; // UPDATE UI
        boxes[index].style.pointerEvents = "none"; // DISABLE CLICK
        gridArray[index] = currentPlayer; // UPDATE GRID
        swapPlayer();   // SWAP PLAYERS
        checkWhoWon();  // FIND WINNER
    }
}

function swapPlayer(){
    if(currentPlayer === "X")  currentPlayer = "O";
    else currentPlayer = "X";
    playerInfo.innerText = `Current Player - ${currentPlayer}` // UPDATE UI
}

function checkWhoWon(){
    let winner = "";
    // WINNING CONDITIONS -> must be non-empty and must be equal
    winningPositions.forEach((i) => {
        if( ( gridArray[i[0]] !== "" && gridArray[i[1]] !== "" && gridArray[i[2]] !== "" )
             && ( gridArray[i[0]] === gridArray[i[1]] ) && ( gridArray[i[1]] === gridArray[i[2]] ) )
        {
            // FIND WINNER
            if( gridArray[i[0]] === "X" ) winner = "X";
            else winner = "O";
            // MARK BACKGROUND GREEN AND STOP GAME 
            boxes[i[0]].classList.add("green");
            boxes[i[1]].classList.add("green");
            boxes[i[2]].classList.add("green");

            // STOP GAME -> by disabling mouse click on any of the boxes
            boxes.forEach( ( box ) => { box.style.pointerEvents = "none" })
        }
    })
    // SHOW WINNER ON UI AND START NEW GAME
    if(winner !== ""){
        playerInfo.innerText = `Winner Player - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }
    // NO WINNER FOUND -> GAME TIE
    let filledGrid = 0;
    gridArray.forEach( (box) => { if( box != "") filledGrid++ })
    if( filledGrid == 9){
        playerInfo.innerText = "Game Tied !"; 
        newGameBtn.classList.add("active");
    }
}


