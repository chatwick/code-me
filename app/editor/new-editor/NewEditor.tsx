"use client"

import React from 'react';
import ReactDOM from 'react-dom';

import Editor from '@monaco-editor/react';

export function App()
{
    return <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />;
}

