"use client";

import { useEffect, useState } from "react";
import TweetComposer from "@/components/TweetComposer";
import TweetStructure from "@/components/TweetStructure";

export default function Home() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function fetchTweets() {
      const res = await fetch("/api/tweets");
      const data = await res.json();
      setTweets(data);
    }

    fetchTweets();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-6">
          📝 Latest Tweets
        </h1>

        <TweetComposer />

        <div className="space-y-4 mt-6">
          {tweets.map((tweet) => (
            <TweetStructure key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </main>
    </div>
  );
}