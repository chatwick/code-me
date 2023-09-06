'use client'
import { useEffect,useState } from 'react';
import DiagramFactory from '../CanvasDiagram/DiagramFactory'

function Diagram() {
  
  const [FileContent, setFileContent] = useState(0);
  const [FileContentType, setFileContentType] = useState(0);
  const [File, setFile] = useState([]);
  const [data, setData] = useState(null);
  const [obj,setObj] = useState([])
  const [objCount, setCount] = useState(0);
  const [ctx, setCtx] = useState(null);

  const pushOperations = [];
  const operations = [];

  const updateContext = (obj) =>{
    console.log('The object : ',obj);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
    new DiagramFactory(ctx, 0, obj);
  }
  
  
  const handlePrevious = () => {
    if(objCount===-1) return;
    setCount(objCount-1)
    const newObj = obj[objCount-1]
    updateContext(newObj)
  } 
  
  const handleNext = () => {
    if(objCount===obj.length - 1) return;
    setCount(objCount+1)
    const newObj = obj[objCount+1]
    updateContext(newObj)
  }
  
  const handleVisualize = () => {
    console.log(obj);
  }
  
  console.log('Object in Diagram : ',obj);

  useEffect(() => {
    // ###############################################################################
      const stackName = 'myStack' 
      const pushRegex = new RegExp(`${stackName}\\.push\\((\\d+)\\)`, 'g');
      const operationRegex = new RegExp(`(${stackName}\\.push|${stackName}\\.pop)\\(`, 'g');
      
      fetch('/code.java')
      .then((response) => response.text())
      .then((data) => {
        // console.log(data);
        setData(data)
        // get stack data from the file
        let match;
        while ((match = pushRegex.exec(data)) !== null) {
          pushOperations.push(parseInt(match[1]));
        }
        // get the type of the operation from the file
        let match1;
        while ((match1 = operationRegex.exec(data)) !== null) {
          const operationType = match1[1] === `${stackName}.push` ? 1 : 0;
          operations.push(operationType);
        }
        setFileContent(pushOperations)
        setFileContentType(operations)
        
        let mainObj = []
        let mainArr = 0 
      
        while(FileContent.length-1 >= mainArr){
          
          let subArr = mainArr
        let subObj = []
        let index = 0
        
        while(subArr >= index){
          
          let parentId = index - 1;
          if(index === 0) parentId = null;
          
          let chileId = index + 1;
          if(index === subArr) chileId = null;
          
          subObj.push({
            "id":index,
            "value":FileContent[index],
            "parent_id":parentId,
            "left_id":null,
            "right_id":chileId
          })
          
          index = index + 1;
        }
        
        mainObj.push(subObj) 
        mainArr = mainArr + 1
        // console.log('Main index : ',mainArr,'Object : ',subObj);
      }
      
      // console.log('Main object : ',mainObj);
      console.log('Object in FilerObject : ',mainObj);
      setFile(mainObj)
      setObj(mainObj)
      
      // return mainObj
      // }
    })
    .catch((error) => {
      console.error('Error fetching the file:', error);
    });

    // ###############################################################################
    const canvas = document.getElementById("myCanvas");
    // Check if the canvas and 2D context are available.
    
    if (canvas) {
      const context = canvas.getContext("2d");
      // Perform your transformations and draw your diagram here.
      context.translate(0, 0);
      // Create a DiagramFactory and draw your diagram using the 'context' here.
      new DiagramFactory(context, 0, obj[objCount]);
      // Update the state with the 2D context.
      setCtx(context);
    }
  },[data]);
  
  return (
    <div>
      <button className='text-black p-20 bg-slate-300 m-5 hover:bg-slate-800 hover:text-white' onClick={handleVisualize}>Visualize</button>
      <button className='text-black p-20 bg-slate-300 m-5 hover:bg-slate-800 hover:text-white' onClick={handlePrevious}>Previous</button>
      <button className='text-black p-20 bg-slate-300 m-5 hover:bg-slate-800 hover:text-white' onClick={handleNext}>Next</button>
      <canvas id='myCanvas' width="1000" height="1000" className='border-solid border-spacing-x-1 bg-gray-600'></canvas>
    </div>
  )
}

export default Diagram
