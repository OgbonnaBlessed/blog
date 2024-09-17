import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const PostCard = ({ post }) => {
    const [user, setUser] = useState({});
    
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
        }
        getUser()
    }, [post])

     // Function to truncate post content to 500 characters max
    const truncateContent = (content, maxLength = 8) => {
      if (content.length > maxLength) {
        return content.slice(0, maxLength) + '...';
      }
      return content;
    }

  return (
    <motion.div 
    initial={{
      opacity: 0,
      translateY: 50,
    }}
    animate={{
        opacity: 1,
        translateY: 0,
    }}
    exit={{
        opacity: 0,
        translateY: 50,
    }}
    className='post-card-item'>
        <img src={post.image} alt="post cover" />
        <div className="post-card-info">
          <div className="post-card-author">
            <div className='post-card-title'>{truncateContent(post.title)}</div>
            <div 
              className='post-card-username'>
                {user.username} 
                <FaCheck 
                    size={15} 
                    color='rgb(170, 231, 29)'
                /> 
            </div>
          </div>
          <Link to={`/post/${post.slug}`}>
            <button type="button">
                Read article
            </button>
          </Link>
        </div>
    </motion.div>
  )
}

export default PostCard