import Link from 'next/link';
import ReactionButtons from '@/components/ReactionButtons';

// Server component - runs on the server for better performance
async function getTweet(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`, {
    next: { revalidate: 10 }, // Cache for 10 seconds
  });
  const data = await res.json();
  return data;
}

export default async function TweetDetail({ params }) {
  // Server-side data fetching - no loading state needed
  const resolvedParams = await params;
  const tweet = await getTweet(resolvedParams.id);

  return (
    <main className="min-h-[80vh]">
      <sup>Tweet id : {tweet.id}</sup>
      <h1>{tweet.title}</h1>
      <p>{tweet.body}</p>

      {/* Client component for interactive buttons */}
      <ReactionButtons initialReactions={tweet.reactions} tweetId={tweet.id} />

      <p>Tags: {tweet.tags.join(', ')}</p>
    </main>
  );
}
