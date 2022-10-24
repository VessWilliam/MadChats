import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { useChat } from '../context/ChatProvider'


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Messages({message}) {

    const {currentUser} = useAuth()
    const { data } = useChat()
    
  return (
    <li className={classNames( currentUser.uid !== message.senderId ? "justify-end " : "justify-start ", "flex p-0.5" )}>
         <div className='relative flex items-end px-2'>
            <div className={classNames( 
              currentUser.uid !== message.senderId
          ? "bg-purple-300 border border-gray-500 shadow-md" 
          : "bg-purple-600 text-white border border-gray-500",
           "relative max-w-md  h-[2rem] px-9 py-1 text-gray-700 rounded-lg shadow-lg" )}>
            <span className='block font-normal px-auto'>{message.text}</span>
          </div>
         </div>
          <div className='absolute'>
          <img src={ message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} 
            alt="profile"
            className='h-10 w-10 
            userPhoto'/>
          </div>
    </li>
  )
}
