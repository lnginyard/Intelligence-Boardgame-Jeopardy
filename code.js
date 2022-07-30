




let cluesArray = [];
let questionNumber = 0;
let score = 0
let exhaustButton = document.getElementById("exhaust-btn");
let exhaustButtonH = document.getElementById("exhaustH-btn");
let questionAnswer = document.getElementById("questionAnswer");
let answerInput = document.getElementById("userAnswer");
let surrenderBtnAnswer = document.getElementById("surrender");
let scoreMark = document.getElementById("scoreMark");
let answerCheck = document.getElementById("checkAnswer");
let questionText = document.getElementById("question");
let GameContainer = document.querySelector('.container');
let greeted = document.getElementById("Jeopardy" );
let startingMinutes = 10;
let time = startingMinutes *60;
let countDowEl= document.getElementById("counterDown")
let started = false;
let interval = null

exhaustButton.addEventListener("click", startGame)
exhaustButtonH.addEventListener("click", startGame)
function getData(){
    fetch('https://jservice.kenzie.academy/api/random-clue?valid=true')
    .then(response => response.json())
    .then(data => data.categoryId)
    .then(categoryId => {

        fetch(`https://jservice.kenzie.academy/api/clues?category=${categoryId}`)
        .then(response => response.json())
        .then(data => {
            cluesArray = data.clues
            index = Math.floor((Math.random() * cluesArray.length - 1) + 1) 
            currentClue = cluesArray.splice(index, 1)[0]
            renderQuestion(currentClue)
            return currentClue
        })

        function renderQuestion(trivia) {
            console.log("Correct Answer:", trivia.answer)
            document.getElementById('question').innerHTML = trivia.question
            document.getElementById('category').innerHTML = trivia.category.title
           
        }
    })
}


surrenderBtnAnswer.addEventListener("click", function(event) {

    event.preventDefault();
    let userAnswer = answerInput.value;
    GameContainer.style.background = "red";
    if (userAnswer === "") {
        answerCheck.innerHTML = "";
          setTimeout(function removeMessage() {
        answerCheck.innerHTML = " 🟦I-Beg-Your-Pardon -Bro🟦 ";
    }, 4000) 

    } else if (userAnswer === answerInput.value) {
        score += 1;
        scoreMark.innerHTML = "  🥇" + score;
        answerInput.value = "";
        GameContainer.style.background = "Blue";
        answerCheck.innerHTML = " 5️⃣0️⃣0️⃣";
    } 

    else {

        endGame()
        
    }
    //console.log(answer);

    if (score === 5) {
        console.log("Game Over !")
        scoreMark.innerHTML = "";
        questionText.innerHTML = "";
        GameContainer.style.background = "Navy";
        exhaustButton.innerText = "Round 2 5️⃣0️⃣0️⃣";
        exhaustButtonH.innerText = "Round 2 5️⃣0️⃣0️⃣0️⃣";
        surrenderBtnAnswer.style.display = "none";
        answerInput.style.display = "none"
        answerCheck.innerHTML = "🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍  🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 " 
        + score;
        score = 0;
    }
    
})

function timer(){

    let minutes = Math.floor(time/60);
    let seconds = time% 60;
    seconds = seconds< 10? "0" + seconds: seconds;
    countDowEl.innerHTML = "" + " " +  `${minutes}: ${seconds}`;
   time--;
    if (time==0){
        clearInterval (interval)
        started =false;
        countDowEl.innerHTML = "TIME OUT" 
        time;
   endGame()
   if (score === 5) {
    console.log("Game Over !")
    scoreMark.innerHTML = "";
    questionText.innerHTML = "";
    GameContainer.style.background = "Navy";
    exhaustButton.innerText = "Round 2 5️⃣0️⃣0️⃣";
    exhaustButtonH.innerText = "Round 2 5️⃣0️⃣0️⃣0️⃣";
    surrenderBtnAnswer.style.display = "none";
    answerInput.style.display = "none"
    answerCheck.innerHTML = "🤍  🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍  🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 " 
     + score;
    score = 0;
}

    }
 }

function startGame() {

if(!started){

    if(time >= 0){

  interval= setInterval(timer, 1000); 
        started = true;
        time;
    }
    else{
        clearInterval (interval)
         started =false;
        countDowEl.innerHTML = "TIME OUT" 
   endGame()
    console.log("Game Over !")
    scoreMark.innerHTML = "";
    questionText.innerHTML = "";
    GameContainer.style.background = "Navy";
    exhaustButton.innerText = "Round 2 5️⃣0️⃣0️⃣";
    exhaustButtonH.innerText = "Round 2 5️⃣0️⃣0️⃣0️⃣";
    surrenderBtnAnswer.style.display = "none";
    answerInput.style.display = "none"
    answerCheck.innerHTML = "🤍  🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍  🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍 🤍"
    + score;
    score = 0;

    }
}
getData();
    exhaustButton.innerText = "FOR  5️⃣0️⃣0️⃣";
    exhaustButtonH.innerText = "FOR  5️⃣0️⃣0️⃣0️⃣";
    answerCheck.innerHTML = "";
    surrenderBtnAnswer.style.display = "block";
    answerInput.style.display = "block";
    greeted.style.display = "none";
}
function displayBtn() {
    surrenderBtnAnswer.style.display = "none";
    answerInput.style.display = "none";
    greeted.innerHTML = "❗JEOPARDY";
}
displayBtn();
function endGame(){

        score = 0;
        exhaustButton.innerText = "Restart";
        exhaustButtonH.innerText = "Restart";
        answerInput.value = "";
        questionText.innerHTML = "";
        GameContainer.style.background ="Black";
        scoreMark.innerHTML = " 🥇" + score;
        answerCheck.innerHTML = "🟦I-Beg-Your-Pardon_Bro🟦";
        setTimeout(function removeMessage() {
            answerCheck.innerHTML = " ";
        }, 2000)

}

