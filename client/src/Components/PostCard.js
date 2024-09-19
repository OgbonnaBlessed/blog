import React, { useState, useEffect } from 'react';
import { FaCheck, FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const PostCard = ({ post, hideBookmark }) => {
  const [user, setUser] = useState({});
  const [isBookmarked, setIsBookmarked] = useState([]);
  const [message, setMessage] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${post.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [post]);

  useEffect(() => {
    if (currentUser) {
      const checkBookmarkStatus = async () => {
        try {
          const res = await fetch(`/api/user/${currentUser._id}/bookmarks`);

          if (res.ok) {
            const data = await res.json();
            setIsBookmarked(data.bookmarks.map(bookmark => bookmark._id));  // Store bookmarked post IDs
          }

        } catch (error) {
          console.log(error.message);
        }
      };

      checkBookmarkStatus();
    }
  }, [currentUser]);

  const handleBookmarkClick = async () => {
    if (currentUser) {
      try {
        const isPostBookmarked = isBookmarked.includes(post._id);
  
        if (isPostBookmarked) {
          const res = await fetch(`/api/user/${currentUser._id}/bookmark/${post._id}`, {
            method: 'DELETE',
          });
  
          // const data = await res.json();
  
          if (res.ok) {
            setMessage('Removed from bookmark');
            setIsBookmarked((prev) => prev.filter(id => id !== post._id));
  
          } else {
            setMessage('something went wrong, please try again later');
          }
  
        } else {
          const res = await fetch(`/api/user/${currentUser._id}/bookmark/${post._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: post._id }),
          });
  
          // const data = await res.json();
  
          if (res.ok) {
            setMessage('Added to bookmark');
            setIsBookmarked((prev) => [...prev, post._id]);
  
          } else {
            setMessage('something went wrong, please try again later');
          }
        }
  
        
        if (!currentUser) {
          setMessage('You have to sign in');
        }
        
      } catch (error) {
        console.error(error.message);
      }
      
    } else {
      setMessage('You have to sign in');
    }

    setTimeout(() => setMessage(null), 2000);
  };

  // Function to truncate post content to 8 characters max
  const truncateTitle = (content, maxLength = 8) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    }
    return content;
  }

  return (
    <motion.div 
    initial={{
      opacity: 0,
      translateY: 100,
    }}
    animate={{
      opacity: 1,
      translateY: 0
    }}
    exit={{
      opacity: 0,
      translateY: 100
    }}
    className="post-card-item">
      {!hideBookmark && (
      <FaBookmark
        className="bookmark-icon-post"
        onClick={handleBookmarkClick}
        style={{
          color: isBookmarked.includes(post._id) ? '#444444' : 'white',
          cursor: 'pointer',
        }}
      />
      )}
      {message && 
      <motion.div 
      initial={{
        opacity: 0,
        translateY: -50,
      }}
      animate={{
        opacity: 1,
        translateY: 0
      }}
      exit={{
        opacity: 0,
        translateY: -50
      }}
      className="bookmark-message"
      >{message}</motion.div>
      }
      <img src={post.image} alt="post cover" />
      <div className="post-card-info">
        <div className="post-card-author">
          <div className="post-card-title">{truncateTitle(post.title)}</div>
          <div className="post-card-username">
            {user.username}
            <FaCheck size={15} color="rgb(170, 231, 29)" />
          </div>
        </div>
        <Link to={`/post/${post.slug}`}>
          <button type="button">Read article</button>
        </Link>
      </div>
    </motion.div>
  );
};
export default PostCard;