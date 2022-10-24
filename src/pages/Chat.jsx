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
    <div className="container">
      <div
        className="min-w-full py-2 border-x border-b border-none 
        rounded md:grid md:grid-cols-2 lg:grid lg:grid-cols-3"
      >
        <div
          className="lg:rounded-l-lg md:rounded-l-md rounded bg-[#CCCCFF] 
      border-[#CCCCFF] border-r md:row-col-2 lg:row-col-2"
        >
          <Search />
          <AllUsers />
        </div>

        <div className="col-span-2 pb-0">
          {data.flag !== false ? <ChatRoom /> : <Welcome />}
        </div>

        <div className=" rounded-l rounded-r bg-[#80809f] h-[4rem] md:h-[5rem] lg:h-[5rem] col-span-3">
          <ChatContact />
        </div>
      </div>
    </div>
  );
};

export default Chat;
