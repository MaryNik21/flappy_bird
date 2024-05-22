class Score {
    constructor(){
        this.score = 0;
        this.bestScore = localStorage.getItem('bestScore');

        this.audio = new Audio();
        this.audio.src = "./audio/score.mp3";
    }
    draw(ctx, cvs){
        ctx.fillStyle = "#000";
        ctx.font = "24px Verdana";
        ctx.fillText("Счёт: " + this.score, 10, cvs.height - 45)
        ctx.fillText("Лучший счёт: " + this.bestScore, 10, cvs.height - 20)
    }

    updateBestScore(currentScore){ 
        const parsedScore = parseInt(this.bestScore) || 0;
        if (currentScore > parsedScore){
            localStorage.setItem('bestScore', currentScore);
            this.bestScore = localStorage.getItem('bestScore');
        } 
    }
}
export default Score