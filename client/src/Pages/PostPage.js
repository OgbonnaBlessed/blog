import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const PostPage = () => {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();

                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setTimeout(() => {
                        setError(false);
                    }, 5000);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }

        fetchPost();
    },[postSlug]);

    const spinnerStyle = {
        border: '4px solid rgba(0, 0, 0, 0.1)',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        borderTopColor: 'rgba(4, 122, 14, 0.438)',
        animation: 'spin 1s ease-in-out infinite',
    };

    if (loading) return (
                        <div className='spinner-container'>
                            <div style={spinnerStyle}></div>
                        </div>
    ) 

  return (
    <div className='post-page'>
        <div className="post-item-box">
            <h1>{post && post.title}</h1>
            <Link to={`/search?category=${post && post.category}`}>
                <button type="button">{post && post.category}</button>
            </Link>
            <img src={post.image} alt="" />
            <div className="post-sub-info">
                <p>{post && new Date(post.createdAt).toLocaleDateString()}</p>
                <p>{post && (post.content.length /1000).toFixed(0)} mins read</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post && post.content }} className='post-content'>

            </div>
        </div>
    </div>
  )
}

export default PostPage
