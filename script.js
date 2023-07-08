let ballMove = false; // Boolean which states if the ball will move
let ball = document.getElementById("ball");
let bar = document.querySelectorAll(".bar");
let screen = document.getElementById("screen");
let barHorizontal = 0;   //Horizontal position of bars
let ballY=100;          //Positon of ball in  y axis
let score=0;
let ballX=0;            //Position of ball in X axis
const barSensitivity=20;    //Moving sensitivity of bars
let playerName=prompt("What's players name?");
let scoreResults=document.getElementById("score-results");

// Theme swapping
let light=document.getElementById("day-theme");
let dark=document.getElementById("night-theme");
let theme=document.getElementsByClassName("theme");
theme[0].addEventListener("click",()=>{
    document.querySelector("#start-instruction").style.color="rgb(11,11,39)";
    screen.style.backgroundColor="whitesmoke";
    for(let y=0; y<bar.length;y++){
        bar[y].style.backgroundColor="rgb(11, 11, 39)"
    }
    ball.style.backgroundColor="rgb(11,11,39)";
    light.style.display="none";
    dark.style.display="block";
})
theme[1].addEventListener("click",()=>{
    document.querySelector("#start-instruction").style.color="whitesmoke";
    screen.style.backgroundColor="rgb(11,11,39)";
    for(let y=0; y<bar.length;y++){
        bar[y].style.backgroundColor="whitesmoke"
    }
    ball.style.backgroundColor="whitesmoke";
    light.style.display="block";
    dark.style.display="none";
})


// Code to disappear message on pressing S key
window.addEventListener("keydown", (event) => {
    if(event.key.toLowerCase()=="s"){
        document.querySelector("#start-instruction").style.display = "none";
        ballMove = true; // Ball will start moving
    }
});

// Function to move the ball
let ballXVelocity=3;        // These are velocity of bars in given axes.
let ballYVelocity=3;
function ballMoveFunc() {
    ballX += ballXVelocity; // Example: Increment the ball's X position by 1
    ball.style.left = ballX + "px";     
    let stopId=requestAnimationFrame(ballMoveFunc); // Call the function again for the next frame
    if(ball.getBoundingClientRect().right>screen.getBoundingClientRect().right){
        ballXVelocity=-3;       //if ball hits edges of screen on right and left side, it would make them reflect
    }
    else if(ball.getBoundingClientRect().left<screen.getBoundingClientRect().left){
        ballXVelocity=3;
    }
    //IF ball hits bar on top side
    if(ball.getBoundingClientRect().top<bar[0].getBoundingClientRect().top && ball.getBoundingClientRect().left>=bar[0].getBoundingClientRect().left && ball.getBoundingClientRect().right<=bar[0].getBoundingClientRect().right){
        ballYVelocity=3
        score+=1;
        document.getElementById("score").innerText=score;
    }
    // if ball hits bar on bottom side, a score will be incremented plus it will reflect
    else if(ball.getBoundingClientRect().top>bar[1].getBoundingClientRect().top && ball.getBoundingClientRect().left>=bar[0].getBoundingClientRect().left && ball.getBoundingClientRect().right<=bar[0].getBoundingClientRect().right){
        ballYVelocity=-3;
        score+=1;  
        document.getElementById("score").innerText=score; 
    }   
    // If ball passes untouched it stops moving and a message game over will be displayed, plus score and highest score would be shown
    else if(ball.getBoundingClientRect().top>bar[1].getBoundingClientRect().top+10 || ball.getBoundingClientRect().top<bar[0].getBoundingClientRect().top-10){
        if(localStorage.getItem("Highest")==undefined || localStorage.getItem("Highest")<score){
            localStorage.setItem("Highest",score);
            localStorage.setItem("Player",playerName);
        }
        ballMove=false;
        document.getElementById("start-instruction").style.display = "inline-block";
        document.getElementById("start-instruction").innerText="Game Over";
        ball.style.display="none";
        cancelAnimationFrame(stopId);
        let bodyElements=document.querySelectorAll("body>*");
        for(let i=0;i<bodyElements.length;i++){
            bodyElements[i].style.filter="blur(3px)";
        }
        scoreResults.style.filter="none";
        scoreResults.style.display="flex";
        document.getElementById("result").innerText=`Your score is ${score}. The highest score is ${localStorage.getItem("Highest")} by ${playerName}, would you like to play again?`;
        document.querySelector("#yes-regame").addEventListener("click",()=>{
            location.reload();
        })
        document.querySelector("#no-regame").addEventListener("click",()=>{
            scoreResults.style.display="none";
            for(let i=0;i<bodyElements.length;i++){
                bodyElements[i].style.filter="none";
            }
        })
        if(scoreResults.style.display=="none"){
            
        }
    }
    // This is for ball movement in y axis, it will keep updating the value with each frame and thus ball appears to be moving.
    ballY +=ballYVelocity;
    ball.style.top=ballY + "px";
}

// Event listener to move the bars
window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() == "a") {
        let b = document.querySelector(".bar");
        if (b.getBoundingClientRect().left > screen.getBoundingClientRect().left) {
            barHorizontal -= barSensitivity;
            for (let x = 0; x < bar.length; x++) {
                bar[x].style.transform = "translateX(" + barHorizontal + "px) ";
            }
        }
    } else if (event.key.toLowerCase() == "d") {
        let b = document.querySelector(".bar");
        if (b.getBoundingClientRect().right < screen.getBoundingClientRect().right) {
            barHorizontal += barSensitivity;
            for (let x = 0; x < bar.length; x++) {
                bar[x].style.transform = "translateX(" + barHorizontal + "px) ";
            }
        }
    }
});

// Start the ball movement
function startBallMovement() {
    if (ballMove) {
        ballMoveFunc();
    } else {
        requestAnimationFrame(startBallMovement);
    }
}

// Start the ball movement initially
requestAnimationFrame(startBallMovement);
