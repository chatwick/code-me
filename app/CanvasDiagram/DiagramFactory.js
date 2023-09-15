import Connect from '../CanvasDiagram/Connection'

export default class DiagramFactory{

    constructor(context,id = 0,object){
        this.context = context
        this.id = id 
        this.object = object
        new Connect(this.object,this.context)
    }

    update(newObj){
        this.object = newObj
    }

}