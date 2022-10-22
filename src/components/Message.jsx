import React,{useState, useEffect, useRef} from 'react'
import { useChat } from '../context/ChatProvider'
import {doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import Messages from './Messages'

export default function Message() {
    const [message , setMessage] = useState([])
    const { data } = useChat()
    const scrollRef = useRef()
    
    useEffect(() => {
      scrollRef.current?.scrollIntoView({
        behavior:'smooth'
      })
    }, [message])
    
    useEffect(() => {
      const unsub = onSnapshot(doc(db,"chats", data.chatId), (doc) => {
        doc.exists() && setMessage(doc.data().message)
      })
    
      return () => {
        unsub()
      }
    }, [data.chatId])
    
  return (
   <div className='bgRelative p-2 overflow-y-auto scrollbarDesign
    lg:h-[28rem] md:h-[17rem] h-[17rem] '>
       <ul className='space-y-3'>
           {
           message.map((messages) => (
             <div key={messages.id} ref={scrollRef} >
               <Messages message={messages}/> 
             </div>
           ))}
       </ul>
    </div>
  )
}
