import React from 'react'

const Projects = () => {
  return (
    <div className='contact-page'>
      <div className="left-content">
        <div class="form-intro">
          <h2>We’d Love to Hear from You</h2>
          <p>Whether you have a suggestion, want to work together, or simply have a question, this is the place to reach us!</p>
        </div>
        <form class="contact-form-container">
          <label for="name">Your Full Name</label>
          <input type="text" id="name" name="name" required />

          <label for="email">Your Email Address</label>
          <input type="email" id="email" name="email" required />

          <label for="message">Your Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>

          <button type="submit" class="submit-button">Send Message</button>
        </form>
      </div>
      <div className="right-content">
        
      </div>
      <div class="form-confirmation" id="form-confirmation">
        
      </div>
    </div>
  )
}

export default Projects
