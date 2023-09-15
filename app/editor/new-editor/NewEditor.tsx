"use client"

import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import * as monaco from 'monaco-editor';


import Editor, { EditorProps, Monaco } from '@monaco-editor/react';
import { log } from 'console';

export function App({ onChange, language, code, theme }: any)
{

  // editor prop atributes
  const [value, setValue] = useState(code || "");
  const [codes, setCodes] = useState(code || "");

  // const editorRef = useRef(null);
  // const monacoRef = useRef();

  const editorRef = useRef(null) as React.MutableRefObject<null | HTMLInputElement>;
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(editor: any, monaco: any)
  {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
    editorRef.current = editor;
    monacoRef.current = monaco;

    setTimeout(() =>
    {
      monacoRef.current?.hb.get('editor.action.formatDocument').b();
    }, 1000);
  }

  function handleEditorWillMount(monaco: any)
  {
    console.log('beforeMount: the monaco instance:', monaco);
  }

  const handleEditorChange = (value: any, event: monaco.editor.IModelContentChangedEvent) =>
  {
    setValue(value);
    setCodes(value)
    onChange("code", value);
    console.log('here is the current model value:', value);

    setTimeout(() =>
    {
      console.log(value);
    }, 1000);
  }

  return <Editor
    height="90vh"
    value={codes}
    defaultLanguage="javascript"
    defaultValue="// some comment"
    onChange={() => handleEditorChange}
    beforeMount={() => handleEditorWillMount}
    onMount={() => handleEditorDidMount}
  />;
}
