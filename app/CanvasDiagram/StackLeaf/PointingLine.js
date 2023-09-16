export default class PointingLine{
    constructor(context,position){
        this.context = context
        this.position = position
        this.#draw()
    }

    #draw(){

        this.context.beginPath();
        this.context.moveTo(this.position.x-50, this.position.y+28 );
        this.context.lineTo(this.position.x+10,this.position.y+28);
        this.context.lineTo(this.position.x-5,this.position.y+15);
        
        this.context.lineWidth = 3;
        this.context.strokeStyle = "red";
        this.context.stroke();
        this.context.closePath()
    }
}