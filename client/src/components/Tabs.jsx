import React, { useState } from 'react';
import './Tabs.css';
import SearchBar from './SearchBar';

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    props.onTabClick(index);
  };

  return (
    <div className="tab-container">
      <div>
        <button
          className={activeTab === 0 ? "tab-btn active" : "tab-btn"}
          onClick={() => handleTabClick(0)}
        >
          {props.tabdata.one}
        </button>
        <button
          className={activeTab === 1 ? "tab-btn active" : "tab-btn"}
          onClick={() => handleTabClick(1)}
        >
          {props.tabdata.two}
        </button>
        <button
          className={activeTab === 2 ? "tab-btn active" : "tab-btn"}
          onClick={() => handleTabClick(2)}
        >
          {props.tabdata.three}
        </button>
      </div>
      <div className="ml-auto">
        <SearchBar
          place={props.searchBarPlaceholder}
          onSearch={props.onSearchChange}
        />
      </div>
    </div>
  );
};

export default Tabs;
