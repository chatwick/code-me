import Image from 'next/image'
import userPic from '../assets/user1.png'
import getDataId from "@/firebase/firestore/getDataId";
import deleteData from "@/firebase/firestore/deleteData";
import updateData from "@/firebase/firestore/updateData";
import { useState, FC, useEffect } from 'react'

type Message = {
    id: string
    message: string
    user: string
    userImage: string
    date: any
    time: any
}


const MessageCard: FC<Message> = ({ id, message, user, date, time, userImage }): JSX.Element => {
    const [updatedData, setUpdatedData] = useState(message);

    const getData = async () => {
        const newData: any = await getDataId(id)
        setUpdatedData(newData.message)
        console.log(newData)
        console.log(newData.message)
    }

    const openModal = () => {

    }

    const deleteMessage = async () => {
        try {
            await deleteData(id);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    }

    const updateMessage = async () => {
        await updateData(id, updatedData)
        //window.location.reload()
    }

    useEffect(() => {
        getData();
    }, [id]);
    //console.log(data)

    return (
        <>
            <div className="chat chat-start relative">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <Image src={userImage} width={500} height={500} alt="user" />
                    </div>
                </div>
                <div className="chat-header gap-1">
                    {user} &nbsp;
                    <time className="text-xs opacity-50">{time}</time>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info">
                            &#xFE19;
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><button onClick={()=>{
                                        getData()
                                        const modal = document.getElementById('editModal') as HTMLDialogElement
                                        modal.showModal()
                            }}>Edit</button></li>
                            <dialog id="editModal" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Update Message</h3>
                                    <p className="py-4">Press ESC key or click the button below to close</p>
                                    <textarea name="msg" value={message} onChange={(e) => setUpdatedData(e.target.value)} className="textarea textarea-bordered textarea-lg w-full max-w-xs flex items-stretch" />
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn" onClick={updateMessage}>Update</button>
                                            <button className="btn">Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                            <li><button onClick={deleteMessage}>Delete</button></li>
                        </ul>
                    </div>
                </div>
                <div className="chat-bubble chat-bubble-primary">
                    {message}
                </div>
                <div className="chat-footer opacity-50">
                    {date}
                </div>
            </div>

        </>
    )
}
export default MessageCard