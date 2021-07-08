import React from 'react';

import SideBar from '../components/SideBar';
import HomeTab from '../components/HomeTab';

const DashboardPage = () => {
  return (
    <>
      <div className="mainPage container">
        <SideBar />
        <HomeTab />
      </div>
    </>
  );
};

export default DashboardPage;
