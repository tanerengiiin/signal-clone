"use client";
import React, { createContext, useState, ReactNode, useContext, useRef } from "react";

interface ChatContextType {
  openChatDetail: boolean;
  handleChatDetail: (val?: boolean) => void;
  repliedMessage: RepliedMessageType | undefined;
  handleRepliedMessage: (val?: RepliedMessageType) => void;
  chatScreenEndRef: React.RefObject<HTMLDivElement>;
  scrollToBottom: () => void;
  chatName: string;
  handleChatName: (val:string) => void;
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
  const chatScreenEndRef = useRef<HTMLDivElement>(null);
  const [openChatDetail, setOpenChatDetail] = useState<boolean>(true);
  const [chatName, setChatName] = useState<string>('');
  const [repliedMessage, setRepliedMessage] = useState<RepliedMessageType>();
  const handleChatDetail = (val?: boolean) => {
    setOpenChatDetail((prev) => val ?? !prev);
  };
  const handleRepliedMessage = (val?: RepliedMessageType) => {
    if (!val) setRepliedMessage(undefined);
    setRepliedMessage(val);
  };
  const scrollToBottom = () => {
    if (chatScreenEndRef.current) {
      chatScreenEndRef.current.scrollIntoView({ behavior: 'instant' });
    }
  };
  const handleChatName=(val:string)=>{
    setChatName(val)
  }
  return (
    <ChatContext.Provider
      value={{
        openChatDetail,
        handleChatDetail,
        repliedMessage,
        handleRepliedMessage,
        chatScreenEndRef,
        scrollToBottom,
        chatName,
        handleChatName
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
