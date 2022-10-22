import { useContext } from "react";
import ChatContext from "./ChatContext";
import { useAuth } from "../context/AuthProvider";

import { useReducer } from "react";

export function useChat() {
  return useContext(ChatContext);
}

const ChatProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    flag: false,
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          flag: true,
        };
      case "FALSE":
        return {
          user: "",
          chatId: "",
          flag: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
