import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
import ExportModal from './ExportModal'; 
import '../styles/sidebar.css';

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        {/* TOP: Logo + filters */}
        <div className="sidebar-content">
          <div className="logo">
            <img src="/on720com-logo.png" alt="ON720 Logo" />
          </div>

          <div className="filter-group">
            <label>Time Range</label>
            <div className="dropdown-wrapper">
              <select>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
              <ChevronDown className="dropdown-icon" size={20} />
            </div>

            <label>Platform</label>
            <div className="dropdown-wrapper">
              <select>
                <option>All Platforms</option>
                <option>LinkedIn</option>
                <option>Google</option>
                <option>AppSource</option>
              </select>
              <ChevronDown className="dropdown-icon" size={20} />
            </div>

            <label>Channel</label>
            <div className="dropdown-wrapper">
              <select>
                <option>Organic and Paid</option>
                <option>Organic</option>
                <option>Paid</option>
              </select>
              <ChevronDown className="dropdown-icon" size={20} />
            </div>

            <label>Campaign</label>
            <div className="dropdown-wrapper">
              <select>
                <option>Choose</option>
              </select>
              <ChevronDown className="dropdown-icon" size={20} />
            </div>

            <button className="sidebar-export-btn" onClick={handleOpenModal}>
              Export
            </button>
          </div>
        </div>

        {/* BOTTOM: User info */}
        <div className="user-info">
          <img src="/kent-avatar.png" alt="Kent Sørensen" className="avatar" />
          <div>
            <p><strong>Kent Sørensen</strong></p>
            <button className="logout">Log out</button>
          </div>
        </div>
      </div>

      {/* Render Export Modal */}
      {isModalOpen && <ExportModal onClose={handleCloseModal} />}
    </aside>
  );
};

export default Sidebar;
