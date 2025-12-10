import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import Tweet from "@/models/Tweet";

export async function GET() {
  try {
    await makeSureDbIsReady();

    const tweets = await Tweet.find().sort({ createdAt: -1 }).populate("author", "username name avatarUrl").lean();
    

    return NextResponse.json(tweets, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}