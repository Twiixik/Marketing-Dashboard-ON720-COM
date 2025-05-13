import React from 'react';
import { X } from 'react-feather';
import '../styles/ExportModal.css';

const ExportModalOpenCard = ({ onClose, title, filters, included }) => {
  return (
    <div className="modal-overlay">
      <div className="export-modal">
        <div className="modal-header">
          <h3>Ready To Export {title} Report</h3>
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
          <strong>2. Filters Preview</strong>
          <ul>
            {filters.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>

        <div className="modal-section">
          <strong>3. Included Data</strong>
          <ul>
            {included.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>

        <div className="modal-buttons">
          <button className="export-btn">Export</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ExportModalOpenCard;
