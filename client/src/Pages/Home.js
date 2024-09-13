import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Author from '../Components/Author';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const featureBoxRef = useRef(null); // Ref for the container
  const [showLeft, setShowLeft] = useState(false); // Control left arrow visibility
  const [showRight, setShowRight] = useState(true); // Control right arrow visibility

  // Function to handle the scrolling logic
  const scroll = (direction) => {
    const featureBox = featureBoxRef.current;
    if (featureBox) {
      const scrollAmount = featureBox.clientWidth * direction; // Determine scroll direction
      featureBox.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Manually trigger handleButtons after the scroll action
      setTimeout(handleButtons, 0); // Timeout to wait for smooth scroll completion
    }
  };

  // Function to handle showing or hiding arrows
  const handleButtons = () => {
    const featureBox = featureBoxRef.current;
    if (featureBox) {
      const maxScrollLeft = featureBox.scrollWidth - featureBox.clientWidth;
      setShowLeft(featureBox.scrollLeft > 0); // Show left arrow if scrolled more than 0
      setShowRight(featureBox.scrollLeft < maxScrollLeft); // Show right arrow if not at max scroll
    }
  };

  // useEffect to attach the scroll event listener
  useEffect(() => {
    const featureBox = featureBoxRef.current;
    if (featureBox) {
      featureBox.addEventListener('scroll', handleButtons);

      // Cleanup the event listener
      return () => {
        featureBox.removeEventListener('scroll', handleButtons);
      };
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return;
      }

     setLoading(false);
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  // Function to truncate post content to 500 characters max
  const truncateContent = (content, maxLength = 500) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    }
    return content;
  }

  // Function to truncate post content to 8 characters max
  const truncateTitle = (content, maxLength = 8) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    }
    return content;
  }

  // Function to truncate post content to 20 characters max
  const truncateTitleItem = (content, maxLength = 20) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    }
    return content;
  }
  
  

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
    <div className="Home-page">
      <motion.div 
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
      className="featured-posts-container">
        {showLeft && (
          <FaAngleLeft
            id="prev_slide"
            className="feature-icon left"
            onClick={() => scroll(-1)}
          />
        )}

        {posts && posts.length > 0 && (
          <div className="featured-posts-box" ref={featureBoxRef}>
            {posts.map((post) => (
              <Link to={`/post/${post.slug}`} key={post._id}>
                <div className="featured-posts">
                  <img src={post.image} loading='lazy' alt={post.title} />
                  <p>{truncateTitle(post.title)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {showRight && (
          <FaAngleRight
            id="next_slide"
            className="feature-icon right"
            onClick={() => scroll(1)}
          />
        )}
      </motion.div>
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
       className="Home-page-body-intro">
        <div className="intro-content">
          <motion.h2
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
            translateY: -50,
          }}
          >Welcome to a Journey of Faith!</motion.h2>
          <motion.div 
            initial={{
              opacity: 0,
              translateX: -200,
            }}
            animate={{
              opacity: 1,
              translateX: 0
            }}
            exit={{
              opacity: 0,
              translateX: -200
            }}
          className="intro-main-content">
            <p>
            In a world filled with uncertainty, Christ is our constant. We invite you to embark on a journey of transformation, where hearts are healed, burdens are lifted, and souls are restored. Jesus stands at the door of your heart, gently knocking, not with condemnation, but with love, grace, and acceptance. "Come to me, all you who are weary and burdened, and I will give you rest" (Matthew 11:28).
            </p>

            <p>
            You are welcome here. In Christ, there is no rejection, no condemnation—only love, acceptance, and a new beginning.
            </p>
            <Link to='/search'>
              Start your journey now!
            </Link>
          </motion.div>
        </div>
        <div className="intro-content-image">
          <motion.img
          initial={{
            opacity: 0,
            translateX: 200,
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          exit={{
            opacity: 0,
            translateX: 200
          }}
           src={`${process.env.PUBLIC_URL}/images/view1.jpeg`} alt="" />
        </div>
      </motion.div>
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
         className="Home-page-body">
        <div className="Home-page-main-content">
          {posts.slice(0, 3).map((post, i) => (
            <div className="main-content-item" key={i}>
              <img src={post.image} alt="" />
              <div className="miscellanous">
                <div dangerouslySetInnerHTML={{ __html: post && truncateContent(post.content) }}  className='post-content'>
                  
                </div>
                <div className="Author-container">
                  <p>{truncateTitleItem(post.title)}</p>
                  <div className="Author-box">
                    <Author post={post}/>
                    <FaCheck className='author-icon'/>
                  </div>
                </div>
                <Link to={`/post/${post.slug}`}>
                  <button type="button">Read article</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="Home-side-content">
          <h2>Recent Posts</h2>
          <div className="side-content-item">
            {posts.slice(0, 5).map((post, i) => (
              <Link to={`/post/${post.slug}`} key={i}>
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;