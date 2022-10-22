import React from "react";
import ChatContact from "../components/ChatContact";
import Search from "../components/Search";
import AllUsers from "../components/AllUsers";
import ChatRoom from "../components/ChatRoom";
import { useChat } from "../context/ChatProvider";
import Welcome from "../components/Welcome";

const Chat = () => {
  const { data } = useChat();

  // console.log(data.flag);

  return (
    <div className="container mx-auto h-screen w-screen">
      <div
        className="min-w-full border-x border-b border-none 
    rounded lg:grid lg:grid-cols-3"
      >
        <div
          className="lg:rounded-l-lg md:rounded-l-md rounded bg-[#CCCCFF] 
      border-[#CCCCFF] border-r lg:row-col-2"
        >
          <Search />
          <AllUsers />
        </div>

        <div className="lg:col-span-2 pb-0">
          {data.flag !== false ? <ChatRoom /> : <Welcome />}
        </div>

        <div className=" rounded-l rounded-r bg-[#80809f] lg:col-span-3">
          <ChatContact />
        </div>
      </div>
    </div>
  );
};

export default Chat;
