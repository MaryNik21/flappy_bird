class Buttons{
    constructor(){
        this.Start = new Image();
        this.Start.src = "./images/startBtn.png"

        this.Restart = new Image();
        this.Restart.src = "./images/restartBtn.png";

        this.startActive = false
        this.restartActive = false;
    }
    drawStart(ctx){
        ctx.drawImage(this.Start, 90, 380, 82, 28);
    }
    drawRestart(ctx){
        ctx.drawImage(this.Restart, 50, 310, 82, 28);
    }
    initStart(cvs, event){
        let x = event.clientX - cvs.getBoundingClientRect().left;
        let y = event.clientY - cvs.getBoundingClientRect().top;
        if (x > 90 && x < 172 && y > 380 && y < 402) {
            this.startActive = true;
        }
    }
    initRestart(cvs, event){
        let x = event.clientX - cvs.getBoundingClientRect().left;
        let y = event.clientY - cvs.getBoundingClientRect().top;
        if (x > 50 && x < 132 && y > 310 && y < 338) {
            this.restartActive = true;
        }
    }

}
export default Buttons;