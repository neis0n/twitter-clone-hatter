'use client';

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function useTweetActions(setTweets) {
  const router = useRouter();
  const { data: session } = useSession();

  // edit tweet
  const handleSave = async (tweetId, editBody) => {
    const res = await fetch(`/api/tweets/${tweetId}/edit`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: editBody }),
    });

    const updated = await res.json();

    setTweets(prev =>
      prev.map(t => (t._id === updated._id ? updated : t))
    );
  };

  // delete tweet
  const handleDelete = async (tweetId) => {
    await fetch(`/api/tweets/${tweetId}/delete`, {
      method: "DELETE",
    });

    setTweets(prev => prev.filter(t => t._id !== tweetId));

    router.push("/");
  };

  return { handleSave, handleDelete, session };
}