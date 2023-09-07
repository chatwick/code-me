"use client"

import React from 'react'
import * as monaco from 'monaco-editor';
import { Editor } from './Editor';

export default function EditorUI() {

  return (
    <main>
        <div className="overlay rounded-md w-full h-full shadow-4xl">
            <Editor/>
        </div>
    </main>


  )
}
