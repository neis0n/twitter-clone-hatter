'use client';
import Link from 'next/link';

export default function TweetStructure({ tweet, likes = 0, liked = false, onLikeToggle }) {
  return (
    <article className="px-4 py-3 border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <div className="flex">
        {/* User avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-800" />

        {/* Tweet content */}
        <div className="ml-4 flex-1">
          <Link href={`/tweet/${tweet.id}`} className="block">
            {/* Tweet header */}
            <div className="flex items-center">
              <span className="font-bold text-white">User {tweet.userId}</span>
              <span className="ml-2 text-gray-500">@user{tweet.userId}</span>
              <span className="ml-2 text-gray-500">·</span>
              <span className="ml-2 text-gray-500">1h</span>
            </div>

            {/* Tweet body */}
            <div className="mt-1">
              <p className="text-white">{tweet.title}</p>
              <p className="text-gray-500 mt-1">{tweet.body}</p>
            </div>
          </Link>

          {/* Tweet actions */}
          <div className="flex items-center mt-3 -ml-2">
            <button
              onClick={(e) => onLikeToggle(e, tweet.id)}
              className={`
                group flex items-center space-x-2 p-2 rounded-full
                hover:bg-green-500/10 transition-colors
                ${liked ? 'text-green-500' : 'text-gray-500'}
              `}
              aria-pressed={liked}
              aria-label="Upvote"
            >
              <svg
                className="w-5 h-5 stroke-current"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Up vote */}
                <polyline points="6 14 12 8 18 14" />
                <line x1="12" y1="8" x2="12" y2="20" />
              </svg>
              <span className="text-sm group-hover:text-green-500">{likes ?? 0}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}