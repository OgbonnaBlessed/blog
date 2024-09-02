import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Footer = () => {
  const { theme } = useSelector(state => state.theme);

  return (
    <div className={`Footer ${theme === 'dark' ? 'dark-bg' : ''}`}>
      <div className="top-box">
        <div className="programs">
            <h2>Programs</h2>
            <Link>Corporate</Link>
            <Link>One to One</Link>
            <Link>Consulting</Link>
        </div>
        <div className="service">
            <h2>Services</h2>
            <Link>Training</Link>
            <Link>Consulting</Link>
            <Link>Coaching</Link>
        </div>
        <div className="contact">
            <h2>Contact</h2>
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Contact</Link>
        </div>
        <div className="news-letter">
            <h2>Newsletter</h2>
            <div className="subscribe">
                <input type="text" />
                <button type="button">Subscribe</button>
            </div>
            <div className="social-icons">
                <a href="#Facebook"><FaFacebook size={25}/></a>
                <a href="#Facebook"><FaLinkedin size={25}/></a>
                <a href="#Facebook"><FaYoutube size={25}/></a>
                <a href="#Facebook"><FaInstagram size={25}/></a>
            </div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="logo-box">
            Blog
        </div>
        <div className="copyright">
        © Copyright 2023 blogconnects.com
        </div>
      </div>
    </div>
  )
}

export default Footer
