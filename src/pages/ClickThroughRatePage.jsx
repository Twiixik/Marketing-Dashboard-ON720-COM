import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExportModalOpenCard from '../components/ExportModalOpenCard';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer
} from 'recharts';
import { ChevronLeft, ChevronDown, Info } from 'react-feather';
import '../styles/cardBase.css';
import '../styles/openCards.css';

const COLORS = ['var(--chart-yellow-a)', 'var(--chart-green-b)', 'var(--chart-blue-b)', 'var(--chart-purple-a)'];

const ClickThroughRatePage = () => {
  const navigate = useNavigate();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');

  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [platformSummary, setPlatformSummary] = useState([]);
  const [totalCTR, setTotalCTR] = useState('0%');

  useEffect(() => {
    fetch(`https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/ctr/${selectedRange}.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLineData(data.lineData || []);
          setBarData(data.barData || []);
          setTableData(data.tableData || []);
          setPlatformSummary(data.platformSummary || []);
          setTotalCTR(data.totalCTR || '0%');
        }
      });
  }, [selectedRange]);

  return (
    <div className="card-container">
      <div className="card-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}><ChevronLeft size={40} /></button>
          <h2 className="open-card-title">Click-Through Rate</h2>
        </div>
        <div className="info-wrapper" onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
          <button className="info-btn"><Info size={40} /></button>
          {showInfo && (
            <div className="info-tooltip">
              CTR is the percentage of users who clicked on your ad after seeing it. It’s calculated as (Clicks ÷ Impressions) × 100.
            </div>
          )}
        </div>
      </div>

      <div className="detail-total">{totalCTR}</div>

      <div className="filters-row">
        <div className="open-dropdown-wrapper">
          <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
          <ChevronDown className="dropdown-icon" size={20} />
        </div>

        <div className="open-dropdown-wrapper">
          <select><option>All Platforms</option></select>
          <ChevronDown className="dropdown-icon" size={20} />
        </div>

        <div className="open-dropdown-wrapper">
          <select><option>Organic and Paid</option></select>
          <ChevronDown className="dropdown-icon" size={20} />
        </div>

        <div className="open-dropdown-wrapper">
          <select><option>Choose</option></select>
          <ChevronDown className="dropdown-icon" size={20} />
        </div>
      </div>

      <div className="double-metric-boxes">
        {platformSummary.map((item, index) => (
          <div className="metric-box" key={index}>
            <h4>{item.platform}</h4>
            <p>{item.ctr}</p>
          </div>
        ))}
      </div>

      <div className="double-chart-boxes">
        <div className="card-inner-box chart-container">
          <h3 className="centered-title">CTR Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tick={false} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ctr" stroke="#0377FF" strokeWidth={2} dot={{ r: 5, strokeWidth: 1, fill: '#0377FF' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-inner-box chart-container">
          <h3 className="centered-title">CTR by Format</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="format" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ctr">
                {barData.map((entry, index) => (
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

      {isExportOpen && (
        <ExportModalOpenCard
          onClose={() => setIsExportOpen(false)}
          title="Click Through Rate"
          filters={[
            `Time Range: ${selectedRange}`,
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
