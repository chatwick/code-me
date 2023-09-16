import Text from '../StackRoot/Text'
import Circle from '../StackRoot/Circle'

export default class Root{
    
    constructor(object,context,position){
       this.context = context 
       this.object = object 
       this.position = position
       this.circle = null
       this.text = null
       this.classObj = null
       this.#draw()
    }
    
    #draw(){
        this.circle = new Circle(this.context,this.position)
        this.text = new Text(this.object.value,this.context,this.position)
    }
    
    noItem(){
        this.circle = new Circle(this.context,this.position)
        this.text = new Text(this.object.value,this.context,this.position)
    }
}