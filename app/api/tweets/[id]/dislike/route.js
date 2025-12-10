import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import Tweet from "@/models/Tweet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await makeSureDbIsReady();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "You are unauthorized" },
        { status: 401 }
      );
    }

    const { tweetId } = await req.json();
    const username = session.user.username;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    if (!Array.isArray(tweet.dislikedBy)) {
      tweet.dislikedBy = [];
    }

    if (tweet.dislikedBy.includes(username)) {
      tweet.dislikedBy = tweet.dislikedBy.filter((user) => user !== username);
    } else {
      tweet.dislikedBy.push(username);
    }

    await tweet.save();

    const updatedTweet = await Tweet.findById(tweetId).populate("author", "name username avatarUrl").lean();

    return NextResponse.json(updatedTweet);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
