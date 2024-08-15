import { Message } from "@/lib/types";
import redis from "@/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log('idid',params.id)
    const messagesRes = await redis.hvals(params.id);
    const messages: Message[] = messagesRes.map((message) =>
      JSON.parse(message)
    );

    return new NextResponse(JSON.stringify({ messages }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in sending message " + error, {
      status: 500,
    });
  }
}
