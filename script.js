const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;/* for information storage of clicked boxes */

const winningPositions=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

/* Function to Initialize Game */
function initGame(){
  currentPlayer="X";
  gameGrid=["","","","","","","","",""];

  /* Emptying all boxes */
  boxes.forEach((box , index)=>{
    box.innerText="";
    /* Enable pointer Events for each box*/
    box.style.pointerEvents="all";
      /*reapply classes to boxes and win class not added this time so no green Bg on any box*/
     box.classList=`box box${index+1}`;
  });

  newGameBtn.classList.remove("active");
  gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

initGame();



function swapTurn(){
  if(currentPlayer==="X"){
    currentPlayer="O";
  }
  else{
    currentPlayer="X";
  }

  gameInfo.innerText=`Current Player - ${currentPlayer}`;
}




function handleClick(index){
if(gameGrid[index] ==="") /* else it wasalready once clicked */
  {
  boxes[index].innerHTML=currentPlayer;
  gameGrid[index]=currentPlayer;
  boxes[index].style.pointerEvents="none";
  //Swap the turn
  swapTurn();
  //check if win
  checkGameOver();
}
}


function checkGameOver(){
  let answer = "";

  winningPositions.forEach((position)=>{
    /* for total 8 times array of 3 indexes each time will be passed and these indexes
    will be used to compare grid indexes if they are nn empty and have same VALUE then game is over */
    if( (gameGrid[position[0]] !=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") &&
     ( gameGrid[position[0]] === gameGrid[position[1]]   &&   gameGrid[position[1]] ===gameGrid[position[2]]
    )){
   /* if 3 indexes have same value Habibi come to loop */

    //Check if winner is X
      if(gameGrid[position[0]] ==="X" ){
        answer="X";
      }
      else{
        answer="O";
      }
      /*Disable Pointer Events */
      boxes.forEach(box=> box.style.pointerEvents="none");

      /* Show on UI with background green */
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
/* If answer is non empty mean game is won enable New Game Button & Show winner*/
  if(answer!==""){
   gameInfo.innerText=`Winner Player - ${answer}`;
   newGameBtn.classList.add("active");
   return;
  }

  //If Tie
  let fillCount=0;
  gameGrid.forEach(gridBox=>{
    if(gridBox !== ""){
      fillCount++;
    }
  });
  if (fillCount === 9){
   gameInfo.innerHTML="Game Tied!!";
   newGameBtn.classList.add("active");
  }
}


boxes.forEach((box , index)=>
  box.addEventListener("click" , ()=>{
  handleClick(index);/* to differentiate boxes based on index*/
  })
);

newGameBtn.addEventListener("click" , initGame);