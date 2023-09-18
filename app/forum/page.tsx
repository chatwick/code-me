"use client"
import MessageCard  from "../components/MessageCard";
import addData from "@/config/firestore/addData";
import getData from "@/config/firestore/getData";
import { useState, useEffect } from "react";

type Message = {
  id: string
  message: string
  user: string
  userImage:string
  updatedDate: any
  updatedTime:any
  edited: boolean
}

export default function Home() {

  const [message,setMessage] = useState("");
  const [data, setData] = useState<Message[]>([]);

//  const newMessage={
//     message:"Hi I am new to Java",
//     user:"John Smith",
//     userImage:"/user1.png",
//     dateTime:"24-12-2023"
//  }

//  const newMessage2={
//   message:"Can you help me to understand OOP Concepts",
//   user:"John Smith",
//   userImage:"/user1.png",
//   dateTime:"24-12-2023"
// }

// const newMessage3={
//   message:"I think I have difficulty in understanding Abstaction and Encapsulation",
//   user:"John Smith",
//   userImage:"/user1.png",
//   dateTime:"24-12-2023"
// }

// const newMessage4={
//   message:"It will be really helpful if some can share some good tutorials",
//   user:"John Smith",
//   userImage:"/user1.png",
//   dateTime:"24-12-2023"
// }

// const newMessage5={
//   message:"You can check this website `https://www.w3schools.com/java/java_oop.asp` it will explain in a simple way",
//   user:"Dave Gray",
//   userImage:"/user2.png",
//   dateTime:"24-12-2023"
// }
// const newMessage6={
//   message:"Free code camp also had a good video on this check that out as well",
//   user:"Dave Gray",
//   userImage:"/user2.png",
//   dateTime:"24-12-2023"
// }
async function receiveData(){
  const newData:any = await getData()
  console.log(newData)
  setData(newData)
  
}
useEffect(()=>{
   receiveData()
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
      user: "John Smith"
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
    <div className="flex flex-col">
    <div>
    <header className="flex justify-between ml-4 items-center mb-4">
    <h1 className="text-2xl">Discussion Forum</h1>
    </header>
    {renderMessage}
    </div>
    <div>
    <form onSubmit={sendMessage}>
      <div className="fixed bottom-0 left-0 right-0 p-6">
      <div className="container flex justify-start items-center">
      <textarea name="msg" value={message} onChange={(e) => setMessage(e.target.value)} className="textarea textarea-bordered textarea-lg w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mr-2"/>
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
