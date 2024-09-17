import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentSection from '../Components/CommentSection';
import Author from '../Components/Author';
import { motion } from 'framer-motion';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Fetch the current post by its slug
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

        setPost(data.posts[0]);
        setLoading(false);
        setTimeout(() => {
          setError(false);
        }, 5000);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  // Fetch all posts for recent and related posts
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecentPosts();
  }, []);

  // Fetch related posts based on the post's category
  useEffect(() => {
    if (post && post.category) {
      const fetchRelatedPosts = async () => {
        try {
          const res = await fetch(`/api/post/getrelatedposts?category=${post.category}&slug=${postSlug}`);
          const data = await res.json();

          if (res.ok) {
            setRelatedPosts(data.posts);
          }
        } catch (error) {
          console.log('Error fetching related posts:', error);
        }
      };

      fetchRelatedPosts();
    }
  }, [post, postSlug]);

  const spinnerStyle = {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    borderTopColor: '#444444',
    animation: 'spin 1s ease-in-out infinite',
  };

  if (loading)
    return (
      <div className='spinner-container'>
        <div style={spinnerStyle}></div>
      </div>
    );

  return (
    <motion.div 
    initial={{
      opacity: 0,
      translateY: 200,
    }}
    animate={{
      opacity: 1,
      translateY: 0
    }}
    exit={{
      opacity: 0,
      translateY: 200
    }}
    className='post-page'>
      <div className='post-page-container'>
        <div className='post-item-box'>
          <motion.h1 
          initial={{
            opacity: 0,
            translateY: -200,
          }}
          animate={{
            opacity: 1,
            translateY: 0
          }}
          exit={{
            opacity: 0,
            translateY: -200
          }}
          className='post-title'>{post && post.title}</motion.h1>
          <div className='category-author'>
            <Link to={`/search?category=${post && post.category}`}>
              <button type='button'>{post && post.category}</button>
            </Link>
            <Author post={post} />
          </div>
          <img src={post.image} alt='' />
          <div className='post-sub-info'>
            <p>{post && new Date(post.createdAt).toLocaleDateString()}</p>
            <p>{post && (post.content.length / 1000).toFixed(0)} mins read</p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post && post.content }}
            className='post-content'
          ></div>
          <CommentSection postId={post._id} />
        </div>

        {/* Related Posts Section */}
        <div className='contain-home-side-content'>
          <div className='Home-side-content'>
            <h1>Related Articles</h1>
            <div className='side-content-item'>
              {relatedPosts.length > 0 ? (
                relatedPosts.map((relatedPost, i) => (
                  <Link to={`/post/${relatedPost.slug}`} key={i}>
                    {relatedPost.title}
                  </Link>
                ))
              ) : (
                <p>No related article found</p>
              )}
            </div>
          </div>

          {/* Recent Posts Section */}
          <div className='Home-side-content'>
            <h1>Recent Articles</h1>
            <div className='side-content-item'>
              {recentPosts &&
                recentPosts.map((post, i) => (
                  <Link to={`/post/${post.slug}`} key={i}>
                    {post.title}
                  </Link>
                ))}
            </div>
          </div>
          {error &&
            <p>{error}</p>
          }
        </div>
      </div>
    </motion.div>
  );
};

export default PostPage;