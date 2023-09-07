import Root from '../CanvasDiagram/StackRoot/Root'
import StackLeaf from './StackLeaf/Leaf'

export default class Connection{
    
    nodeList = null
    constructor(obj,context){
        this.object = obj
        this.context = context
        this.nodeList = []
        this.#createNodes()
        this.objectLength =  null 
    }

    #createNodes(){
        
        try{
            this.objectLength=Object.keys(this.object).length
        }catch (e){
            console.log('error');
        }
        
        if(this.objectLength > 0){
            
            this.object.forEach(e => {
                
                const position = {
                    x:e.id * 60 ,y:e.id * 60, commonVal: 30 , lastItem: (e.id === this.objectLength - 1) ? true :false
                }
                
                if(e.id === 0){
                    this.nodeList.push(new Root(e,this.context,position))
                }else{
                    this.nodeList.push(new StackLeaf(e,this.context,position))
                }
            });
        }else{
                const position = {
                    x:60 ,y:60,commonVal:10
                }

                const e =
                    {
                        "id":0,
                        "value":'empty',
                        "parent_id":null,
                        "left_id":null,
                        "right_id":null,
                        "noItems":true
                    }

                const emptyItem = new Root(e,this.context,position)
                if(e.noItems===true){
                    // emptyItem.noItem()
                }
        }

        console.log(this.objectLength);
    }
}