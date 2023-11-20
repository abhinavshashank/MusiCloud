
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { db, auth, get } from '../firebase/firebase';
import { ref, update } from 'firebase/database';

const AnimatedHeartButton = ({ songId }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Fetch the initial likes and liked_by data for the song
    const fetchData = async () => {
      try {
        console.log('Fetching data for songId:', songId);
        const songRef = ref(db, `songs/${songId}`);
        const snapshot = await get(songRef);
  
        if (snapshot.exists()) {
          const { likes, liked_by } = snapshot.val();
          console.log('Initial likes:', likes);
          console.log('Initial liked_by:', liked_by);
  
          // Initialize liked_by as an empty object if it's initially undefined or null
          setLikes(likes || 0);
          setLiked(liked_by ? liked_by[auth.currentUser.uid] : false);
        } else {
          console.log('Snapshot does not exist.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [songId]);
  

  const heartAnimation = useSpring({
    transform: `scale(${liked ? 1.2 : 1})`,
    color: liked ? 'red' : 'black',
    border: `2px solid ${liked ? 'red' : 'black'}`,
    padding: liked ? '10px' : '12px',
  });

  const handleLike = async () => {
    const user = auth.currentUser;
  
    if (user) {
      const songRef = ref(db, `songs/${songId}`);
  
      // Update likes and liked_by based on the current state
      if (liked) {
        // If already liked, unlike
        try {
          await update(songRef, {
            likes: Math.max(0, likes - 1),
            [`liked_by/${user.uid}`]: null,
          });
          console.log('Unliked successfully.');
        } catch (error) {
          console.error('Error unliking:', error);
        }
      } else {
        // If not liked, like
        try {
          await update(songRef, {
            likes: likes + 1,
            [`liked_by/${user.uid}`]: true,
          });
          console.log('Liked successfully.');
        } catch (error) {
          console.error('Error liking:', error);
        }
      }
  
      // Update local state
      setLikes((prevLikes) => (liked ? Math.max(0, prevLikes - 1) : prevLikes + 1));
      setLiked(!liked);
    }
  };
  

  return (
    <animated.button
      style={{ ...heartAnimation, fontSize: liked ? '1.2em' : '1.4em' }}
      onClick={handleLike}
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      {liked ? '❤️' : '♡'}
      {/* <span style={{ marginLeft: '5px' }}>{likes}</span> */}
    </animated.button>
  );
};

export default AnimatedHeartButton;
