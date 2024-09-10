import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Author from '../Components/Author';

const Home = () => {
  const [posts, setPosts] = useState([]);

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
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
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

  return (
    <div className="Home-page">
      <div className="featured-posts-container">
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
                  <img src={post.image} alt={post.title} />
                  <p>{post.title}</p>
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
      </div>
      <div className="Home-page-body">
        <div className="Home-page-main-content">
          {posts.slice(0, 3).map((post, i) => (
            <div className="main-content-item" key={i}>
              <img src={post.image} alt="" />
              <div className="miscellanous">
                <div dangerouslySetInnerHTML={{ __html: post && truncateContent(post.content) }}  className='post-content'>
                  
                </div>
                <div className="Author-container">
                  <p>{post.title}</p>
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
      </div>
    </div>
  );
};

export default Home;