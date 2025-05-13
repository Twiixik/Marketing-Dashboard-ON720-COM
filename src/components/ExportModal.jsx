import React from 'react';
import '../styles/ExportModal.css';
import { X } from 'react-feather';

const ExportModal = ({ onClose }) => {

  return (
    <div className="modal-overlay">
      <div className="export-modal">
        <div className="modal-header">
          <h3>Export Report</h3>
          <button className="close-btn" onClick={onClose}><X /></button>
        </div>

        <div className="modal-section">
          <strong>1. Select File Format</strong>
            <div className='file-format-options'>
              <label><input type="radio" name="format" /> PDF File</label>
              <label><input type="radio" name="format" /> Excel File</label>
            </div>
        </div>

        <div className="modal-section">
          <strong>2. Filters</strong>
          <label><input type="checkbox" /> Time Range: Last 7 Days</label>
          <label><input type="checkbox" /> Platforms: Google, LinkedIn, AppSource</label>
          <label><input type="checkbox" /> Campaigns: All</label>
          <label><input type="checkbox" /> Channel: Organic, Paid</label>
          <label><input type="checkbox" /> KPI Cards: All</label>
        </div>

        <div className="modal-section">
          <strong>3. Add Notes</strong>
          <input type="text" placeholder="Meeting report for CEO for Monday!" />
        </div>

        <div className="modal-buttons">
          <button className="export-btn">Export</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
