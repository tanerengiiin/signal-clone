import redis from "@/redis";
import { NextResponse, NextRequest } from "next/server";
import { Chat } from "@/lib/types";
export async function GET(request: NextRequest,
    { params }: { params: { id: string } }) {
    try {
        if (!params.id) {
            return new NextResponse("ID is required", { status: 400 });
        }

        const chatRes = await redis.hget("chats", params.id);
        if (!chatRes) {
            return new NextResponse("Chat not found", { status: 404 });
        }
        const chat: Chat = JSON.parse(chatRes)

        return new NextResponse(JSON.stringify({ chat }), {
            status: 200,
        });


    } catch (error: any) {
        console.error('Error fetching chat:', error);
        return new NextResponse("Error in fetching chat: " + error.message, { status: 500 });
    }
}