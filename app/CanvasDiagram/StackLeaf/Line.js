export default class Line{
    constructor(context,position){
        this.context = context
        this.position = position
        this.#draw()
    }

    #draw(){

        this.context.beginPath();
        this.context.moveTo(this.position.x-this.position.commonVal, this.position.y-this.position.commonVal);
        this.context.quadraticCurveTo((this.position.x+40)+this.position.commonVal, (-(this.position.y)/5)+this.position.commonVal, this.position.x+5+this.position.commonVal, this.position.y-20+this.position.commonVal);
        this.context.lineTo(this.position.x+20+this.position.commonVal,this.position.y-40+this.position.commonVal);
        
        this.context.lineWidth = 3;
        this.context.strokeStyle = "pink";
        this.context.stroke();
        this.context.closePath()
    }
}
