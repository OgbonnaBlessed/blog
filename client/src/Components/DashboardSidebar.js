import React from 'react'
import { FaArrowRight, FaUser } from 'react-icons/fa'
import { HiDocumentText } from 'react-icons/hi'
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const DashboardSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

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
    <div className='side-bar'>
      <div className="logo-contain">
        Blog
      </div>
      <div className="side-bar-content">
        <Link to={'/Dashboard?tab=profile'} className={`profile-direct ${tab === 'profile' ? 'active' : ''}`}>
            <FaUser size={25} />
            <p>Profile</p>
            <span>{currentUser.isAdmin ? 'Admin' : 'user'}</span>
        </Link>
        {currentUser.isAdmin && 
          (
            <Link to={'/Dashboard?tab=posts'} className={`post-direct ${tab === 'posts' ? 'active' : ''}`}>
              <HiDocumentText size={25} />
              Posts
          </Link>
          )}
        <div className="sign-out" onClick={() => handleSignOut()}>
            <FaArrowRight size={20}/>
            <p>Sign out</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
