import Image from 'next/image'
import userPic from '../assets/user1.png'
import getDataId from "@/config/firestore/getDataId";
import deleteData from "@/config/firestore/deleteData";
import updateData from "@/config/firestore/updateData";
import { useState, FC, useEffect, useRef } from 'react'

type Message = {
    id: string
    message: string
    user: string
    auth: string
    userImage: string
    date: any
    time: any
    edited: boolean
}


const MessageCard: FC<Message> = ({ id, message, user, date, time, userImage, edited, auth }): JSX.Element => {
    const [updatedData, setUpdatedData] = useState(message);
    const modalRef = useRef<HTMLDialogElement | null>(null)
    

    const getData = async () => {
       try{
        const newData: any = await getDataId(id)
        setUpdatedData(newData.message)
       }catch(error){
        console.log("Error: ",error)
       }

    }

    const deleteMessage = async () => {
        try {
            await deleteData(id);
            //window.location.reload();
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    }

    const updateMessage = async () => {
        try{
            await updateData(id, updatedData)
            closeModal()
            //window.location.reload();
        }catch(error){
            console.error("Error updating message: ",error)
        }
    }

    const openModal = () => {
        getData();
        if(modalRef.current){
            modalRef.current.showModal()
        }
    }

    const closeModal = () => {
        setUpdatedData(message);
        if(modalRef.current){
            modalRef.current.close()
        }
    }

    const isEdit = () => {
        if(edited.toString()==="true"){
            return(
                <span id="edit" className="label-text-alt text-yellow-400">&nbsp; Edited *</span>
            )
        }
    }

    const returnDropdown = () => {
        if(auth==user){
            return(
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info">
                    &#xFE19;
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button onClick={openModal}>Edit</button></li>          
                    <li><button onClick={deleteMessage}>Delete</button></li>
                </ul>
            </div>
            )
        }
    }

    var style: string = "chat chat-start relative"
    var color: string ="chat-bubble chat-bubble-success"
    var userName: any = (user || '').split("@",1)
    if(auth==user){
        style = "chat chat-end relative"
        color = "chat-bubble chat-bubble-warning"
        userImage = "/user1.png"
    }

    useEffect(()=>{
        getData()
     },[id])
    //console.log(data)

    return (
        <>
            <div className={style}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <Image src={userImage} width={500} height={500} alt="user" />
                    </div>
                </div>
                <div className="chat-header gap-1">
                    {userName} &nbsp;
                    <time className="text-xs opacity-50">{time}</time>
                    {returnDropdown()}
                </div>
                <div className={color}>
                    {message}
                </div>
                <div className="chat-footer opacity-50">
                    {date}
                    {isEdit()}
                </div>
            </div>

            <dialog ref={modalRef} className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Update Message</h3>
                                    <p className="py-4">Press ESC key or click the button below to close</p>                             
                                    <textarea name="msg" value={updatedData} onChange={(e) => setUpdatedData(e.target.value)}  className="textarea textarea-bordered textarea-lg w-full max-w-xs flex items-stretch"/>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn" onClick={updateMessage}>Update</button>
                                            <button className="btn" onClick={closeModal}>Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>

        </>
    )
}
export default MessageCard