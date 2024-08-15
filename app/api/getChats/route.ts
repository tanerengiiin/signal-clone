import { Message } from "@/lib/types";
import redis from "@/redis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const chatsRes = await redis.hvals("chats");
    const chats: Message[] = chatsRes.map((chat) =>
      JSON.parse(chat)
    );

    return new NextResponse(JSON.stringify({ chats }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in sending message " + error, {
      status: 500,
    });
  }
}
