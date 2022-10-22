import ChatInput from "./ChatInput";
import { useChat } from "../context/ChatProvider";
import Message from "./Message";

export default function ChatRoom() {
  const { data } = useChat();
  console.log(data);
  return (
    <div className="w-full">
      <div
        className="p-6 h-[3rem] md:[5rem] lg:h-[5rem]
           bgRelative lg:bg-[#80809f] border-b shadow-md border-[#9999bf] flex "
      >
        <img
          src={data.user.photoURL}
          className="hidden lg:flex h-10 w-10 lg:rounded-full object-cover"
          alt="avatar"
        />

        <span
          className="relative
           bottom-3 px-3 text-xl text-gray-100 
           lg:text-gray-200 lg:text-2xl lg:bottom-0 lg:top-1 
           capitalize underline"
        >
          {data.user.displayName}
        </span>
      </div>
      <Message />
      <ChatInput />
    </div>
  );
}
