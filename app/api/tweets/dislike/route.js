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
      return NextResponse.json({ error: "You are unauthorized" }, { status: 401 });
    }

    const { tweetId } = await req.json();
    const userEmail = session.user.email;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    if (tweet.dislikedBy.includes(userEmail)) {
      tweet.dislikedBy = tweet.dislikedBy.filter((user) => user !== userEmail);
      tweet.reactions.dislikes -= 1;
    } else {
      tweet.dislikedBy.push(userEmail);
      tweet.reactions.dislikes += 1;
    }

    await tweet.save();

    return NextResponse.json({
      dislikes: tweet.reactions.dislikes,
      dislikedBy: tweet.dislikedBy,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}