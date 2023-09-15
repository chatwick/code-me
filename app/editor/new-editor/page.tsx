"use client"
import React,{useState,useEffect} from 'react'
import { App } from './NewEditor'
import Output from './Output'
import Diagram from '../../components/Diagram'

export default function EditorUI()
{
  const [data, setData] = useState('');
  const [view, setView] = useState(true);

  useEffect(() => {
    setData('newStack.push(12)newStack.push(23)newStack.pop()newStack.push(34)newStack.push(45)newStack.push(56)newStack.pop()newStack.pop()')
  }, [])

  const handleview = () => {
      const viewState = view===true ? false : true ;  
      setView(viewState)
  }
   

  return (
    <main>
      <button className='btn btn-primary m-1' onClick={handleview}>{view ? 'Visualizer':'Output'}</button>
      <div className="flex flex-row">
        <div className=" rounded-md lg:w-2/3 lg:h-full sm:w-full shadow-4xl ">
          <App />
        </div>
        <div className="flex flex-auto">
          { view ? <Output/> : <Diagram code={data}/> }
        </div>
      </div>
    </main>


  )
}
