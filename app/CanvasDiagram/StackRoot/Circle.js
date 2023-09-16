export default class Circle{
    constructor(context,position){
        this.context = context
        this.position = position
        this.color = 'pink' 
        this.#draw()
    }

    #draw(){
        // ctx.arc(x,y,r,starting,ending);
        this.context.beginPath();
        this.context.arc(this.position.x+this.position.commonVal, this.position.y+this.position.commonVal, 20, 0, 2 * Math.PI);
        this.context.fillStyle = this.color
        this.context.fill()
        this.context.closePath()
    }
}
