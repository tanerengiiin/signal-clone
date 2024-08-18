import redis from "@/redis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, lastMessage } = body;

    if (!lastMessage || !id) {
      return new NextResponse(
        JSON.stringify({ message: "There was an error" }),
        { status: 400 }
      );
    }

    // Mevcut chat verisini Redis'ten al
    const existingChat = await redis.hget("chats", id);
    if (!existingChat) {
      return new NextResponse(
        JSON.stringify({ message: "Chat not found!" }),
        { status: 404 }
      );
    }

    // JSON formatına dönüştür
    const chatData = JSON.parse(existingChat);

    // lastMessage alanını güncelle
    chatData.lastMessage = lastMessage;

    // Güncellenmiş veriyi tekrar Redis'e kaydet
    await redis.hset("chats", id, JSON.stringify(chatData));

    return new NextResponse(JSON.stringify({ lastMessage }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in updating chat " + error, {
      status: 500,
    });
  }
}