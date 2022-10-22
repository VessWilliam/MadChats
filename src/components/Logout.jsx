import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";
import { useChat } from "../context/ChatProvider";

export default function Logout() {
  const { dispatch, data } = useChat();
  const { currentUser } = useAuth();
  // console.log(data);
  // console.log(currentUser);

  const exit = async () => {
    try {
      updateDoc(doc(db, "Users", currentUser.uid), {
        isOnline: false,
      });
      await dispatch({ type: "FALSE", payload: "" });
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative bg-[#f87880] rounded-full
     flex justify-center border-none cursor-pointer pr-3"
      onClick={exit}
    >
      <BiPowerOff className="h-10 w-10  text-gray-600" />
    </div>
  );
}
