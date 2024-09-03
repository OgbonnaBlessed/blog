import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import DashboardProfile from '../Components/DashboardProfile'
import DashboardSidebar from '../Components/DashboardSidebar'

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="dashboard">
        <DashboardSidebar/>

      {tab === 'profile' && <DashboardProfile/>}
    </div>
  )
}

export default Dashboard

