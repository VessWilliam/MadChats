import React, { useState, useEffect, useRef } from "react";

import { IoIosPaperPlane } from "react-icons/io";
import { RiBearSmileLine } from "react-icons/ri";

import { useAuth } from "../context/AuthProvider";
import { useChat } from "../context/ChatProvider";

import {
  arrayUnion,
  Timestamp,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import Picker from "emoji-picker-react";

export default function ChatInput() {
  // const[img,setImg] = useState(null)
  const scrollRef = useRef();
  const [text, setText] = useState("");
  const [showEmoji, setEmoji] = useState(false);
  const { currentUser } = useAuth();
  const { data } = useChat();
  
  const handleSend = async (event) => {
    event.preventDefault();
    console.log("success");
    await showEmoji && setEmoji(!showEmoji);
    await setText("");
    
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChat", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChat", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [showEmoji]);

  const handleEmojiClick = (event, emojiObject) => {
    event.preventDefault();
    let newMsg = text + emojiObject.emoji;
    setText(newMsg);
  };

  const handleKey = (e) => {
    e.code === "Enter" && setEmoji(!showEmoji);
  };

  return (
    <>
      {showEmoji && (
        <div ref={scrollRef} className="relative py-0 -z-5 ">
          <Picker
            searchPlaceholder={{ backgroundColor: "red" }}
            pickerStyle={{
              position: "absolute",
              height: 190,
              bottom: "50%",
              width: "100%",
              borderColor: "#b3b3df",
            }}
            onEmojiClick={handleEmojiClick}
          />
        </div>
      )}
      <form className="relative" onSubmit={(event) => handleSend(event)}>
        <div className="flex bgRelative items-center justify-between p-3 bg-slat-500 shadow-lg ">
          <button
            onKeyDown={handleKey}
            onClick={(e) => {
              e.preventDefault();
              setEmoji(!showEmoji);
            }}
          >
            <RiBearSmileLine
              className="h-7 w-7 
            inputAnimation
            hover:animate-spin
            text-[#DFDFB3]"
              aria-hidden="true"
            />
          </button>

          <input
            text="text"
            placeholder="write a msg"
            className="Input py-2 pl-4 mx-3 relative"
            name="message"
            required
            onChange={(e) => setText(e.target.value)}
            value={text}
          />

          {/* <div className='flex justify-between'>
            <img className='relative' src={attach} alt='' />
            
            <input type="file"
            className='hidden'
            id='file'
            onChange={(e)=>setImg(e.target.files[0])} />
            
            <label htmlFor="file">
            <img className='relative' src={image} alt =''/>
            </label>
          </div>  */}

          <button type="submit">
            <IoIosPaperPlane
              className="
          h-8 w-8 
          hover:animate-bounce
          inputAnimation
          rotate-[360deg]"
          aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </>
  );
}
