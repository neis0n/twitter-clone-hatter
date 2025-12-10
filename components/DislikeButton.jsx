"use client";

import { useContext } from "react";
import { DislikesContext } from "@/context/DislikesContext";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function DislikeButton({ tweet }) {
  const { data: session } = useSession();
  const {dislikedTweets, toggleDislike } = useContext(DislikesContext);
  // console.log("dislikedTweets:", dislikedTweets);

  const isDisliked = dislikedTweets.includes(tweet._id);
  const dislikes = tweet.dislikedBy.length;
  
  const router = useRouter();
  

  const handleDislike = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    await toggleDislike(tweet._id);
  };


  return (
    <Button
      onClick={handleDislike}
      variant={isDisliked ? "secondary" : "secondary"}
      className="flex items-center gap-2 cursor-pointer"
    >
      👎 {dislikes}
    </Button>
  );
}