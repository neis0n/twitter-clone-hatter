"use client";

import { useEffect, useContext } from "react";
import TweetComposer from "@/components/TweetComposer";
import TweetStructure from "@/components/TweetStructure";
import { DislikesContext } from "@/context/DislikesContext";

export default function Home() {
  const { tweets, setTweets } = useContext(DislikesContext);

  useEffect(() => {
    async function fetchTweets() {
      const res = await fetch("/api/tweets");
      const data = await res.json();
      setTweets(data);
    }

    fetchTweets();
  }, [setTweets]);

  return (
    <div className="min-h-screen bg-zinc-900">
      <main className="max-w-xl mx-auto pt-15 px-4">
        <h1 className="text-3xl font-bold text-center my-6">
          📝 Latest Tweets
        </h1>

        <TweetComposer />

        <div className="space-y-4 mt-6 bg-zinc">
          {tweets.map((tweet) => (
            <TweetStructure key={tweet._id} tweet={tweet} />
          ))}
        </div>
      </main>
    </div>
  );
}