
let score = JSON.parse(localStorage.getItem('Score')) || {
    wins: 0,
    losses: 0,
    ties:0,
};
updateResult(); 

function resetScore(){
        score.losses = 0;
        score.wins = 0;
        score.ties = 0;
        document.querySelector('.js-showMoves').innerHTML = null; 
        updateResult(); 
        document.querySelector(".js-paper").classList.remove('Selected')
        document.querySelector(".js-rock").classList.remove('Selected')
        document.querySelector(".js-scissors").classList.remove('Selected')
        
}

//functions to make sure user wants to confirm the reset of their score
function hideResetConfirmation(){
    document.querySelector('.js-reset-confirmation')
    .innerHTML = ''
}
function resetConfirmation(){
    document.querySelector('.js-reset-confirmation')
    .innerHTML = 
    `Are you Sure you want to reset your score?
     <button class="js-reset-confirm">yes</button>
     <button class ='js-reset-cancel'>No</button>`;

     document.querySelector('.js-reset-confirm')
     .addEventListener('click', ()=>{
        resetScore();
        hideResetConfirmation();
     })
     document.querySelector('.js-reset-cancel')
     .addEventListener('click', ()=>{
        hideResetConfirmation();
     })

}


document.querySelector('.js-reset').addEventListener('click', ()=>{  
    resetConfirmation();                  
})
let isAutoplaying = false;
let intervalId;

//add autoplay functionality 

document.body.addEventListener('keydown',(event)=>{
    if(event.key == 'a'){
        autoPlay();
    }
})

function autoPlay(){
    //check if it was autoplaying
    if(!isAutoplaying){

        //run playgame with computer move as player move parameter and repeat over 1 sec
        intervalId=setInterval(function(){
        let playerMove = getComputerMove();
        playGame(playerMove);
    }, 1000);
    //set autoplay var to true for next time the button is pressed
    isAutoplaying = true;}else{

        //stop autoplay
        isAutoplaying = false;
        clearInterval(intervalId);
    }
}

document.querySelector('.js-autoplayButton').addEventListener('click', ()=>{
    autoPlay();
})


document.querySelector('.js-rock').addEventListener('click',()=>{playGame('Rock');})
document.querySelector('.js-paper').addEventListener('click',()=>{playGame('Paper');})
document.querySelector('.js-scissors').addEventListener('click',()=>{playGame('Scissors');})


//play game iwth keyboard
document.body.addEventListener('keydown', (event)=>{
    if(event.key == 'r'){
        playGame('Rock');
    } else if(event.key == 'p'){
        playGame('Paper');
    } else if(event.key =='s'){
        playGame('Scissors');
    }
})
function playGame(playerMove){
    let computerMove = getComputerMove();
    let result = '';
    const parragraphElement2 = document.querySelector('.js-showMoves');
    parragraphElement2.innerHTML = `ComputerMove: <img src="images/${computerMove}-emoji.png" class="move-icon"> , your move: 
        <img src="images/${playerMove}-emoji.png" class = "move-icon">`;

    if(playerMove === computerMove){
        result = 'Tie';
        score.ties+=1;
    } else if (playerMove == 'Rock'){

        if(computerMove === 'Paper'){
            result = 'You Lose.';
            score.losses+=1;
        } else if(computerMove === 'Scissors'){
            result = 'You win.';
            score.wins+=1;
        }
    } else if (playerMove === 'Paper'){
        if (computerMove === 'Rock'){
            result = 'You Win.';
            score.wins+=1;
        }else if(computerMove === 'Scissors'){
            result = 'You Lose';
            score.losses+=1;
        }
    } else if (playerMove === 'Scissors'){
        if(computerMove === 'Rock'){
            result='You Lose';
            score.losses+=1;
        }else if(computerMove === 'Paper'){
            result = 'You win';
            score.wins+=1;
        }
    }

    function selectButton(){
        if(playerMove === 'Rock'){
            document.querySelector(".js-rock").classList.add('Selected')
            document.querySelector(".js-paper").classList.remove('Selected')
            document.querySelector(".js-scissors").classList.remove('Selected')
            
        }
        if(playerMove === 'Paper'){
            document.querySelector(".js-paper").classList.add('Selected')
            document.querySelector(".js-scissors").classList.remove('Selected')
            document.querySelector(".js-rock").classList.remove('Selected')
        }
        if(playerMove === 'Scissors'){
            document.querySelector(".js-scissors").classList.add('Selected')
            document.querySelector(".js-rock").classList.remove('Selected')
            document.querySelector(".js-paper").classList.remove('Selected')
        }
    
}
    console.log(result, score);
    document.querySelector('.js-winLose').innerHTML = result;
    selectButton();
    updateResult();
    
}

function getComputerMove(){
    let randomSeed = Math.random();
    let computerMove = '';
    
    if(randomSeed >= 0 && randomSeed < 1/3){
        computerMove = 'Rock';
    } else if(randomSeed >= 1/3 && randomSeed < 2/3 ){
        computerMove = 'Paper';
    } else if(randomSeed >= 2/3 && randomSeed < 1 ){
        computerMove = 'Scissors';
    }

    return computerMove;
}

function updateResult(){
    const parragraphElement = document.querySelector('.js-showResult');
    parragraphElement.innerHTML = `Current score: Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    localStorage.setItem('Score', JSON.stringify(score));
}

