import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { makeSureDbIsReady } from "@/lib/db";
import Tweet from "@/models/Tweet";

export async function DELETE(req, { params }) {
  try {
    await makeSureDbIsReady();

    // authorization
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const tweet = await Tweet.findById(id);

    if (!tweet) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    const username = session.user.username;

    // validation
    if (!(tweet.author.toString() === session.user.id || session.user.role === "admin")) {
      return NextResponse.json({ error: "No rights!" }, { status: 403 });
    }

    await Tweet.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}