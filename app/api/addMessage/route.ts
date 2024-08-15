import { serverPusher } from "@/pusher";
import redis from "@/redis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, message } = body;
    if (!message) {
      return new NextResponse(
        JSON.stringify({ message: "Message does not exist!" }),
        { status: 400 }
      );
    }
    const newMessage = {
      ...message,
      created_at: Date.now(),
    };

    await redis.hset(id, message.id, JSON.stringify(newMessage));
    serverPusher.trigger(id, "new-message", newMessage);
    return new NextResponse(JSON.stringify({ message: newMessage }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in sending message " + error, {
      status: 500,
    });
  }
}
