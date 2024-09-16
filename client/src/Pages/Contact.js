import React, { useState } from 'react';
import { MdCall, MdEmail } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(formData.email)) {
      setModalMessage('Kindly input a valid email address');
      setShowModal(true);
      return;
    }

    // Structure the data to be sent with EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: 'Ogbonna Blessed', // Your name as the recipient
      message: formData.message,
    };

    // Send email using EmailJS
    emailjs.send('service_hqfwqmk', 'template_pd3kupt', templateParams, 'tigbX2rKt4LPzq3U6')
      .then((result) => {
        // Success message
        setModalMessage('Your message has been received, and we\'ll get in touch with you shortly.');
        setShowModal(true);

        // Reset form data after sending
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }, (error) => {
        // Error handling
        setModalMessage('Something went wrong. Please try again later.');
        setShowModal(true);
      });
  };

  return (
    <div className='contact-page'>
      <motion.div
        initial={{
          opacity: 0,
          translateY: -100,
        }}
        animate={{
          opacity: 1,
          translateY: 0
        }}
        exit={{
          opacity: 0,
          translateY: -100
        }}
       className="form-intro">
        <h2 className='love-text'>We’d Love to Hear from You</h2>
        <p>Whether you have a suggestion, want to work together, or simply have a question, this is the place to reach us!</p>
      </motion.div>
      <div className="contact-page-main">
        <motion.form 
        initial={{
          opacity: 0,
          translateX: -500,
        }}
        animate={{
          opacity: 1,
          translateX: 0
        }}
        exit={{
          opacity: 0,
          translateX: -500
        }}
        className="contact-form-container" onSubmit={handleSubmit}>
          <div className="input-container">
            <h3 htmlFor="name">Your Full Name</h3>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleInputChange} 
            />
          </div>

          <div className="input-container">
            <h3 htmlFor="email">Your Email Address</h3>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleInputChange} 
            />
          </div>

          <div className="input-container">
            <h3 htmlFor="message">Your Message</h3>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              required 
              value={formData.message} 
              onChange={handleInputChange} 
            ></textarea>
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </motion.form>
        <motion.div 
        initial={{
          opacity: 0,
          translateX: 500,
        }}
        animate={{
          opacity: 1,
          translateX: 0
        }}
        exit={{
          opacity: 0,
          translateX: 500
        }}
        className="alternate-contact">
          <h2>You can also connect via:</h2>
          <div className="top-contact">
            <div className="get-in-touch-email">
              <MdEmail />
              <a href="mailto:blessedlyrics11@gmail.com">blessedlyrics11@gmail.com</a>
            </div>
            <div className="get-in-touch-email">
              <MdCall />
              <a href="tel:+1234567890">+123-456-7890</a>
            </div>
          </div>
        </motion.div>
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

export default Contact;