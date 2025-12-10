import TweetCard from "@/components/TweetCard";

// Server component - runs on the server for better performance
async function getTweet(id) {
  const res = await fetch(`http://localhost:3000/api/tweets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tweet");
  }

  return res.json();
}

export default async function TweetDetail({ params }) {
  // console.log("PARAMS RAW:", params);
  // console.log("PARAMS AWAIT:", await params);
  const { id } = await params;

  const tweet = await getTweet(id);


  return (
    <div className="min-h-screen bg-zinc-900">
      <main className="max-w-xl mx-auto pt-1 px-4">
       <TweetCard tweetId={tweet._id} initialTweet={tweet} />
      </main>
    </div>
  );
}