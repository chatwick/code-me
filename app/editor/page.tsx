"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor';
import Editor from '@monaco-editor/react';
import Output from './new-editor/Output';
import { Sandpack } from "@codesandbox/sandpack-react";
import Diagram from '../components/Diagram'


export default function EditorUI()
{
  const [sandboxEditorView, setSandboxEditorView] = useState(false)
  const [language, setLanguage]: any = useState('vanilla')
  const [terminalView, setTerminalView] = useState(false)
  const [data, setData] = useState('');
  const editorRef: any = useRef(null);

  useEffect(() =>
  {
    setData('newStack.push(12)newStack.push(23)newStack.pop()newStack.push(34)newStack.push(45)newStack.push(56)newStack.pop()newStack.pop()')
  }, [])

  function handleEditorChange(value: any, event: any)
  {
    console.log('here is the current model value:', value);
  }

  function handleEditorDidMount(editor: any, monaco: any)
  {
    editorRef.current = editor;
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
  }

  function handleEditorWillMount(monaco: any)
  {
    console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers: any)
  {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  const handleRun = () =>
  {
    alert(editorRef.current.getValue());
  }

  const handleEditorView = () =>
  {
    setSandboxEditorView(true)
    if (sandboxEditorView)
    {
      setSandboxEditorView(false)
    }
  }

  return (
    <main>
      <div className="flex items-center justify-center mb-5">
        {!sandboxEditorView && terminalView && <button className='btn btn-primary mx-5' onClick={handleRun} >Show value</button>}
        {!sandboxEditorView && !terminalView && <button className='btn btn-primary mx-5' onClick={() => setTerminalView(true)} >Show Terminal</button>}
        {!sandboxEditorView && terminalView && <button className='btn btn-primary mx-5' onClick={() => setTerminalView(false)} >Show Visualizer</button>}
        {sandboxEditorView && <button className='btn btn-primary mx-5' onClick={handleEditorView}>Show Editor</button>}
        {!sandboxEditorView && <button className='btn btn-primary mx-5' onClick={handleEditorView}>Show SandBox</button>}
      </div>
      <div className="flex flex-row">
        <div className="overlay rounded-md w-full shadow-4xl">
          {sandboxEditorView ?
            (<Sandpack
              theme="light"
              template={language}
              options={{
                editorHeight: "600px",
                showConsoleButton: true,
                showInlineErrors: true,
                showNavigator: true,
                showLineNumbers: true,
                showTabs: true,
              }}

            />) : (<Editor
              height="600px"
              defaultLanguage='javascript'
              defaultValue="// some comment"
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              beforeMount={handleEditorWillMount}
              onValidate={handleEditorValidation}
            />)}
        </div>
        <div className="mx-2">
          {!terminalView && !sandboxEditorView && <Diagram code={data} />}
          {terminalView && !sandboxEditorView && <Output />}
        </div>
      </div>
      <div className="">
        {sandboxEditorView &&
          <div className="flex items-center justify-center my-10">
            <button className='btn btn-primary mx-1 w-40' onClick={() => setLanguage('react')}>React</button>
            <button className='btn btn-primary mx-1 w-40' onClick={() => setLanguage('nextjs')}>NextJS</button>
            <button className='btn btn-primary mx-1 w-40' onClick={() => setLanguage('angular')}>Angular</button>
            <button className='btn btn-primary mx-1 w-40' onClick={() => setLanguage('static')}>HTML</button>
            <button className='btn btn-primary mx-1 w-40' onClick={() => setLanguage('vanilla')}>Javascript</button>
          </div>}
      </div>
    </main>


  )
}




// {sandboxEditorView ?
//   (<Sandpack
//     theme="light"
//     template={language}
//     options={{
//       editorHeight: "600px",
//       showConsoleButton: true,
//       showInlineErrors: true,
//       showNavigator: true,
//       showLineNumbers: true,
//       showTabs: true,
//     }}

//   />) : terminalView ? (<Editor
//     height="600px"
//     defaultLanguage='javascript'
//     defaultValue="// some comment"
//     onChange={handleEditorChange}
//     onMount={handleEditorDidMount}
//     beforeMount={handleEditorWillMount}
//     onValidate={handleEditorValidation}
//   />) : (<Diagram code={data} />)
// }
