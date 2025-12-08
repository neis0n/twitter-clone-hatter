"use client";

import { createContext, useState } from "react";

export const DislikesContext = createContext();

export function DislikesProvider({ children }) {
  const [dislikedTweets, setDislikedTweets] = useState([]);

  const toggleDislike = (tweetId) => {
    setDislikedTweets((prevLikes) =>
      prevLikes.includes(tweetId)
        ? prevLikes.filter((id) => id !== tweetId)
        : [...prevLikes, tweetId]
    );
  };

  return (
    <DislikesContext.Provider value={{ dislikedTweets, toggleDislike }}>
      {children}
    </DislikesContext.Provider>
  );
}