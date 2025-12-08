import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import Tweet from "@/models/Tweet";

// GET: Fetch a single tweet by ID
export async function GET(req, { params }) {
  await makeSureDbIsReady();
  const tweet = await Tweet.findById(params.id);
  if (!tweet) {
    return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
  }
  return NextResponse.json(tweet, { status: 200 });
}