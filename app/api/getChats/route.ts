import { Chat } from "@/lib/types";
import redis from "@/redis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const chatsRes = await redis.hvals("chats");
    const chats: Chat[] = chatsRes
    .map((chat) => JSON.parse(chat))
    .sort((a, b) => b?.lastMessage?.created_at - a?.lastMessage?.created_at);
    return new NextResponse(JSON.stringify({ chats }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in sending message " + error, {
      status: 500,
    });
  }
}
