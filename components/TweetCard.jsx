'use client';
import { useState } from 'react';

/*
  TweetCard props :
  - tweet: an object with the tweet's information (who wrote it, the text, tags,
    and the current number of likes/dislikes). Example shape:
      {
        id: 1,
        title: 'Hello',
        body: 'Text content',
        tags: ['example'],
        reactions: { likes: 5, dislikes: 1 }
      }
  - isLocal: true if this tweet comes from our local server (we can update it),
    false if it comes from an external source (we only simulate updates).
*/
export default function TweetCard({ tweet, isLocal = false }) {
  // State to track current likes/dislikes (starts with original values)
  const [reactions, setReactions] = useState(tweet.reactions);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle like/dislike clicks
  const handleReaction = async (action) => {
    setIsLoading(true);

    try {
      // Choose API endpoint based on tweet source
      const apiEndpoint = isLocal ? '/api/local-tweets' : '/api/tweets';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId: tweet.id, action }),
      });

      if (response.ok) {
        const result = await response.json();

        // Handle different response formats
        if (isLocal && result.reactions) {
          // Local tweets return updated tweet with reactions
          setReactions(result.reactions);
        } else {
          // External tweets - simulate update for demo
          setReactions((prev) => ({
            ...prev,
            [action === 'like' ? 'likes' : 'dislikes']:
              prev[action === 'like' ? 'likes' : 'dislikes'] + 1,
          }));
        }
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
      <h3>{tweet.title}</h3>
      <p>{tweet.body}</p>
      <p>
        {/* Like button - calls handleReaction with 'like' */}
        <button
          onClick={() => handleReaction('like')}
          disabled={isLoading}
          style={{
            marginRight: '10px',
            padding: '5px 10px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          👍 {reactions.likes}
        </button>

        {/* Dislike button - calls handleReaction with 'dislike' */}
        <button
          onClick={() => handleReaction('dislike')}
          disabled={isLoading}
          style={{
            padding: '5px 10px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          👎 {reactions.dislikes}
        </button>
      </p>
      <p>Tags: {tweet.tags.join(', ')}</p>
    </div>
  );
}
