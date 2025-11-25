'use client';
import { useState, useEffect, use } from 'react';

/*
  ReactionButtons props:
  - initialReactions: an object with starting counts, e.g. { likes: 3, dislikes: 0 }.
    This is what the buttons show first.
  - tweetId: the number that identifies which tweet we're reacting to.
  - isLocal: true when the tweet is stored on our server so clicks will update
    the real data; false when the tweet comes from an outside source and clicks
    only change the numbers on the screen for demonstration.
*/
// Separate client component for interactive buttons
export default function ReactionButtons({
  initialReactions,
  tweetId,
  isLocal = false,
}) {
  const [reactions, setReactions] = useState(initialReactions);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // load initial liked state from localStorage
  useEffect(() => {
    const storedLikesCount = JSON.parse(localStorage.getItem('likesCount')) || {};
    const storedLiked = JSON.parse(localStorage.getItem('likedTweets')) || {};

    // if tweet locally liked, set state
    if (storedLikesCount[tweetId] !== undefined) {
      setReactions((prev) => ({
        ...prev,
        likes: storedLikesCount[tweetId],
      }));
    }

    // liked by user state
    setIsLiked(storedLiked[tweetId] || false);
  }, [tweetId]);

  // Function to handle like/dislike clicks
  const handleReaction = async (action) => {
    setIsLoading(true);

    try {
      // Choose API endpoint based on tweet source
      const apiEndpoint = isLocal ? '/api/local-tweets' : '/api/tweets';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId, action }),
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
    <div style={{ margin: '20px 0' }}>
      <button
        onClick={() => handleReaction('like')}
        disabled={isLoading}
        style={{
          marginRight: '10px',
          padding: '8px 15px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          backgroundColor: '#e3f2fd',
          border: '1px solid #2196f3',
          borderRadius: '5px',
        }}
      >
        👍 {reactions.likes}
      </button>

      <button
        onClick={() => handleReaction('dislike')}
        disabled={isLoading}
        style={{
          padding: '8px 15px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          backgroundColor: '#ffebee',
          border: '1px solid #f44336',
          borderRadius: '5px',
        }}
      >
        👎 {reactions.dislikes}
      </button>
    </div>
  );
}
