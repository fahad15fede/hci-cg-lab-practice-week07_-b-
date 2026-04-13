let mode = 1;
let running = false;
let score = 0;
let correctCount=0;
let currentChar = "";

let startTime = 0;
let timeLeft = 30;
let timeInterval;
let trials=0;
let gameData = [];

let subMode = 1;
let pattern = [];
let userPattern = [];
let showingPattern = false;


const display = document.getElementById("display");
const scoreEl = document.getElementById("score");
const instruction = document.getElementById("instruction");
const correctSound = document.getElementById("correct_sound");
const wrongSound = document.getElementById("wrong_sound");
const timerEnd = document.getElementById("timerEnding_sound");
const timerDisplay = document.getElementById("timer");
const trialsEl = document.getElementById("trials");

const patternBox = document.getElementById("patternBox");
const colorContainer = document.getElementById('color-container');
const mode3Tabs = document.getElementById('mode3-sub-tabs');

function switchMode(m){
    mode = m;
    running = false;
    clearInterval(timeInterval); 

    score = 0;
    trials = 0;
    correctCount = 0;

    scoreEl.textContent = score;
    trialsEl.textContent = 0;
    document.getElementById("acc").textContent = 0;

    display.textContent = "Press SPACE to start";

    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach(btn => btn.classList.remove("active"));
    tabs[m-1].classList.add("active");

    if(mode !== 3){
    mode3Tabs.style.display = "none";
    display.style.display = "flex";
    colorContainer.style.display = "none";
    }

    if (mode === 1){
        instruction.textContent = "Mode 1: Press L for letters, A for numbers.";
    }
    else if (mode === 2){
        instruction.textContent = "Mode 2: Press the displayed alphanumeric key.";
    }
    else{
        instruction.textContent = "Mode 3: Remember the pattern, and repeat it.";
        mode3Tabs.style.display='block';
        display.style.display='none';
        
        colorContainer.style.display = 'none';
        patternBox.style.display = 'flex';

        // document.querySelectorAll('.sub-tab-btn').forEach(btn=> btn.classList.remove('active'));
        // document.querySelectorAll('.sub-tab-btn')[m-1].classList.add('active');

        // ✅ RESET BUTTON STATES
        const subBtns = document.querySelectorAll('.sub-tab-btn');
        subBtns.forEach(btn => btn.classList.remove('active'));

        // ✅ SET FIRST BUTTON ACTIVE (default)
        subBtns[0].classList.add('active');

        // ✅ RESET GAME STATE
        pattern = [];
        userPattern = [];
        patternBox.textContent = "Press SPACE to Start";

        switchSubMode(1);  //ensure to make subMode1 the default for mantaining flow 
    }
} 

//sub modes for 3
function switchSubMode(m){

    subMode = m;

    const subBtns = document.querySelectorAll('.sub-tab-btn');
    subBtns.forEach(btn=> btn.classList.remove('active'));
    subBtns[m-1].classList.add('active');

    //reset state
    pattern =[];
    userPattern = [];
    patternBox.textContent = "Press SPACE to Start";

    if(subMode === 1){
        instruction.textContent = "Memorize the alpha-numeric sequence and type it out.";

        patternBox.style.display = 'flex';
        colorContainer.style.display = 'none';
    }
    else{
        instruction.textContent = "Watch the color pattern and repeat it.";
        
        patternBox.style.display = 'none';
        colorContainer.style.display = 'grid';
    }
}

function randomChar(){
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    const numbers = "0123456789";
    let random = 0;

    if(mode ===1){
        random =  Math.random();
        if(random<0.5){
            return letters[Math.floor(Math.random() * letters.length)]
        }
        else{
            return numbers[Math.floor(Math.random() * numbers.length)]
        }
    }
    else if(mode===2 || (mode===3 && subMode===1)){
        const all = letters+numbers;
        return all[Math.floor(Math.random() * all.length)]
    }
}

//mode 3 pattern generator
function showPatternText(){
    showingPattern=true;
    pattern.push(randomChar());

    patternBox.textContent = pattern.join(" ");

    setTimeout(()=>{
        patternBox.textContent="Now type...";
        showingPattern=false;
        userPattern = [];
    },2100);

}

const colors = ['red', 'green', 'blue', 'yellow'];

function flashColor(color){
    const box = document.querySelector(`[data-color="${color}"]`);
    box.classList.add("active");

    setTimeout(()=>{
        box.classList.remove("active");
    }, 500);
}

function showColorPattern(){
    showingPattern=true;
    const randomColor =colors[Math.floor(Math.random()*4)];
    pattern.push(randomColor);

    let i=0;
    let interval = setInterval(()=>{
        flashColor(pattern[i]);
        i++;
        if(i >= pattern.length){
            clearInterval(interval);
            showingPattern=false;
            userPattern = [];
        }
    }, 700);
}

