class Pipe{
    constructor(cvs){
        this.pipeUp = new Image();
        this.pipeBottom = new Image();

        this.pipeUp.src = "images/pipe_up.png";
        this.pipeBottom.src = "images/pipe_bottom.png";

        this.gap = 100;

        this.pipesArr = [{
            x: cvs.width,
            y: 0,
        }];
    }

}
export default Pipe;