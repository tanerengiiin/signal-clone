import { Message } from "@/lib/types";
import redis from "@/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existingChat = await redis.hget("chats", params.id);
    if (existingChat===null) {
      return new NextResponse("There is no chat with this id ", {
        status: 404,
      });
    }
    const messagesRes = await redis.hvals(params.id);
    const messages: Message[] = messagesRes
      .map((message) => JSON.parse(message))
      .sort((a, b) => b.created_at - a.created_at);

    return new NextResponse(JSON.stringify({ messages }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in sending message " + error, {
      status: 500,
    });
  }
}
