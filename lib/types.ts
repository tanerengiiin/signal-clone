export type ChatMessageType = {
  prevId: string | undefined;
  nextId: string | undefined;
  item: Message;
};


export type Message={
  id:string;
  message:string;
  created_at:number;
  username:string;
  profilePic:string;
  email:string;
}

export type Chat={
  id:string;
  created_at:number;
  chatName:string;
  lastMessage:Message | null;
}