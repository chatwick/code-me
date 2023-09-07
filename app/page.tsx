import { randomUUID } from "crypto";
import { MessageCard } from "./components/MessageCard";
import addData from "@/firebase/firestore/addData";

export default function Home() {

  async function sendMessage(data: FormData) {
    "use server"
    const message = data.get("msg")?.valueOf()
    const { result, error } = await addData('discussion','M001', message)

    if (error) {
      return console.log(error)
    }
  }

  return (
    <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Discussion Forum</h1>
    </header>
    <MessageCard/>
    <form action={sendMessage}>
    <textarea name="msg" className="textarea textarea-bordered textarea-lg w-full max-w-xs flex items-stretch"/>
    <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Send</button>
    </form>
    </>
  )
}
