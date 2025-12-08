'use client';

import { useContext } from "react";
import { DislikesContext } from "@/context/DislikesContext";

export default function TweetCard({ tweet }) {
  const { dislikedTweets, toggleDislike } = useContext(DislikesContext);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{tweet.title}</h2>
      <p className="text-gray-700">{tweet.body}</p>
      <button
        onClick={() => toggleDislike(tweet.id)}
        className={`mt-2 px-4 py-2 rounded ${
          dislikedTweets.includes(tweet.id)
            ? "bg-red-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {dislikedTweets.includes(tweet.id) ? "Dislike 👎" : "No dislike"}
      </button>
    </div>
  );
}