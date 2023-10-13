"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor';
import Editor from '@monaco-editor/react';
import Output from './new-editor/Output';
import { Sandpack } from "@codesandbox/sandpack-react";
import Diagram from '../components/Diagram'
import { FiDownload } from 'react-icons/fi'
import Link from 'next/link';
import { Renderer } from '../components/Renderer';
import ReactPDF, { Page, Text, View, Document, PDFDownloadLink } from '@react-pdf/renderer';
import { getCurrentUser } from '../utility/dbFunctions';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '@/config/firebase_config';

export default function EditorUI()
{
  const [sandboxEditorView, setSandboxEditorView] = useState(false);
  const [language, setLanguage]: any = useState('vanilla');
  const [terminalView, setTerminalView] = useState(false);
  const [data, setData] = useState('');
  const [editorCodes, setEditorCodes] = useState('');
  const [currentCode, setCurrentCode] = useState('const newStack = new Stack()\nnewStack.push(12)\nnewStack.push(23)\nnewStack.pop()\nnewStack.push(34)\nnewStack.push(45)\nnewStack.push(56)\nnewStack.pop()\nnewStack.pop()\nnewStack.pop()\nnewStack.push(67)\nnewStack.pop()\nnewStack.push(78)\nnewStack.push(89)\nnewStack.pop()\n')
  const editorRef: any = useRef(null);
  const editorChanges = useRef('');

  useEffect(() =>
  {
  }, [])

  function handleEditorChange(value: any, event: any)
  {
    editorChanges.current = value;
    // const divider = '\n// ********************     ********************\n';
    // setEditorCodes((current) => current + divider + value);
    setCurrentCode(value);
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

 const handleSaveChanges = () => {
  setEditorCodes((current) => {
    const date = new Date();
    const dateTime = date.getDate() + "/"
    + (date.getMonth()+1)  + "/" 
    + date.getFullYear() + " at "  
    + date.getHours() + ":"  
    + date.getMinutes();
    const divider = `\n***************************************** ${dateTime} *****************************************\n`;
    return current + divider + editorChanges.current;})
 }

  const AllInstances = () => (
    <Document>
      <Page size="A4">
        <View style={{ color: 'black', textAlign: 'center', margin: 30 }}>
          <Text>Code history from session start</Text>
        </View>
        <View style={{ margin: 5, fontSize: 10, border: 1 }}>
          <Text>{editorCodes}</Text>
        </View>
      </Page>
    </Document>
  );

  const CurrentInstance = () => (
    <Document>
      <Page size="A4">
        <View style={{ color: 'black', textAlign: 'center', margin: 30 }}>
          <Text>Current code block</Text>
        </View>
        <View style={{ margin: 5, fontSize: 10, border: 1 }}>
          <Text>{currentCode}</Text>
        </View>
      </Page>
    </Document>
  );

  const handleCodeUpdate = () =>{
      let code = currentCode
      const firestoreDocumentRef = doc(firestore, 'code', '0kaWl97ifllAabq0jgJM');
      updateDoc(firestoreDocumentRef, { code });
      alert('code is saved')
  }

  return (
    <main>

      <div className="flex items-center justify-center mb-5">
        {!sandboxEditorView && <button className='btn btn-primary mx-5' onClick={handleCodeUpdate} >Update Code</button>}
        {!sandboxEditorView && <button className='btn btn-primary mx-5' onClick={handleSaveChanges} >Save Changes</button>}
        {!sandboxEditorView && <button className='btn btn-primary mx-5' onClick={handleEditorView}>Show SandBox</button>}
        {!sandboxEditorView && terminalView && <button className='btn btn-primary mx-5' onClick={() => setTerminalView(false)} >Show Visualizer</button>}
        {!sandboxEditorView && !terminalView && <button className='btn btn-primary mx-5' onClick={() => setTerminalView(true)} >Show Terminal</button>}
        {sandboxEditorView && <button className='btn btn-primary mx-5' onClick={handleEditorView}>Show Editor</button>}

        <div className="">
          {!sandboxEditorView && <div className="dropdown">
            <label tabIndex={0} className="btn m-1"><FiDownload size={20} /></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><button><PDFDownloadLink document={<AllInstances />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Print all instances')}
              </PDFDownloadLink></button></li>
              <li><button><PDFDownloadLink document={<CurrentInstance />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Print current instance')}
              </PDFDownloadLink></button></li>
            </ul>
          </div>}
        </div>
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
defaultValue={currentCode}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              beforeMount={handleEditorWillMount}
              onValidate={handleEditorValidation}
            />)}
        </div>
        <div className="mx-2">
          {!terminalView && !sandboxEditorView && <Diagram />}
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
