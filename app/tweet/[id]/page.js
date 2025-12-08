import Link from 'next/link';
import TweetCard from "@/components/TweetCard";

// Server component - runs on the server for better performance
async function getTweet(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data;
}

export default async function TweetDetail({ params }) {
  const resolvedParams = await params;
  const tweet = await getTweet(resolvedParams.id);

  return (
    <main className="min-h-[80vh]">
      <TweetCard tweet={tweet} />
    </main>
  );
}