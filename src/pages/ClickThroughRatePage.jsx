// src/pages/ClickThroughRatePage.jsx
import React from 'react';
import { useState } from 'react';
import ExportModalOpenCard from '../components/ExportModalOpenCard';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer
} from 'recharts';
import { ChevronLeft, Info } from 'react-feather';
import '../styles/cardBase.css';
import '../styles/openCards.css';

const ctrData = [
  { day: 'Mon', ctr: 1.8 },
  { day: 'Tue', ctr: 1.2 },
  { day: 'Wed', ctr: 2.5 },
  { day: 'Thu', ctr: 3.1 },
  { day: 'Fri', ctr: 2.7 },
  { day: 'Sat', ctr: 1.6 },
  { day: 'Sun', ctr: 0.9 },
  { day: 'Sun', ctr: 0.9 },
];

const formatData = [
  { format: 'Video', ctr: 2.3 },
  { format: 'Carousel', ctr: 1.5 },
  { format: 'Text', ctr: 1.4 },
  { format: 'Image', ctr: 1.2 },
];

const tableData = [
  { campaign: 'Spring 2024', platform: 'LinkedIn Ads', format: 'Video', ctr: '2,8%', impressions: '10,587', clicks: 378 },
  { campaign: 'App Promo Week', platform: 'Google Ads', format: 'Carousel', ctr: '1,8%', impressions: '8,026', clicks: 258 },
  { campaign: 'Product Launch', platform: 'Bing Ads', format: 'Text', ctr: '0,9%', impressions: '1,025', clicks: 148 }
];

const COLORS = ['var(--chart-yellow-a)', 'var(--chart-green-b)', 'var(--chart-blue-b)', 'var(--chart-purple-a)'];

const ClickThroughRatePage = () => {
  const navigate = useNavigate();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="card-container">
      <div className="card-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}><ChevronLeft size={40} /></button>
          <h2 className="open-card-title">Click-Through Rate</h2>
        </div>
        {/* Info Button with Hover Tooltip */}
                <div className="info-wrapper"
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
                >
                  <button className="info-btn"><Info size={40} /></button>
                  {showInfo && (
                    <div className="info-tooltip">
                      CTR is the percentage of users who clicked on your ad after seeing it. 
                      It’s calculated as (Clicks ÷ Impressions) × 100.
                    </div>
                  )}
                  </div>
              </div>

      <div className="detail-total">3,8%</div>

      <div className="filters-row">
        <div className="open-dropdown-wrapper">
            <select>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
            </select>
            <ChevronDown className="dropdown-icon" size={20} />
        </div>

        <div className="open-dropdown-wrapper">
        <select>
            <option>All Platforms</option>
            <option>LinkedIn</option>
            <option>Google</option>
            <option>AppSource</option>
        </select>
        <ChevronDown className="dropdown-icon" size={20} />
        </div>

        <div className="open-dropdown-wrapper">
        <select>
            <option>Organic and Paid</option>
            <option>Organic</option>
            <option>Paid</option>
        </select>
        <ChevronDown className="dropdown-icon" size={20} />
        </div>

        <div className="open-dropdown-wrapper">
        <select>
            <option>Choose</option>
        </select>
        <ChevronDown className="dropdown-icon" size={20} />
        </div>
      </div>

      <div className="double-metric-boxes">
        <div className="metric-box">
          <h4>Google Ads</h4>
          <p>3,8%</p>
        </div>
        <div className="metric-box">
          <h4>LinkedIn</h4>
          <p>2,8%</p>
        </div>
        <div className="metric-box">
          <h4>AppSource</h4>
          <p>1,3%</p>
        </div>
      </div>

      <div className="double-chart-boxes">
        <div className="card-inner-box chart-container">
          <h3 className="centered-title">CTR Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ctrData}>
              <CartesianGrid vertical={false} />
              <XAxis tick={false} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ctr" stroke="#0377FF" strokeWidth={2} dot={{ r: 5, strokeWidth: 1, fill: '#0377FF' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-inner-box chart-container">
          <h3 className="centered-title">CTR by Format</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={formatData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="format" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ctr">
                {formatData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card-inner-box table-container">
        <h3>Breakdown by Campaign</h3>
        <table>
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Platform</th>
              <th>Format</th>
              <th>CTR</th>
              <th>Impressions</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.campaign}</td>
                <td>{row.platform}</td>
                <td>{row.format}</td>
                <td>{row.ctr}</td>
                <td>{row.impressions}</td>
                <td>{row.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-row">
        <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
        <button className="export-btn" onClick={() => setIsExportOpen(true)}>Export</button>
      </div>
       {/* Export Modal */}
       {isExportOpen && (
  <ExportModalOpenCard
    onClose={() => setIsExportOpen(false)}
    title="Click through Rate"
    filters={[
      "Time Range: Last 7 Days",
      "Platforms: Google, LinkedIn, AppSource",
      "Channel: Organic, Paid"
    ]}
    included={[
      "CTR by Platform",
      "CTR by Format",
      "CTR Over Time",
      "CTR by Campaign"
    ]}
  />
)}
    </div>
  );
};

export default ClickThroughRatePage;
