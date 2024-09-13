import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { FaMoon, FaSearch, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { MdSunny } from 'react-icons/md'
import { signOutSuccess } from '../redux/user/userSlice'

const Header = () => {
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const [userInfo, setUserInfo] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [lastScrollPos, setLastScrollPos] = useState(0); // To track the scroll position
    const [hideHeader, setHideHeader] = useState(false); // To toggle header visibility
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');

        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search])

    const profileRef = useRef();

    useEffect(() => {
       const closeProfileBox = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setUserInfo(false);
        }
       };

       document.addEventListener('mousedown', closeProfileBox);

        return () => {
            document.removeEventListener('mousedown', closeProfileBox);
        };
    });

    // Scroll detection logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            // If scrolling down, hide the header
            if (currentScrollPos > lastScrollPos) {
                setHideHeader(true);
            } else {
                // If scrolling up, show the header
                setHideHeader(false);
            }
            setLastScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPos]);

    const handleSignOut = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
    
          const  data = await res.json();
    
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signOutSuccess())
          }
        } catch (error) {
          console.log(error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    return (
      <div className={`nav-container ${hideHeader ? 'hide' : ''}`}>
        <div className="nav-box">
            <div className="nav-logo">
                <p className='This'>This</p>
                <p className='Jesus'>Jesus</p>
            </div>
            <form onSubmit={handleSubmit} className="search-box">
                <input 
                    type="text" 
                    placeholder='Search...' 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                <button type='submit' className="search-icon">
                    <FaSearch size={20} className='icon' />
                </button>
            </form>
            <div className="nav-links">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/About'>About</NavLink>
                <NavLink to='/Contact'>Contact</NavLink>
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
                            <Link onClick={() => setUserInfo(!userInfo)} to="/Dashboard?tab=profile">Profile</Link>
                            {currentUser.isAdmin
                            && (
                                <Link onClick={() => setUserInfo(!userInfo)} to="/Dashboard?tab=collection">
                                    Dashboard
                                </Link>
                            )}
                            <button type='button' onClick={() => handleSignOut()}>Sign out</button>
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

export default Header;