import { NextResponse } from "next/server";
import { makeSureDbIsReady } from "@/lib/db";
import User from "@/models/User";
import Tweet from "@/models/Tweet";

export async function GET(req, { params }) {
  try {
    await makeSureDbIsReady();

    const { username } = await params;

    const user = await User.findOne({ username }).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tweets = await Tweet.find({ author: user._id })
      .sort({ createdAt: -1 })
      .populate("author", "username name avatarUrl")
      .lean();

    return NextResponse.json({ user, tweets }, { status: 200 });
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}