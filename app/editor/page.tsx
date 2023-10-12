"use client"

import React, { useRef, useState } from 'react'
import * as monaco from 'monaco-editor';
import Editor from '@monaco-editor/react';
import Output from './new-editor/Output';
import { Sandpack } from "@codesandbox/sandpack-react";

export default function EditorUI()
{
  const [sandboxEditorView, setSandboxEditorView] = useState(false)
  const [language, setLanguage] = useState('vanilla')
  const editorRef: any = useRef(null);

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
          <button className='btn btn-primary' onClick={handleRun} >Show value</button>
          {sandboxEditorView && <button className='btn btn-primary mx-5' onClick={handleEditorView}>Show SandBox</button>}
          {!sandboxEditorView && <button className='btn btn-primary mx-5' onClick={handleEditorView}>Show Editor</button>}
        </div>
      <div className="flex flex-row">
        <div className="overlay rounded-md w-full shadow-4xl">
          {sandboxEditorView ?
            <Sandpack
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

            /> : <Editor
              height="600px"
              defaultLanguage='javascript'
              defaultValue="// some comment"
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              beforeMount={handleEditorWillMount}
              onValidate={handleEditorValidation}
            />}
        </div>
        {/* <Output /> */}

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
