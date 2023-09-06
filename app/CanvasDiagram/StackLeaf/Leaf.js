import Circle from './Circle'
import Text from './Text'
import Line from './Line'
import PointingLine from './PointingLine'

export default class StackLeaf{

    constructor(object,context,position){
       this.context = context 
       this.object = object
       this.position = position
       this.circle = null
       this.text = null
       this.line = null
       this.pointingLine = null
       this.#draw()
    }

    #draw(){

        this.circle = new Circle(this.context,this.position)
        this.text = new Text(this.object.value,this.context,this.position)
        this.line = new Line(this.context,this.position)
        if(this.position.lastItem){
            this.pointingLine = new PointingLine(this.context,this.position)
        }    
    }

    changeProperties(val){
        this.text.change(val)
    }
}