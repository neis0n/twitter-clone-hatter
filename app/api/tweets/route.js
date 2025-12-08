import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import Tweet from "@/models/Tweet";

export async function GET() {
  try {
    // dummyJSON
    const dummyRes = await fetch("https://dummyjson.com/posts");
    const dummyData = await dummyRes.json();

    const dummyTweets = dummyData.posts.map((t) => ({
    id: `dummy-${t.id}`,
    _id: null,
    title: t.title,
    body: t.body,
    tags: t.tags,
    reactions: {
      likes: t.reactions.likes,
      dislikes: t.reactions.dislikes,
    },
    dislikedBy: [],
  }));

    // mongoDB
    await makeSureDbIsReady();
    const mongoTweets = await Tweet.find().sort({ createdAt: -1 });

    const formattedMongoTweets = mongoTweets.map((t) => ({
      id: `mongo-${t._id}`,
      _id: t._id,
      title: t.title,
      body: t.body,
      tags: t.tags,
      reactions: {
       likes: t.reactions.likes,
       dislikes: t.reactions.dislikes,
      }, 
      dislikedBy: t.dislikedBy,
    }));

    // both sources
    const allTweets = [...dummyTweets, ...formattedMongoTweets];

    return NextResponse.json(allTweets, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}