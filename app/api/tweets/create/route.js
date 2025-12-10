import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import Tweet from "@/models/Tweet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await makeSureDbIsReady();

    // authorization
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // validation
    const { body, tags } = await req.json();

    if (!body || body.trim().length === 0) {
        return NextResponse.json(
            { error: "Body is required" },
            { status: 400 }
        );
    }

    const title = body.trim().length > 50 ? body.trim().slice(0, 47) + "..." : body.trim();


    console.log("AUTHOR:", session.user.username);
    // creating tweet
    const tweet = await Tweet.create({
      title,
      body: body ?? "There is nothing here...",
      tags: tags ?? [],
      author: session.user.id,
    });

    const populatedTweet = await Tweet.findById(tweet._id).populate(
      "author",
      "username name avatarUrl"
    );

    // response
    return NextResponse.json(populatedTweet, { status: 201 });

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}