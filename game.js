//const cvs = document.getElementById("canvas");
//const ctx = cvs.getContext("2d");

//const bird = new Image();
const birdUp = new Image();
//const background = new Image();
//const floor = new Image();
const getReady = new Image();
const gameOver = new Image();
const tap = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

//bird.src = "images/bird.png";
birdUp.src = "images/wing_down.png";
//background.src = "images/background.png";
//floor.src = "images/floor.png";
getReady.src = "images/get_ready.png";
gameOver.src = "images/game_over.png";
tap.src = "images/tap.png";
//pipeUp.src = "images/pipe_up.png";
//pipeBottom.src = "images/pipe_bottom.png";

//const gap = 100;
const grav = 1.5;
let score = 0;
let isGameRunning = false;

//позиция птички
//let birdPos = {
//    x: 10,
//    y: 150,
//}

//let pipe = [{
  //  x: cvs.width,
    //y: 0,
//}];

function drawGame(){
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(floor, 0, cvs.height - floor.height);
    ctx.drawImage(bird, birdPos.x, birdPos.y);
    ctx.drawImage(getReady, 50, 245);
    ctx.drawImage(tap, 75, 300);
}

document.addEventListener('keydown', function(){
    if(!isGameRunning){
        startGame();
    }
});

function startGame(){
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(bird, birdPos.x, birdPos.y);
    
    for(let i = 0; i < pipe.length; i++){
        isGameRunning = true; 

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 75){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
            })
        }
        ctx.drawImage(floor, 0, cvs.height - floor.height);

        //условия столкновения птички с препятствиями
        if(birdPos.x + bird.width >= pipe[i].x
            && birdPos.x <= pipe[i].x + pipeUp.width
            && (birdPos.y <= pipe[i].y + pipeUp.height 
                || (birdPos.y + bird.height) >= pipe[i].y + pipeUp.height + gap
                ) 
            || (birdPos.y + bird.height) >= (cvs.height - floor.height)) {
                EndGame();
            }

        if (pipe[i].x == 5) {
            score++;
        }
    }

    birdPos.y += grav;
    requestAnimationFrame(startGame);

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт: " + score, 10, cvs.height - 20)
}

function EndGame(){
    isGameRunning = false; 
    ctx.drawImage(gameOver, 50, 150);
    window.cancelAnimationFrame();

    
}

document.addEventListener('keydown', function(){
    birdPos.y -= 50;
    ctx.drawImage(birdUp, birdPos.x, birdPos.y);
});

pipeBottom.onload = drawGame;
