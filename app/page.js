"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import TweetComposer from "@/components/TweetComposer";
import TweetStructure from "@/components/TweetStructure";
import TweetList from "@/components/TweetList";
// import getRandomHour from "@/components/GetRandomHour.jsx";

const uri = "mongodb+srv://eugenekolisnyk8_db_user:habNGAFy9YSucu0G@clustertwitter.zztkghy.mongodb.net/?appName=ClusterTwitter";

export default function Home() {
  const [tweets, setTweets] = useState([]); // tweets list
  const [likes, setLikes] = useState({}); // likes count for each tweet
  const [likedTweets, setLikedTweets] = useState({}); // liked tweets by user

  useEffect(() => {
    async function fetchTweets() {
      const res = await fetch("https://dummyjson.com/posts");
      const data = await res.json();
      setTweets(data.posts);

      const storedLiked = JSON.parse(localStorage.getItem('likedTweets')) || {};
      const storedLikesCount = JSON.parse(localStorage.getItem('likesCount')) || {};
      
      const tweetLikes = {};
      data.posts.forEach(tweet => {
        {/* Priority: localStorage -> API */}
        if (storedLikesCount[tweet.id] !== undefined) {
          tweetLikes[tweet.id] = storedLikesCount[tweet.id];
        } 

        else if (tweet.reactions.likes !== undefined) {
          tweetLikes[tweet.id] = tweet.reactions.likes;
        }

        // otherwise, default to 0
        else {
          tweetLikes[tweet.id] = 0;
        }
      });
      
      setLikes(tweetLikes);
      setLikedTweets(storedLiked);
    }
    fetchTweets();
  }, []);

  const handleLikeToggle = (e, tweetId) => {
  e.stopPropagation(); // prevents click

  // new arrays for updates
  const newLikedTweets = { ...likedTweets };
  const newLikes = { ...likes };

  // toggle like status
  if (newLikedTweets[tweetId]) {
    delete newLikedTweets[tweetId]; // delete like
    newLikes[tweetId]--; // decrease likes -1
  } else {
    newLikedTweets[tweetId] = true; // add like
    newLikes[tweetId]++; // increase likes +1
  }

  // update states
  setLikedTweets(newLikedTweets);
  setLikes(newLikes);
  
  localStorage.setItem('likedTweets', JSON.stringify(newLikedTweets));
  localStorage.setItem('likesCount', JSON.stringify(newLikes));
};

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-6">📝 Latest Tweets</h1>
        <TweetComposer />

        {/* Tweets list */}
        {tweets.map((tweet) => (
          <TweetStructure
            key={tweet.id}
            tweet={tweet}
            likes={likes[tweet.id]}
            liked={Boolean(likedTweets[tweet.id])}
            onLikeToggle={handleLikeToggle}
          />
        ))}
      </main>
    </div>
  );
}