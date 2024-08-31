import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaMoon, FaSearch } from 'react-icons/fa'

const Header = () => {
  return (
    <div className='nav-container'>
        <div className="nav-box">
            <div className="nav-logo">
                Blog
            </div>
            <div className="search-box">
                <input type="text" placeholder='Search...' />
                <div className="search-icon">
                    <FaSearch size={20} className='icon' />
                </div>
            </div>
            <div className="nav-links">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/About'>About</NavLink>
                <NavLink to='/Projects'>Projects</NavLink>
            </div>
            <div className="background-toggle-box">
                <FaMoon size={18}/>
            </div>
            <Link to='/Sign-up'>
                <button type="button">Sign up</button>
            </Link>
        </div>
    </div>
  )
}

export default Header
