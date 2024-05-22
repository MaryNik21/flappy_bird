class Floor{
    constructor(cvs){
        this.image = new Image();
        this.image.src = "./images/floor.png";

        this.position = {
            x: 0,
            y: cvs.height - this.image.height,
        }
    }

}
export default Floor;
