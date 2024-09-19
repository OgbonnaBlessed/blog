import React, { useEffect } from 'react'
import PostCard from './PostCard';
import { FaBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks, deleteBookmark } from '../redux/bookmark/bookmarkSlice';
import { motion } from 'framer-motion'

const DashboardBookmarks = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { items: bookmarkedPosts, status } = useSelector((state) => state.bookmarks);

  // Fetch bookmarks when component mounts
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchBookmarks(currentUser._id));
    }
  }, [dispatch, currentUser]);

  // Handle bookmark deletion
  const handleDeleteBookmark = (postId) => {
    if (currentUser) {
      dispatch(deleteBookmark({ userId: currentUser._id, postId }));
    }
  };

  const spinnerStyle = {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    borderTopColor: '#444444',
    animation: 'spin 1s ease-in-out infinite',
  };

  // Render based on the status of the API call
  if (status === 'loading') {
    return (
      <div className='spinner-container-bookmark'>
        <div style={spinnerStyle}></div>
      </div>
    )

  }

  if (bookmarkedPosts.length === 0) {
    return (
      <div className='spinner-container-bookmark'>You don't have any bookmark yet!</div>
    )
  }

  return (
    <div className='bookmarks-container'>
      <div className="posts-all-box posts-all-bookmarks">
        {bookmarkedPosts.length > 0 && (
            bookmarkedPosts.map((bookmark, i) => (
                <div className='bookmark-post' key={i}>
                    <PostCard key={bookmark._id} post={bookmark} hideBookmark={true} />
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
                    className='remove-bookmark'
                    >
                      <FaBookmark 
                          onClick={() => handleDeleteBookmark(bookmark._id)}
                      />
                    </motion.div>
                </div>
            ))
        )}
      </div>
    </div>
  )
}

export default DashboardBookmarks
