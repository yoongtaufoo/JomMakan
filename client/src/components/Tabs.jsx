import React, { useState } from 'react';
import './Tabs.css';
import SearchBar from "./SearchBar";


const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    props.onTabClick(index); // Call the onTabClick function with the index
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="ml-auto">
    <button className={activeTab === 0 ? 'tab-btn active' : 'tab-btn'} onClick={() => handleTabClick(0)}>{props.tabdata.one}</button>
      <button className={activeTab === 1 ? 'tab-btn active' : 'tab-btn'} onClick={() => handleTabClick(1)}>{props.tabdata.two}</button>
      <button className={activeTab === 2 ? 'tab-btn active' : 'tab-btn'} onClick={() => handleTabClick(2)}>{props.tabdata.three}</button>
      </div>
    <div className="ml-auto">
      <SearchBar place="Worshops, Events...."/>
    </div>
  {/* </div>
    <div className='tabs'>
      <button className={activeTab === 0 ? 'tab-btn active' : 'tab-btn'} onClick={() => handleTabClick(0)}>{props.tabdata.one}</button>
      <button className={activeTab === 1 ? 'tab-btn active' : 'tab-btn'} onClick={() => handleTabClick(1)}>{props.tabdata.two}</button>
      <button className={activeTab === 2 ? 'tab-btn active' : 'tab-btn'} onClick={() => handleTabClick(2)}>{props.tabdata.three}</button>
      <div id="search-container">
      <SearchBar place="Worshops, Events...."/>
      </div > */}
      {/* <input type='text' placeholder='Search...' className='search-bar' />
      <button className='fav-btn'>Favourites</button>
      <button className='schedule-btn'>Schedule</button> */}
    </div>
  );
};

export default Tabs;
