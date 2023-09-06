'use client'
import { useEffect,useState } from 'react';
import DiagramFactory from '../CanvasDiagram/DiagramFactory'
import FilterObjects from './FilterObjects'

function Diagram() {
  
  // import the Set of Objects
  const [obj,setObj] = useState(FilterObjects('myStack'))
  // const [obj,setObj] = useState(FilterObjects('newStack'))

  const [objCount, setCount] = useState(0);
  const [ctx, setCtx] = useState(null);

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
    
    const canvas = document.getElementById("myCanvas");
    // Check if the canvas and 2D context are available.
    
    if (canvas) {
      const context = canvas.getContext("2d");
      // Perform your transformations and draw your diagram here.
      context.translate(70, 70);
      // Create a DiagramFactory and draw your diagram using the 'context' here.
      new DiagramFactory(context, 0, obj[objCount]);
      // Update the state with the 2D context.
      setCtx(context);
    }
  },[]);
  
  return (
    <div>
      <button className='text-black p-20 bg-slate-300 m-5 hover:bg-slate-800 hover:text-white' onClick={handleVisualize}>Visualize</button>
      <canvas id='myCanvas' width="1000" height="1000" className='border-solid border-spacing-x-1 bg-gray-600'></canvas>
      <button className='text-black p-20 bg-slate-300 m-5 hover:bg-slate-800 hover:text-white' onClick={handlePrevious}>Previous</button>
      <button className='text-black p-20 bg-slate-300 m-5 hover:bg-slate-800 hover:text-white' onClick={handleNext}>Next</button>
    </div>
  )
}

export default Diagram
