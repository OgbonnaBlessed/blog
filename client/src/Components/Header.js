import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { FaMoon, FaSearch, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { MdSunny } from 'react-icons/md'
import { signOutSuccess } from '../redux/user/userSlice'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Header = () => {
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const [userInfo, setUserInfo] = useState(false);
    const [sideBar, setSideBar] = useState(false);
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
    const sidebarRef = useRef();

    useEffect(() => {
       const closeProfileBox = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setUserInfo(false);
        }

        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSideBar(false);
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
        <div className="nav-box" ref={sidebarRef}>
            <Link to='/' className="nav-logo" onClick={() => setSideBar(false)}>
                <p className='This'>This</p>
                <p className='Jesus'>Jesus</p>
            </Link>
            <form onSubmit={handleSubmit} className="search-box">
                <input 
                    type="text" 
                    placeholder='Search...' 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                <button type='submit' className="search-icon">
                    <FaSearch className='icon' />
                </button>
            </form>
            <form onSubmit={handleSubmit} className="search-box-md">
                <button type='submit' className="search-icon">
                    <FaSearch className='icon-md' />
                </button>
            </form>
            <div className={`right-items ${sideBar ? 'active' : 'inactive'}`}>
                <div className="nav-links">
                    <NavLink to='/' onClick={() => setSideBar(!sideBar)}>Home</NavLink>
                    <NavLink to='/About' onClick={() => setSideBar(!sideBar)}>About</NavLink>
                    <NavLink to='/Contact' onClick={() => setSideBar(!sideBar)}>Contact</NavLink>
                </div>
                <div className="background-toggle-box" onClick={() => dispatch(toggleTheme())}>
                    {
                        theme === 'light' 
                        ? (<FaMoon className='toggle-icon' size={18}/>)
                        : (<MdSunny className='toggle-icon' size={18} />)
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
                                <Link 
                                    onClick={() => {
                                        setUserInfo(!userInfo)
                                        setSideBar(!sideBar)
                                        }} 
                                    to="/Dashboard?tab=profile">Profile</Link>
                                {currentUser.isAdmin
                                && (
                                    <Link 
                                        onClick={() => {
                                            setUserInfo(!userInfo)
                                            setSideBar(!sideBar)
                                            }} 
                                        to="/Dashboard?tab=collection">
                                        Dashboard
                                    </Link>
                                )}
                                <button type='button' onClick={() => handleSignOut()}>Sign out</button>
                            </div>
                        
                        </div>
                    ) : (  <>
                            <Link to='/signup' onClick={() => setSideBar(!sideBar)}>
                                <button type="button">Sign up</button>
                            </Link>
                        </>
                    )
        
                }
            </div>
                <BsThreeDotsVertical className='sidebar-drop-icon' onClick={() => setSideBar(!sideBar)}/>
        </div>
      </div>
    )
}

export default Header;