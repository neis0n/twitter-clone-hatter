"use client";

import Link from "next/link";
import DislikeButton from "@/components/DislikeButton";

export default function TweetStructure({ tweet }) {
  return (
    <article className="px-4 py-3 border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <div className="flex">

        <Link 
          href={`/tweets/${tweet._id}`} 
          className="flex flex-1"
        >
          {/* Avatar */}
          <img
            src={tweet.author.avatarUrl}
            alt={tweet.author.username}
            className="w-12 h-12 rounded-full object-cover"
          />

          {/* Content */}
          <div className="ml-4 flex-1">
            {/* Header */}
            <div className="flex items-center">
              <span className="font-bold text-white">{tweet.author.name}</span>
              <span className="ml-2 text-gray-500">@{tweet.author.username}</span>
            </div>

            {/* Body */}
            <div className="mt-1">
              <p className="text-white">{tweet.title}</p>
              <p className="text-gray-500 mt-1">{tweet.body}</p>
            </div>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center ml-4">
          <DislikeButton tweet={tweet} />
        </div>

      </div>
    </article>
  );

}