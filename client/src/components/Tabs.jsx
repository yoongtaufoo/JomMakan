import React, { useState } from 'react';
import './Tabs.css';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='tabs'>
      <button className={activeTab === 0 ? 'tab-btn active' : 'tab-btn'} onClick={() => handleTabClick(0)}>Top Picks</button>
      <button className={activeTab === 1 ? 'tab-btn active' : 'tab-btn'} onClick={() => handleTabClick(1)}>Recently Viewed</button>
      <button className={activeTab === 2 ? 'tab-btn active' : 'tab-btn'} onClick={() => handleTabClick(2)}>Fresh Additions</button>
      <input type='text' placeholder='Search...' className='search-bar' />
      <button className='fav-btn'>Favourites</button>
      <button className='schedule-btn'>Schedule</button>
    </div>
  );
};

export default Tabs;
