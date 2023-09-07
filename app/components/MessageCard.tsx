import Image from 'next/image'
import userPic from '../assets/user1.png'

export function MessageCard() {
    return (
        <>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <Image src={userPic} width={500} height={500} alt="user"/>
                    </div>
                </div>
                <div className="chat-header gap-1">
                    John Smith &nbsp;
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble chat-bubble-primary">Hi, I would like to know how to use threads in Java</div>
                <div className="chat-footer opacity-50">
                    Delivered
                </div>
            </div>
        </>
    )
}