import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

/**
 * @param {NextRequest} request
 */
export async function GET(request) {
  console.log("Request to", request.url);
  return NextResponse.json({ ping: "pong" });
}


mongoose.connect(
  "mongodb+srv://eugenekolisnyk8_db_user:asdasd@clustertwitter.zztkghy.mongodb.net/" // how can I hide my data?
)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ Connection error:", err));