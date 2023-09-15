export default class Text{

    constructor(object,context,position){
        this.position = position
        this.object = object
        this.context = context
        this.color = 'black'
        this.#draw()
    }

    #draw(){
        this.context.font = "25px Arial";
        this.context.fillStyle = this.color
        this.context.fillText(this.object, this.position.x-13+this.position.commonVal, this.position.y+6+this.position.commonVal);
        if(this.position.lastItem){
            this.context.font = "25px Arial";
            this.context.fillStyle = 'red'
            this.context.fillText('Top', this.position.x-50, this.position.y+20);
        }
    }
    
    change(val){
        this.color = val
        console.log('here');
    }
}