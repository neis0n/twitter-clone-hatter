"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function TweetComposer({ onCreate }) {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // authorization
  if (!session) return null;

  async function handleSubmit() {
    if (!text.trim()) return;

    setLoading(true);

    const res = await fetch("/api/tweets/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: text,
        tags: [],
      }),
    });

    setLoading(false);

    if (res.ok) {
      setText("");
      if (onCreate) onCreate();
    }
  }
  // console.log("AVATAR:", session.user.avatarUrl);

  return (
    <div className="px-4 py-3 border-b border-gray-800 flex">
      {/* Avatar */}
      <img src={session.user.avatarUrl || "/avatars/default.png"} 
        alt={session.user.username}
        className="w-12 h-12 rounded-full object-cover"/>

      {/* Field */}
      <div className="ml-4 flex-1">
        <input
          type="text"
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-transparent text-white text-lg placeholder-gray-500 outline-none border-b-2 border-transparent focus:border-sky-500 transition"
        />

        {/* Send Button */}
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition cursor-pointer
              ${loading || !text.trim()
                ? "bg-sky-700/40 text-gray-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-500 text-white"
              }`}
          >
            {loading ? "Posting..." : "Tweet"}
          </button>
        </div>
      </div>
    </div>
  );
}