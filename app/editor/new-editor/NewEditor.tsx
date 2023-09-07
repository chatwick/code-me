"use client"

import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import * as monaco from 'monaco-editor';


import Editor, { EditorProps, Monaco } from '@monaco-editor/react';

export function App({ onChange, language, code, theme }: any)
{

  // editor prop atributes
  const [value, setValue] = useState(code || "");
  const editorRef = useRef(null);
  const monacoRef = useRef(null);


  function handleEditorDidMount(editor: any, monaco: any)
  {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
    editorRef.current = editor;
    monacoRef.current = monaco;
  }

  function handleEditorWillMount(monaco: any)
  {
    console.log('beforeMount: the monaco instance:', monaco);
  }

  const handleEditorChange = (value: any, event: Event) =>
  {
    setValue(value);
    onChange("code", value);
    console.log('here is the current model value:', value);
  }

  return <Editor
    height="90vh"
    defaultLanguage="javascript"
    defaultValue="// some comment"
    onChange={() => handleEditorChange}
    beforeMount={() => handleEditorWillMount}
    onMount={() => handleEditorDidMount}
  />;
}
