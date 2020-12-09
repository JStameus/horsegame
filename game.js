//player elements
const playerHorse = document.getElementById('player_horse');
playerHorse.addEventListener('click', () => {
    if(!gameIsOver && playerChoice === '') {
        selectItem("player", "horse");
    }
});
const playerHay = document.getElementById('player_hay');
playerHay.addEventListener('click', () => {
    if(!gameIsOver && playerChoice === '') {
        selectItem("player", "hay");
    }
});
const playerSword = document.getElementById('player_sword');
playerSword.addEventListener('click', () => {
    if(!gameIsOver && playerChoice === '') {
        selectItem("player", "sword");
    }
});

//enemy elements
const enemyHorse = document.getElementById('enemy_horse');
const enemyHay = document.getElementById('enemy_hay');
const enemySword = document.getElementById('enemy_sword');

//other display elements
const announcerText = document.getElementById('text_announcer');
const playerWinText = document.getElementById('text_wins');
const resetButton = document.getElementById('button_reset');
resetButton.addEventListener('click', () => {
    resetGame();
})


//game variables
let playerWins = 0;
let playerChoice = '';
let enemyChoice = '';
let winner = '';
let gameIsOver = false;

//allows either the enemy or the player to make a choice
function selectItem(side, item) {
    //if player makes a choice, runs the associated commands and then moves on to the enemy choice
    if(side === "player") {
        playerChoice = item;
        const selectedElement = document.getElementById(`player_${item}`);
        selectedElement.classList.add("choice_selected");
        announcerText.innerText = `You have chosen ${playerChoice.toUpperCase()}!!`;
        setTimeout(() => {
            makeEnemyChoice();
        }, 2000);
    }
    //if the enemy makes a choice, both sides have made a choice and the game moves on to checking the result
    else if(side === "enemy") {
        enemyChoice = item;
        const selectedElement = document.getElementById(`enemy_${item}`);
        selectedElement.classList.add("choice_selected");
        announcerText.innerText = `Enemy has chosen ${enemyChoice.toUpperCase()}!!`;
        setTimeout(() => {
            checkResult();
        }, 2000);
    }
}

//makes the enemy choose an item
function makeEnemyChoice() {
    const choices = ["horse", "hay", "sword"];
    const choiceIndex = Math.floor(Math.random() * choices.length);
    selectItem("enemy", choices[choiceIndex]);
}

//compares results and selects a winner
function checkResult() {
    //first, checks if the result is a draw
    if(playerChoice === enemyChoice) {
        winner = "none";
        alert("Draw! Try again.");
        return;
    }

    //if not, move on and check each condition
    if(playerChoice === "horse") {
        if(enemyChoice === "sword") {
            winner = "enemy";
        }
        else {
            winner = "player";
        }
    }
    if(playerChoice === "hay") {
        if(enemyChoice === "horse") {
            winner = "enemy";
        }
        else {
            winner = "player";
        }
    }
    if(playerChoice === "sword") {
        if(enemyChoice === "hay") {
            winner = "enemy";
        }
        else {
            winner = "player";
        }
    }
    gameOver(winner);
}

//when a result has been found, display a game over message
function gameOver(winner) {
    let winnerElement = undefined;
    let loserElement = undefined;
    if(winner === "player") {
        playerWins++;
        playerWinText.innerText = `Wins: ${playerWins}`;
        winnerElement = document.getElementById(`player_${playerChoice}`);
        loserElement = document.getElementById(`enemy_${enemyChoice}`);
    } 
    else {
        winnerElement = document.getElementById(`enemy_${enemyChoice}`);
        loserElement = document.getElementById(`player_${playerChoice}`);        
    }
    winnerElement.className = "choice_winner";
    loserElement.className = "choice_loser";
    alert(`${winner} wins!!`);
}

//resetting the game
function resetGame() {
    playerChoice = '';
    enemyChoice = '';
    clearAllDisplays();
    announcerText.innerText = "Waiting for your move...";
    gameIsOver = false;
}

function clearAllDisplays() {
    const elements = [playerHorse, playerHay, playerSword, enemyHorse, enemyHay, enemySword];
    for(let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("choice_selected", "choice_loser", "choice_winner");
    }
}