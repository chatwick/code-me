export default class Circle{
    constructor(context,position){
        this.context = context
        this.position = position
        this.#draw()
    }

    #draw(){
        
        this.context.beginPath();
        // context.arc(x, y, radius , sAngle, eAngle, counterclockwise)
        this.context.arc(this.position.x+this.position.commonVal, this.position.y+this.position.commonVal, 20, 0, 2 * Math.PI);
        this.context.shadowBlur = 15;         // Blur radius of the shadow
        this.context.shadowColor = 'black';  // Color of the shadow
        this.context.shadowOffsetX = 15;      // Horizontal offset of the shadow
        this.context.shadowOffsetY = 15;      // Vertical offset of the shadow
        this.context.fillStyle = 'pink'
        this.context.fill()
        this.context.closePath()
        
    }
    
    change(){
        // this.context.
        return 'white'
    }
}
