import Background from "./background.js";
import Bird from "./bird.js";
import Floor from "./floor.js";
import Pipe from "./pipe.js";
import Title from "./titles.js";
import Score from "./score.js";
import Buttons from "./buttons.js";

class Game {
    constructor(ID){
        this.cvs = document.getElementById(ID);
        this.ctx = this.cvs.getContext("2d");

        this.bird = new Bird();
        this.background = new Background();
        this.pipe = new Pipe(this.cvs);
        this.floor = new Floor(this.cvs);
        this.title = new Title();
        this.score = new Score();
        this.button = new Buttons();

        this.isGameRunning = false;
        this.GameOver = false;
        this.grav = 1;

        this.animationID;
    }
    draw(){
        this.ctx.drawImage(this.background.image, 0, 0);
        this.bird.draw(this.ctx);
        this.ctx.drawImage(this.floor.image, this.floor.position.x, this.floor.position.y);
    }
    play(){
        this.draw();

        this.GameOver = false;
        this.isGameRunning = true; 

        //this.bird.birdPos.y += this.grav;
        this.bird.fall();

        //движение пола
        this.floor.position.x -= 1;
        if (this.floor.position.x <= -this.floor.image.width){
            this.floor.position.x = 0;
        }
        this.ctx.drawImage(this.floor.image, this.floor.position.x + this.floor.image.width, this.floor.position.y);
        
        //движение труб
        for(let i = 0; i < this.pipe.pipesArr.length; i++){
            this.pipe.pipesArr[i].x--;
            
            this.pipe.pipesArr.forEach(pipe => {
                this.ctx.drawImage(this.pipe.pipeUp, this.pipe.pipesArr[i].x, this.pipe.pipesArr[i].y);
                this.ctx.drawImage(this.pipe.pipeBottom, this.pipe.pipesArr[i].x, this.pipe.pipesArr[i].y + this.pipe.pipeUp.height + this.pipe.gap);
            }); 
            
            //генерация новых труб
            if(this.pipe.pipesArr[i].x == 75){
                this.pipe.pipesArr.push({                     
                    x: this.cvs.width,
                    y: Math.floor(Math.random() * this.pipe.pipeUp.height) - this.pipe.pipeUp.height,
                })
            }

            //запись счёта
            if(this.pipe.pipesArr[i].x == 15){
                this.score.score++;
                this.score.audio.play();
            }

            //столкновение птички с трубами и полом
            if(this.bird.birdPos.x + this.bird.currenFrameWidth >= this.pipe.pipesArr[i].x
                && this.bird.birdPos.x <= this.pipe.pipesArr[i].x + this.pipe.pipeUp.width
                && (this.bird.birdPos.y <= this.pipe.pipesArr[i].y + this.pipe.pipeUp.height 
                    || (this.bird.birdPos.y + this.bird.currenFrameHeight) >= this.pipe.pipesArr[i].y + this.pipe.pipeUp.height + this.pipe.gap
                    ) 
                || (this.bird.birdPos.y + this.bird.currenFrameHeight) >= (this.cvs.height - this.floor.image.height)) {
                    this.GameOver = true;
                    this.isGameRunning = false;
                    cancelAnimationFrame(this.animationID);
                    this.score.updateBestScore(this.score.score);
                    this.GameStop();
                    return;
                }
            }
            this.score.draw(this.ctx, this.cvs);
    }
    run(){
        const self = this;

        function animate(){
            if(!self.GameOver){
                self.play();
                self.animationID = requestAnimationFrame(animate);
            }
        }

        animate();
        this.bird.play();
    }
    GameStop(){
        this.ctx.drawImage(this.title.gameOver, 50, 200);
        this.ctx.fillText("Счёт: " + this.score.score, 50, 260);
        this.ctx.fillText("Лучший счёт: " + this.score.bestScore, 50, 290);
        this.button.drawRestart(this.ctx);
        this.cvs.addEventListener("click", function(event){
            this.button.initRestart(this.cvs, event);
            if(this.button.restartActive){
                this.GameOver = false;
                this.score.score = 0;
                this.bird.birdPos.x = 15;
                this.bird.birdPos.y = 150;
                this.floor.position.x = 0;
                this.pipe.pipesArr = [{
                    x: this.cvs.width,
                    y: 0,
                }];;
               
                this.startPage();
            }
        }.bind(this))

    }

    startPage(){
        this.title.getReady.onload = () => {
            this.draw();
            this.button.drawStart(this.ctx);
            this.ctx.drawImage(this.title.getReady, 50, 200);
        }
        if (this.title.getReady.complete) {
            this.draw();
            this.ctx.drawImage(this.title.getReady, 50, 200);
        }

        //запуск по нажатию на клавиатуру
        document.addEventListener("keydown", () => {
            if(!this.isGameRunning){
                this.run();
            }
        })

        //запуск по нажатию на кнопку "Start"
        this.cvs.addEventListener("click", function(event){
            this.button.initStart(this.cvs, event);
            if(this.button.startActive){
                this.run();
            }
        }.bind(this))
    }
}

const game = new Game("canvas");
document.addEventListener("DOMContentLoaded", () =>{
    game.startPage();
})


