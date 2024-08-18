import redis from "@/redis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    return new NextResponse("Error in creating chat ", {
      status: 404,
    });
    const body = await request.json();
    const { chat } = body;

    if (!chat) {
      return new NextResponse(
        JSON.stringify({ message: "Message does not exist!" }),
        { status: 400 }
      );
    }
    const newChat = {
      ...chat,
      created_at: Date.now(),
    };

    await redis.hset("chats", chat.id, JSON.stringify(newChat));

    return new NextResponse(JSON.stringify({ message: newChat }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in creating chat " + error, {
      status: 500,
    });
  }
}
