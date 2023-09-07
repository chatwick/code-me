"use client"

import React from 'react'
import { App } from './NewEditor'
import Output from './Output'


export default function EditorUI()
{

  return (
    <main>
      <div className="flex flex-row">
        <div className=" rounded-md lg:w-2/3 lg:h-full sm:w-full shadow-4xl ">
          <App />
        </div>
        <div className="flex flex-auto">
          <Output />
        </div>
      </div>
    </main>


  )
}
