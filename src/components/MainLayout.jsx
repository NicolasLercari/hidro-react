import React from 'react';
import Header from './molecules/Header.jsx';
import SideBar from './organisms/SideBar.jsx';
import Formula from './Formula.jsx';
import './_style.scss';

const MainLayout = () => (
  <div className="AppContainer">
    <Header />
    <SideBar />
    <div className="MainContent">
      <Formula />
    </div>
  </div>
);

export default MainLayout;
