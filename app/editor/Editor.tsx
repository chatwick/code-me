"use client"

/**
 * NOTE: THIS EDITOR IS REDUNDANT
 * DO NOT USE THIS
 * KEEPING THIS TEMPORARILY
 * 
 * USE THE ONE IN "new-editor"
 * 
 */

import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export const TextEditor = () => {
    function handleEditorChange(value: any, event: any) {
        // here is the current value
      }
    
      function handleEditorDidMount(editor : any, monaco : any) {
        console.log('onMount: the editor instance:', editor);
        console.log('onMount: the monaco instance:', monaco);
      }
    
      function handleEditorWillMount(monaco : any) {
        console.log('beforeMount: the monaco instance:', monaco);
      }
    
      function handleEditorValidation(markers : any) {
        // model markers
        // markers.forEach(marker => console.log('onValidate:', marker.message));
      }
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
      onValidate={handleEditorValidation}
    />  )
}

