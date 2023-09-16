export default class Text{

    constructor(value,context,position){
        this.position = position
        this.value = value
        this.context = context
        this.#draw()
    }

    #draw(){
        this.context.font = "25px Arial";
        this.context.fillStyle = "black"
        this.context.fillText(this.value,this.position.x+this.position.commonVal-10,this.position.y+this.position.commonVal+10);
    }
    
}