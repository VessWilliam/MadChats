import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthProvider";
import { useChat } from "../context/ChatProvider";

export default function UserProfile() {
  const { currentUser } = useAuth();
  const [chat, setChats] = useState([]);
  const { dispatch } = useChat();

  useEffect(() => {
    try {
      const getChats = async () => {
        const unsub = await onSnapshot(
          doc(db, "userChat", currentUser.uid),
          (doc) => {
            setChats(doc.data());
          }
        );

        return () => {
          unsub();
        };
      };

      currentUser.uid && getChats();
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.uid]);

  const handleSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  // console.log(chat);

  return (
    <>
      {Object.entries(chat)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chats) => (
          <div key={chats[0]} className="pb-2 border-b-zinc-600">
            <div
              className="relative flex pl-1"
              onClick={() => handleSelect(chats[1].userInfo)}
            >
              <img
                src={chats[1].userInfo?.photoURL}
                alt="profile"
                className="h-10 w-10 lg:12 lg:12 userPhoto"
              />

              <div className="flex-col mx-auto relative gap-5 ml-2 items-center justify-center">
                <span className="flex text-sm lg:text-lg text-gray-800 capitalize font-semibold">
                  {chats[1].userInfo?.displayName}
                </span>
                <p className="text-sm text-slate-600">
                  {chats[1].lastMessage?.text}
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
