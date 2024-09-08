import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

  return (
    <div className='post-card-item'>
      <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt="post cover" />
      </Link>
      <div>{post.title}</div>
      <div>{post.category}</div>
      <div>{user.username}</div>
      <Link to={`/post/${post.slug}`}>
        <button type="button">
            Read article
        </button>
      </Link>
    </div>
  )
}

export default PostCard