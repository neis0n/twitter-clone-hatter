import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGO = process.env.MONGO_URL;

const TweetSchema = new mongoose.Schema({
  dislikedBy: { type: [String], default: [] }
});

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);

export async function GET() {
  await mongoose.connect(MONGO);

  const r = await Tweet.updateMany(
    { dislikedBy: { $exists: false } },
    { $set: { dislikedBy: [] } }
  );

  return NextResponse.json({ ok: true, modified: r.modifiedCount });
}