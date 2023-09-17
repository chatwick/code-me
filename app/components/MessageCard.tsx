import Image from 'next/image'
import userPic from '../assets/user1.png'
import { useState, FC } from 'react'

type Message = {
    //id: string
    message: string
    user: string
    userImage: string
    date: any
    time: any
}

const MessageCard: FC<Message> = ({message, user, date, time, userImage }): JSX.Element => {
    const [data,setData] = useState("");
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
                            <li><button onClick={() => {
                                const modal = document.getElementById('editModal') as HTMLDialogElement
                                modal.showModal()
                            }}>Edit</button></li>

                            <dialog id="editModal" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Update Message</h3>
                                    <p className="py-4">Press ESC key or click the button below to close</p>
                                    <textarea name="msg" value={data} onChange={(e) => setData(e.target.value)} className="textarea textarea-bordered textarea-lg w-full max-w-xs flex items-stretch"/>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>

                            <li><a>Delete</a></li>
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