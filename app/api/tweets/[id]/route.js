import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import Tweet from "@/models/Tweet";

// GET: Fetch a single tweet by ID
export async function GET(req, context) {
  try {
    await makeSureDbIsReady();
    const params = await context.params;
    const { id } = params;

    // console.log("GET ID:", id);

    const tweet = await Tweet.findById(id).populate("author", "username name avatarUrl").lean();

    if (!tweet) {
      return NextResponse.json(
        { error: "Tweet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tweet, { status: 200 });
  } catch (err) {
    console.error("GET TWEET ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
