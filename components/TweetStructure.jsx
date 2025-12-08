"use client";

import Link from "next/link";
import DislikeButton from "@/components/DislikeButton";

export default function TweetStructure({ tweet }) {
  return (
    <article className="px-4 py-3 border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <div className="flex">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-800" />

        {/* Content */}
        <div className="ml-4 flex-1">
          <Link href={`/tweet/${tweet.id}`} className="block">
            {/* Header */}
            <div className="flex items-center">
              <span className="font-bold text-white">User</span>
              <span className="ml-2 text-gray-500">@user</span>
            </div>

            {/* Body */}
            <div className="mt-1">
              <p className="text-white">{tweet.title}</p>
              <p className="text-gray-500 mt-1">{tweet.body}</p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center mt-3 -ml-2">
            <DislikeButton tweet={tweet} />
          </div>
        </div>
      </div>
    </article>
  );
}