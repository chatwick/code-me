import Image from 'next/image'
import userPic from '../assets/user1.png'
import { FC } from 'react'

type Message = {
    message: string
    user: string
    userImage: string
    date: any
    time: any
}
const MessageCard: FC<Message> = ({ message, user, date, time, userImage }): JSX.Element => {
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
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="link link-hover">&#xFE19;</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Edit</a></li>
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