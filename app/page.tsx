"use client"
import { MessageCard } from "./components/MessageCard";
import addData from "@/firebase/firestore/addData";
import { useState } from "react";

export default function Home() {

  const [message,setMessage] = useState("");

  async function sendMessage(data: FormData) {
    const msg = data.get("msg")?.valueOf()
    if(!msg){
      const error = document.getElementById('error') as HTMLFormElement
      error.value = "Message cannot be empty"
    }
    const msgData ={
      msg,
      user: "John Smith"
    }
    await addData(msgData)
    setMessage("")
  }

  return (
    <div className="flex flex-col h-screen">
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Discussion Forum</h1>
    </header>
    <MessageCard/>
    <form className="flex-grow" action={sendMessage}>
    <textarea name="msg" value={message} onChange={(e) => setMessage(e.target.value)} className="textarea textarea-bordered textarea-lg w-full max-w-xs flex items-stretch"/>
    <label className="label">
    <span id="error" className="label-text-alt text-red-600"></span>
  </label>
    <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Send</button>
    </form>
    </div>
  )
}
