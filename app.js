/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice,gamePlaying;


init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if(gamePlaying){
  //1 random number
  dice = Math.floor(Math.random() * 6) + 1;
  //2 display result
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";
  //3 update  the round table
  if (dice !== 1) {
    //Add score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    //comes here when dice=1 i.e next player
    //switch to next player
    nextPlayer();
  }  
  }
  
});

document.querySelector(".btn-hold").addEventListener("click", function () {
 
 if(gamePlaying){
  //update score on hiting hold button
  //add current score to global score before switching to next player
  scores[activePlayer] += roundScore;
  //update to the ui
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  // check if player own the game
  if (scores[activePlayer] >= 20) {
    document.querySelector("#name-" + activePlayer).textContent = "winner";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
      gamePlaying=false;
  } else {
    //next player
    nextPlayer();
  }}
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.querySelector('.dice').style.display='none'             //when dice turns to 1
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active')
}

document.querySelector(".btn-new").addEventListener("click", function () {
  init();
});
function init() {

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying=true;
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("name-0").textContent = "Player-1";
  document.getElementById("name-1").textContent = "Player-2";
  //remove winner css
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  //make player1 active and another player non active
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}
