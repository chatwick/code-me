"use client"

import React, { useState } from 'react';
import ReactDOM from 'react-dom';


import Editor from '@monaco-editor/react';

export function App({ onChange , language, code, theme } : any)
{
    const [value, setValue] = useState(code || "");
    function handleEditorDidMount(editor: any, monaco: any) {
        console.log('onMount: the editor instance:', editor);
        console.log('onMount: the monaco instance:', monaco);
      }
    
      function handleEditorWillMount(monaco: any) {
        console.log('beforeMount: the monaco instance:', monaco);
      }

    const handleEditorChange = (value: any) => {
        setValue(value);
        onChange("code", value);
      }


    return <Editor 
        height="90vh"
        defaultLanguage="javascript" 
        defaultValue="// some comment" 
        onChange={handleEditorChange}
        beforeMount={handleEditorWillMount}
        />;
}

