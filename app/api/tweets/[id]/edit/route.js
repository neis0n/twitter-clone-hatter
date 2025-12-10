import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import Tweet from "@/models/Tweet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req, { params }) {
  try {
    await makeSureDbIsReady();

    // authorization
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { body } = await req.json();

    const tweet = await Tweet.findById(id);
    if (!tweet) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    const username = session.user.username;

    // validation
    if (!(tweet.author.toString() === session.user.id || session.user.role === "admin")) {
      return NextResponse.json({ error: "No rights!" }, { status: 403 });
    }

    tweet.body = body;
    tweet.title = body.slice(0, 50);
    tweet.isEdited = true;

    await tweet.save();
    const updatedTweet = await Tweet.findById(id).populate("author", "name username avatarUrl").lean();

    return NextResponse.json(updatedTweet);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}