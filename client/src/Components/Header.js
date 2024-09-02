import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaMoon, FaSearch, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Header = () => {
    const { currentUser } = useSelector(state => state.user);
    const [userInfo, setUserInfo] = useState(false);

    const displayInfo = () => {
        setUserInfo(!userInfo);
    }

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
            {
                currentUser 
                ? (
                    <div className="user-info-container">
                        <div className='user-info' onClick={displayInfo}>
                            {
                                currentUser.profilePicture 
                                ? <img src={currentUser.profilePicture} alt="" />
                                : <FaUser className='user-icon' size={25} />
                            }
                        </div>
                        {userInfo &&
                        <div className="user-info-drop-down">
                            <div className="user-name">{currentUser.username}</div>
                            <div className="email">{currentUser.email}</div>
                            <Link to="/Dashboard?=profile">Profile</Link>
                            <button type='button'>Log out</button>
                        </div>
                        }
                    </div>
                ) 
                : (
                    <>
                    <Link to='/signup'>
                        <button type="button">Sign up</button>
                    </Link>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default Header
