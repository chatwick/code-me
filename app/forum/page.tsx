"use client"
import MessageCard  from "../components/MessageCard";
import addData from "@/config/firestore/addData";
import getData from "@/config/firestore/getData";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../utility/dbFunctions";

type Message = {
  id: string
  message: string
  user: string
  userImage:string
  updatedDate: any
  updatedTime:any
  edited: boolean
}

export default function Forum() {

  const [message,setMessage] = useState("");
  const [user,setUser] = useState("");
  const [data, setData] = useState<Message[]>([]);
 
async function receiveData(){
  const newData:any = await getData()
  console.log(newData)
  setData(newData)
}

async function authenticate(){
  const currentuser = await getCurrentUser()
  const newuser:any = currentuser.user
  setUser(newuser.email)
  console.log(newuser.email)
}

useEffect(()=>{
   receiveData()
   authenticate()
},[])


async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault(); 
  if(!message){
    const error = document.getElementById('error') as HTMLFormElement
    error.innerHTML = "Message cannot be empty"
  }else{
    const error = document.getElementById('error') as HTMLFormElement
    error.innerHTML = ""
    const msgData ={
      message,
      user: user
    }
    setMessage("")
    await addData(msgData)
    receiveData()
  }
}

const renderMessage = data.map((msg) =>{
  //for(var msg of data){
   // console.log(msg.id)
    const newMessage={
      id:msg.id,
      message:msg.message,
      user:msg.user,
      auth:user,
      userImage:"/user2.png",
      date:msg.updatedDate.toString(),
      time:msg.updatedTime.toString(),
      edited:msg.edited
    }
      return(
        <MessageCard key={newMessage.id} {...newMessage}/>
      )
  //}
})

  return (
    <div className="flex flex-col h-screen">
    <div>
    <header className="flex justify-between ml-4 items-center mb-4">
    <h1 className="text-2xl">Discussion Forum</h1>
    </header>
    {renderMessage}
    </div>
    <div>
    <form onSubmit={sendMessage}>
      <div className="flex-grow bottom-0 left-0 right-0 p-6">
      <div className="container flex justify-start items-center">
      <textarea name="msg" value={message} onChange={(e) => setMessage(e.target.value)} className="textarea textarea-bordered textarea-lg w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mr-20"/>
      <button type="submit" className="btn btn-primary">Send</button>
      </div>
      <label className="label">
      <span id="error" className="label-text-alt text-red-600"></span>
      </label>
      </div>
    </form>
    </div>
    </div>
  )
}