document.querySelectorAll(".color-box").forEach(box=>{
    box.addEventListener("click", ()=>{

        if(mode!==3 || subMode!==2 || showingPattern) return;

        const color = box.dataset.color;
        userPattern.push(color);

        let index = userPattern.length-1;

        if(userPattern[index] != pattern[index]){
            wrongSound.currentTime=0;
            wrongSound.play();

            box.style.boxShadow = "0 0 25px red";

            setTimeout(()=>{
                box.style.boxShadow = "none";
            }, 800);

            pattern = [];
            showColorPattern();
            return;
        }

        if(userPattern.length === pattern.length){
            correctSound.currentTime=0;
            correctSound.play();

            box.style.boxShadow = "0 0 25px lime";

            setTimeout(()=>{
                box.style.boxShadow = "none";
            }, 800);

            score++;
            scoreEl.textContent=score;
            showColorPattern();
        }
    });
});



// function nextRound() {

//     if (!running) return;
    
//     currentChar = randomChar();
//     display.textContent = currentChar;

//     setTimeout(() => { 
//             if (running) nextRound(); 
//             }, 2000);
// }

function showNext() {
    currentChar = randomChar();
    display.textContent = currentChar;
}

function downloadCSV(){
    let csv = "Mode, Stimulus, KeyPressed, Correct, ReactionTime(ms)\n";

    gameData.forEach(row =>{
        csv+= `${row.mode}, ${row.stimulus}, ${row.keyPressed}, ${row.correct}, ${row.reactionTime}\n`;
    });

    let blob = new Blob([csv], {type:"text/csv"});
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href=url;
    a.download = "keyboard_game_data.csv";
    a.click();
}

function downloadCSVMode3(){

}

function startTimer(){
    clearInterval(timeInterval);
    timeLeft=30;
    timerDisplay.textContent = timeLeft;

    timeInterval = setInterval(()=>{
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if(timeLeft <= 5){
            timerDisplay.style.color = "red";
            if(timeLeft>0){
                timerEnd.currentTime=2;
                timerEnd.play();
            }
        }else{
            timerDisplay.style.color = "lime";
        }

        if(timeLeft<=0){
            endGame();
        }
    },1000);
}

function endGame(){
    running = false;
    clearInterval(timeInterval);
    display.textContent = "⏱️Time's Up";
    if(mode ===1 || mode === 2)
        downloadCSV();
    else{
        downloadCSVMode3();
    }
}

document.addEventListener("keydown", (e)=>{

    
    if(e.code === "Space" && !running){
        running = true;
        score = 0;
        trials = 0;
        scoreEl.textContent = score;
        gameData = [];
        correctCount=0;
        trialsEl.textContent=0;
        document.getElementById("acc").textContent=0;
        startTime = Date.now();
        
        startTimer();
        if(mode ===3){
            pattern=[];
            userPattern=[];
            if(subMode===1){
                showPatternText();
            }else{
                showColorPattern();
            }
        }else{
            showNext();
        }
        return;
    }
    if(Date.now() - startTime < 100) return;
    
    if(!running) return;

    if(e.code === "Space") return;
    
    let reactionTime = Date.now()-startTime
    let correct = false;
    
    if (mode === 1){
        if(/[A-Z]/.test(currentChar) && e.key.toLowerCase() === 'l'){
            correct = true;
        }
        else if (/[0-9]/.test(currentChar) && e.key.toLowerCase() === "a") {
            correct = true; }
        }
    else if (mode === 2){

            const key = e.key.length === 1 ? e.key.toUpperCase() : "";
            console.log("Pressed:", e.key, "Expected:", currentChar);
            if(key === currentChar){
                correct = true;
            }
        }
    else{
        
        if(subMode===1){
            if(showingPattern) return;
            userPattern.push(e.key.toUpperCase());

            let index = userPattern.length-1;

            if(userPattern[index] != pattern[index]){
                wrongSound.currentTime=0;
                wrongSound.play();

                patternBox.style.boxShadow = "0 0 25px red";

                setTimeout(()=>{
                    patternBox.style.boxShadow = "0 0 20px #f0faff";
                }, 800);

                pattern=[];
                showPatternText();
                return;
            }
            if(userPattern.length===pattern.length){
                correctSound.currentTime=0
                correctSound.play();

                patternBox.style.boxShadow = "0 0 25px lime";

                setTimeout(()=>{
                    patternBox.style.boxShadow = "0 0 20px #f0faff";
                }, 800);

                score++;
                scoreEl.textContent=score;
                showPatternText();
            }
            return;
        }
        return;
    }

    if(correct){
        score++;
        correctCount++;
        correctSound.currentTime = 0;
        correctSound.play();
        display.style.boxShadow= "0 0 25px lime";
    }
    else{
        score--;
        wrongSound.currentTime=0;
        wrongSound.play();
        display.style.boxShadow= "0 0 25px red";
    }

    setTimeout(() => {
        display.style.boxShadow= "0 0 20px #f0faff";
    }, 1300);
    trials++;
    trialsEl.textContent = trials;
    let accuracy =((correctCount / trials) * 100).toFixed(2);
    document.getElementById("acc").textContent = accuracy;
    if(accuracy >= 80){
        document.getElementById("acc").style.color = "lime";
    } else {
        document.getElementById("acc").style.color = "red";
    }
    scoreEl.textContent = score;

    //storing data
    gameData.push({
        mode : mode,
        stimulus: currentChar,
        keyPressed: e.key.toUpperCase(),
        correct : correct,
        reactionTime: reactionTime,
        trials: trials,
        timestamp: Date.now()
    });

    startTime = Date.now();
    showNext();
});