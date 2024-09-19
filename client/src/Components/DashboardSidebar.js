import React from 'react'
import { FaBookmark, FaComments, FaUser, FaUsers, FaUserShield } from 'react-icons/fa'
import { HiDocumentText } from 'react-icons/hi'
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MdLogout, MdDashboard } from 'react-icons/md'
import { fetchBookmarks } from '../redux/bookmark/bookmarkSlice';

const DashboardSidebar = () => {
  const [tab, setTab] = useState('');
  const [sideBar, setSideBar] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user);
  const totalBookmarks = useSelector((state) => state.bookmarks.totalBookmarks);


  const sidebarRef = useRef();

  useEffect(() => {
      const closeProfileBox = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSideBar(false);
        }
      };

      document.addEventListener('mousedown', closeProfileBox);

      return () => {
            document.removeEventListener('mousedown', closeProfileBox);
      };
  });

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchBookmarks(currentUser._id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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

  return (
    <div className='side-bar' ref={sidebarRef}>
      <div className="logo-contain">
          <FaUserShield 
            className={`user-admin-icon ${sideBar ? 'inactive' : 'active'}`} 
            onClick={() => setSideBar(!sideBar)}/>
      </div>
      <div className={`side-bar-content ${sideBar ? 'active' : 'inactive'}`}>
        {currentUser.isAdmin && 
        (
          <Link 
            to={'/Dashboard?tab=collection'} 
            onClick={() => setSideBar(false)}
            className={`post-direct ${tab === 'collection' ? 'active' : ''}`}
          >
              <MdDashboard size={25} />
              Dashboard
          </Link>
        )}
        <Link 
          to={'/Dashboard?tab=profile'} 
          onClick={() => setSideBar(false)}
          className={`profile-direct ${tab === 'profile' ? 'active' : ''}`}
          >
            <FaUser size={25} />
            <p>Profile</p>
            <span>{currentUser.isAdmin ? 'Admin' : 'user'}</span>
        </Link>
        {currentUser.isAdmin && 
          (<>
            <Link 
              to={'/Dashboard?tab=posts'} 
              onClick={() => setSideBar(false)}
              className={`post-direct ${tab === 'posts' ? 'active' : ''}`}
              >
              <HiDocumentText size={25} />
              Posts
            </Link>
            <Link 
              to={'/Dashboard?tab=users'} 
              onClick={() => setSideBar(false)}
              className={`post-direct ${tab === 'users' ? 'active' : ''}`}
              >
              <FaUsers size={25}/>
              Users
            </Link>
            <Link 
              to={'/Dashboard?tab=comments'} 
              onClick={() => setSideBar(false)}
              className={`post-direct ${tab === 'comments' ? 'active' : ''}`}
              >
              <FaComments size={25}/>
              Comments
            </Link>
          </>
          )}
          <Link 
          to={'/Dashboard?tab=bookmarks'} 
          onClick={() => setSideBar(false)}
          className={`profile-direct ${tab === 'bookmarks' ? 'active' : ''}`}
          >
            <FaBookmark size={25} />
            <p>Bookmarks</p>
            <span className='bookmark-items'>{totalBookmarks}</span>
        </Link>
        <div 
          className="sign-out" 
          onClick={() => {
            handleSignOut()
            setSideBar(false)
          }}
          >
            <MdLogout size={20}/>
            <p>Sign out</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
