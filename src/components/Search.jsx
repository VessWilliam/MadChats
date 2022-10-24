import React, { useState } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import UserSearch from "./UserSearch";
import { useAuth } from "../context/AuthProvider";

export default function Search() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const handleSeach = async () => {
    const q = query(collection(db, "Users"), where("username", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (erro) {
      console.log("nothing");
      console.log(erro);
    }
  };

  const handleSearchClick = (e) => {
    handleSeach();
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSeach();
  };

  const handleSelect = async () => {
    const combineID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log(combineID);
    try {
      const res = await getDoc(doc(db, "chats", combineID));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineID), { message: [] });

        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combineID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.username,
            photoURL: user.photoURL,
          },
          [combineID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChat", user.uid), {
          [combineID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineID + ".date"]: serverTimestamp(),
        });

        console.log("success add");
      }
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setUsername("");
  };

  // console.log(user);
  return (
    <div className="mx-4 my-3 rounded-t">
      <div className="relative">
      <h2 className="relative justify-center tracking-[0.5rem] top-1 text-gray-600 uppercase py-4 items-center hidden md:flex lg:flex ">
          Mad # Tag
        </h2>
        <div className="py-3 flex items-center ">
          <span className="relative inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              onClick={() => handleSearchClick()}
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="#9999bf"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6 animate-bounce"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            placeholder="Search"
            type="search"
            className="Input py-1 pl-10 pr-3 "
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
      </div>
      <div onClick={handleSelect}>
        <UserSearch user={user} />
      </div>
    </div>
  );
}
