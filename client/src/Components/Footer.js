import React, { useState } from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme } = useSelector(state => state.theme);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleSubscribe = async () => {
    // Check if email input is empty
    if (!email) {
      setModalMessage("Please enter an email address.");
      setShowModal(true);
      return;
    }

    // Check for valid email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setModalMessage("Please enter a valid email address.");
      setShowModal(true);
      return;
    }

    // Make request to the backend to handle subscription
    try {
      const response = await fetch('/api/subscription/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // Check if email already exists in the database
      if (data.exists) {
        setModalMessage("This email address already exists.");
      } else {
        setModalMessage("Thank you for subscribing to our newsletter.");
        setEmail('');
      }
    } catch (error) {
      setModalMessage("An error occurred. Please try again.");
    }

    setShowModal(true);
  };

  return (
    <div className={`Footer ${theme === 'dark' ? 'dark-bg' : ''}`}>
      <div className="top-box">
        <div className="programs">
          <h2>Programs</h2>
          <Link to="/Contact">Corporate</Link>
          <Link to="/Contact">One to One</Link>
          <Link to="/Contact">Consulting</Link>
        </div>
        <div className="service">
          <h2>Services</h2>
          <Link to="/Contact">Training</Link>
          <Link to="/Contact">Consulting</Link>
          <Link to="/Contact">Coaching</Link>
        </div>
        <div className="contact">
          <h2>Contact</h2>
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>
        </div>
        <div className="news-letter">
          <h2>Newsletter</h2>
          <div className="subscribe">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button onClick={handleSubscribe} type="button">Subscribe</button>
          </div>
          <div className="social-icons">
            <a href="#Facebook"><FaFacebook size={25}/></a>
            <a href="#LinkedIn"><FaLinkedin size={25}/></a>
            <a href="#YouTube"><FaYoutube size={25}/></a>
            <a href="#Instagram"><FaInstagram size={25}/></a>
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="logo-box">
          <div className="nav-logo">
            <p className='This'>This</p>
            <p className='Jesus'>Jesus</p>
          </div>
        </div>
        <div className="copyright">
          © Copyright 2024 thisjesus.com
        </div>
      </div>
      <AnimatePresence>
        {showModal &&
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-container"
          >
            <motion.div 
              initial={{ translateY: -400, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: -400, opacity: 0 }}
              className="modal-box"
            >
              <FaTimes 
                className='close-modal'
                onClick={() => setShowModal(false)}
              />
              <p className='modal-text'>{modalMessage}</p>
              <motion.div className="actions">
                <button type="button" onClick={() => setShowModal(false)}>OK</button>
              </motion.div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};

export default Footer;