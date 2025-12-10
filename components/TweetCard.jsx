'use client';

import { useContext, useEffect, useState } from "react";
import { DislikesContext } from "@/context/DislikesContext";
import DislikeButton from "@/components/DislikeButton";
import { useSession } from "next-auth/react";
import { useTweetActions } from "@/hooks/useTweetActions";
import Link from "next/link";


export default function TweetCard({ tweetId, initialTweet }) {
  const { tweets, setTweets } = useContext(DislikesContext);
  const { data: session } = useSession();
  const { handleSave, handleDelete } = useTweetActions(setTweets);
 
  const tweetFromContext = tweets.find(t => t?._id === tweetId);
  const tweet = tweetFromContext || initialTweet;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(tweet ? tweet.body : "");

  useEffect(() => {
    if (!tweetFromContext && initialTweet) {
      setTweets(prev => [...prev, initialTweet]);
    }
  }, [tweetFromContext, initialTweet, setTweets]);

  if (!tweet) return null;

  const isOwnerOrAdmin =
    session?.user?.username &&
    tweet?.author &&
    (session.user.username === tweet.author.username || session.user.role === "admin");
    // console.log("SESSION:", session?.user);
    // console.log("AUTHOR:", tweet?.author);
    // console.log("NEW TWEET:", tweet);


  const onSave = async () => {
    await handleSave(tweet._id, editBody);
    setIsEditing(false);
  };

  const onDelete = async () => {
    await handleDelete(tweet._id);
  };

  return (
    <div className="mt-24 max-w-xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 text-white">

      {/* Tweet Header */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <Link href={`/users/${tweet.author.username}`}>
          <img src={tweet.author.avatarUrl} alt={tweet.author.username} className="w-14 h-14 rounded-full object-cover" />
        </Link>
        
        <div>
          <h3 className="text-xl font-bold">{tweet.author.name}</h3>
          <p className="text-gray-400">@{tweet.author.username}</p>

          {/* Date */}
          <p className="text-gray-500 text-sm">
            {new Date(tweet.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      

      {isEditing ? (
        <>
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            rows={5}
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition cursor-pointer"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {tweet.title}
            {tweet.isEdited && (
              <span className="text-xs text-gray-400">(edited)</span>
            )}
          </h2>

          <p className="text-gray-300 mt-2 leading-relaxed">{tweet.body}</p>

          <div className="flex items-center mt-4">
            <DislikeButton tweet={tweet} />
          </div>

          {isOwnerOrAdmin && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}