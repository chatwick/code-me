"use client"
import MessageCard  from "./components/MessageCard";
//import { collection, getDocs} from "firebase/firestore";
import addData from "@/firebase/firestore/addData";
import getData from "@/firebase/firestore/getData";
import { useState, useEffect } from "react";

type Message = {
  message: string
  user: string
  dateTime: Date
}

export default function Home() {

  const [message,setMessage] = useState("");

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
        user: "John Smith"
      }
      await addData(msgData)
      setMessage("")
    }
  }

 
//   async function getMessages(){
//     const querySnapshot = await getDocs(collection(db, "cities"));
//     querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
// });
//   }
async function receiveData(){
  console.log("This is receive data")
  await getData()
}
receiveData()

 const newMessage={
    message:"Hi I am new to Java",
    user:"John Smith",
    userImage:"/user1.png",
    dateTime:"24-12-2023"
 }

 const newMessage2={
  message:"Can you help me to understand OOP Concepts",
  user:"John Smith",
  userImage:"/user1.png",
  dateTime:"24-12-2023"
}

const newMessage3={
  message:"I think I have difficulty in understanding Abstaction and Encapsulation",
  user:"John Smith",
  userImage:"/user1.png",
  dateTime:"24-12-2023"
}

const newMessage4={
  message:"It will be really helpful if some can share some good tutorials",
  user:"John Smith",
  userImage:"/user1.png",
  dateTime:"24-12-2023"
}

const newMessage5={
  message:"You can check this website `https://www.w3schools.com/java/java_oop.asp` it will explain in a simple way",
  user:"Dave Gray",
  userImage:"/user2.png",
  dateTime:"24-12-2023"
}
const newMessage6={
  message:"Free code camp also had a good video on this check that out as well",
  user:"Dave Gray",
  userImage:"/user2.png",
  dateTime:"24-12-2023"
}
  return (
    <div className="flex flex-col h-screen">
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Discussion Forum</h1>
    </header>
    <MessageCard {...newMessage}/>
    <MessageCard {...newMessage2}/>
    <MessageCard {...newMessage3}/>
    <MessageCard {...newMessage4}/>
    <MessageCard {...newMessage5}/>
    <MessageCard {...newMessage6}/>
    <form className="flex-grow" onSubmit={sendMessage}>
    <textarea name="msg" value={message} onChange={(e) => setMessage(e.target.value)} className="textarea textarea-bordered textarea-lg w-full max-w-xs flex items-stretch"/>
    <label className="label">
    <span id="error" className="label-text-alt text-red-600"></span>
    </label>
    <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Send</button>
    </form>
    </div>
  )
}
