"use client"

import React from 'react'
import { App } from './NewEditor'

export default function EditorUI() {

  return (
    <main>
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
        <App/>
        </div>
    </main>


  )
}
