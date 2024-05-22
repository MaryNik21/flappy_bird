class Bird{
    constructor(){
        this.wingUp = new Image();
        this.wingStraight = new Image();
        this.wingDown = new Image();

        this.wingUp.src = "./images/wingUp.png"
        this.wingStraight.src = "./images/wingStraight.png"
        this.wingDown.src = "./images/wingDown.png"

        this.birdPos = {
            x: 15,
            y: 150,
        }

        this.audio = new Audio();
        this.audio.src = "./audio/fly.mp3"

        //анимация птички
        this.frameIndex = 0;
        this.frames = [              
            this.wingUp,
            this.wingStraight,
            this.wingDown
        ];

        this.currenFrame = this.frames[this.frameIndex];
        this.currenFrameHeight = this.currenFrame.height;
        this.currenFrameWidth = this.currenFrame.width;

        this.frameInterval = 200;
        this.lastFrameChange = Date.now();

        this.gravitation = 1;
    }
    draw(ctx){
        const currenFrame = this.frames[this.frameIndex];
        ctx.drawImage(this.frames[this.frameIndex], this.birdPos.x, this.birdPos.y, currenFrame.width, currenFrame.height);

        if(Date.now() - this.lastFrameChange > this.frameInterval){
            this.frameIndex = (this.frameIndex + 1) % this.frames.length;
            this.lastFrameChange = Date.now();
        }
    }
    fall(){
        this.gravitation += 0.05;
        this.birdPos.y += this.gravitation;
    }

    play(){
        document.addEventListener("keydown", () => {
            this.gravitation = 1;
            this.birdPos.y -= 50;
            this.audio.play();
        });
    }
}

export default Bird;