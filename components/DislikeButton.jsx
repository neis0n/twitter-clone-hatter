"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";

export default function DislikeButton({ tweet }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const initiallyDisliked = tweet.dislikedBy.includes(userEmail);

  const [dislikes, setDislikes] = useState(tweet.reactions.dislikes);
  const [isDisliked, setIsDisliked] = useState(initiallyDisliked);

  async function handleDislike() {
    // dummyjson
    if (!tweet._id) {
      setIsDisliked(!isDisliked);
      setDislikes((prev) => prev + (isDisliked ? -1 : 1));
      return;
    }

    // mongodb
    const res = await fetch("/api/tweets/dislike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweetId: tweet._id }),
    });

    const data = await res.json();

    setDislikes(data.dislikes);
    setIsDisliked(data.dislikedBy.includes(userEmail));
  }

  return (
    <Button
      onClick={handleDislike}
      variant={isDisliked ? "danger" : "secondary"}
      className="flex items-center gap-2"
    >
      👎 {dislikes}
    </Button>
  );
}