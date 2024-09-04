import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaMoon, FaSearch, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { MdSunny } from 'react-icons/md'

const Header = () => {
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const [userInfo, setUserInfo] = useState(false);
    const dispatch = useDispatch();

    const profileRef = useRef();

    // useEffect(() => {
    //    const closeProfileBox = (event) => {
    //     if (!profileRef.current.contains(event.target)) {
    //         setUserInfo(false);
    //     }
    //    };

    //    document.addEventListener('mousedown', closeProfileBox);

    //     return () => {
    //         document.removeEventListener('mousedown', closeProfileBox);
    //     };
    // });

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
            <div className="background-toggle-box" onClick={() => dispatch(toggleTheme())}>
                {
                    theme === 'light' 
                    ? (<FaMoon className='toggle-icon' size={18}/>)
                    : (<MdSunny className='toggle-icon' size={20} />)
                }
            </div>
            {
                currentUser 
                ? (
                    <div className="user-info-container" ref={profileRef}>
                        <div className='user-info' onClick={() => setUserInfo(!userInfo)}>
                            {
                                currentUser.profilePicture 
                                ? <img src={currentUser.profilePicture} alt="" />
                                : <FaUser className='user-icon' size={25} />
                            }
                        </div>
                        
                        <div className={`user-info-drop-down ${userInfo ? 'active' : 'inactive'}`}>
                            <div className="user-name">{currentUser.username}</div>
                            <div className="email">{currentUser.email}</div>
                            <Link to="/Dashboard?tab=profile">Profile</Link>
                            <button type='button'>Log out</button>
                        </div>
                       
                    </div>
                ) : (  <>
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
