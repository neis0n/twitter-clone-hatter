"use client";

import { createContext, useState } from "react";

export const DislikesContext = createContext();

export function DislikesProvider({ children }) {
  const [dislikedTweets, setDislikedTweets] = useState([]);
  const [tweets, setTweets] = useState([]);

  const toggleLocal = (tweetId) => {
    setDislikedTweets((prevLikes) =>
      prevLikes.includes(tweetId)
        ? prevLikes.filter((id) => id !== tweetId)
        : [...prevLikes, tweetId]
    );
  };

  const updateTweet = (updatedTweet) => {
    setTweets((prev) =>
      prev.map(t => t._id === updatedTweet._id ? updatedTweet : t)
    );
  };

  const toggleDislike = async (tweetId) => {
    toggleLocal(tweetId);

    try {
      const res = await fetch(`/api/tweets/${tweetId}/dislike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweetId }),
      });

      const updatedTweet = await res.json()

      updateTweet(updatedTweet);
    } catch (err) {
      console.error("Dislike error:", err);
    }
  };

  return (
    <DislikesContext.Provider value={{ dislikedTweets, tweets, setTweets, toggleDislike }}>
      {children}
    </DislikesContext.Provider>
  );
}