class Background{
    constructor(){
        this.image = new Image();
        this.image.src = "./images/background.png";
    }

    draw(ctx){
        ctx.drawImage(this.image, 0, 0);
    }
}
export default Background;