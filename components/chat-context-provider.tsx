"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface ChatContextType {
  openChatDetail: boolean;
  handleChatDetail: (val?: boolean) => void;
  repliedMessage: RepliedMessageType | undefined;
  handleRepliedMessage: (val?: RepliedMessageType) => void;
}

interface RepliedMessageType {
  message: string;
  username: string;
}
const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [openChatDetail, setOpenChatDetail] = useState<boolean>(true);

  const [repliedMessage, setRepliedMessage] = useState<RepliedMessageType>();
  const handleChatDetail = (val?: boolean) => {
    setOpenChatDetail((prev) => val ?? !prev);
  };
  const handleRepliedMessage = (val?: RepliedMessageType) => {
    if (!val) setRepliedMessage(undefined);
    setRepliedMessage(val);
  };
  return (
    <ChatContext.Provider
      value={{
        openChatDetail,
        handleChatDetail,
        repliedMessage,
        handleRepliedMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
