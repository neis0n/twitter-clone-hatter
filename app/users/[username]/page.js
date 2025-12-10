"use client";

import { useEffect, useContext, use } from "react";
import { DislikesContext } from "@/context/DislikesContext";
import TweetStructure from "@/components/TweetStructure";
import AvatarUpload from "@/components/AvatarUpload";
import { useSession } from "next-auth/react";

export default function ProfilePage({ params }) {
  const { username } = use(params);
  const { tweets, setTweets } = useContext(DislikesContext);

  const { data: session } = useSession();
  const isOwner = session?.user?.username === username;

  useEffect(() => {
    async function fetchUserTweets() {
      const res = await fetch(`/api/users/${username}`);
      const data = await res.json();

      setTweets(data.tweets);
    }

    fetchUserTweets();
  }, [username, setTweets]);

  const handleAvatarUpload = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    await fetch(`/api/users/${username}/avatar`, {
      method: "POST",
      body: formData,
    });

    // Refresh tweets to get updated avatar
    const res = await fetch(`/api/users/${username}`);
    const data = await res.json();
    setTweets(data.tweets);
  };

  return (
    <div className="mt-24 max-w-2xl mx-auto text-white px-4">

      {/* Profile Header */}
      <div className="text-white rounded-lg shadow-lg p-6 mb-6 flex items-center gap-4">
        <AvatarUpload
          avatarUrl={tweets[0]?.author?.avatarUrl}
          isOwner={isOwner}
          onUpload={handleAvatarUpload}
        />

        <div>
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-gray-400">@{username}</p>
        </div>
      </div>

      {/* Tweets */}
      <div className="space-y-4">
        {tweets.length === 0 && (
          <p className="text-gray-500 text-center">No tweets yet</p>
        )}

        {tweets.map((tweet) => (
          <TweetStructure key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
