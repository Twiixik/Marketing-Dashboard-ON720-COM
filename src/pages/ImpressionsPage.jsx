import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer
} from 'recharts';
import { Info, ChevronLeft, ChevronDown } from 'react-feather';
import ExportModalOpenCard from '../components/ExportModalOpenCard';
import '../styles/cardBase.css';
import '../styles/openCards.css';

const ImpressionsDetail = () => {
  const navigate = useNavigate();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [selectedRange, setSelectedRange] = useState("Last 7 Days");

  const [barData, setBarData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [totalImpressions, setTotalImpressions] = useState(0);

  useEffect(() => {
    fetch(`https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/impressions/${selectedRange}.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setBarData(data.platformData || []);
          setTableData(data.campaignData || []);
          const total = (data.platformData || []).reduce((sum, p) => sum + p.organic + p.paid, 0);
          setTotalImpressions(total);
        }
      });
  }, [selectedRange]); // 👈 re-run when selectedRange changes

  return (
    <div className="card-container">
      {/* Header */}
      <div className="card-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={40} />
          </button>
          <h2 className="open-card-title">Impressions</h2>
        </div>
        <div className="info-wrapper"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <button className="info-btn"><Info size={40} /></button>
          {showInfo && (
            <div className="info-tooltip">
              Impressions count how many times your content or ads were shown to users across platforms.
              This includes both paid and organic views.
            </div>
          )}
        </div>
      </div>

      <div className="detail-total">{totalImpressions.toLocaleString()}</div>

      {/* Filters */}
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

      {/* Chart */}
      <div className="card-inner-box chart-container">
        <h3>Impression by platform</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="organic">
                {barData.map((entry, index) => (
                  <Cell key={`organic-${index}`}
                    fill={
                      entry.platform === 'LinkedIn' ? 'var(--chart-blue-b)' :
                      entry.platform === 'Google' ? 'var(--chart-yellow-a)' :
                      'var(--chart-green-b)'
                    }
                  />
                ))}
              </Bar>
              <Bar dataKey="paid">
                {barData.map((entry, index) => (
                  <Cell key={`paid-${index}`}
                    fill={
                      entry.platform === 'LinkedIn' ? 'var(--chart-blue-a)' :
                      entry.platform === 'Google' ? 'var(--chart-yellow-b)' :
                      'var(--chart-green-a)'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="card-inner-box table-container">
        <h3>Breakdown by Campaign</h3>
        <table>
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Platform</th>
              <th>Impressions</th>
              <th>Date Range</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.campaign}</td>
                <td>{row.platform}</td>
                <td>{row.impressions}</td>
                <td>{row.timerange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="button-row">
        <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
        <button className="export-btn" onClick={() => setIsExportOpen(true)}>Export</button>
      </div>

      {/* Export Modal */}
      {isExportOpen && (
        <ExportModalOpenCard
          onClose={() => setIsExportOpen(false)}
          title="Impressions"
          filters={[
            `Time Range: ${selectedRange}`,
            "Platforms: Google, LinkedIn, AppSource",
            "Campaigns: All",
            "Channel: Organic, Paid"
          ]}
          included={[
            "Total Impressions",
            "Breakdown by Platform",
            "Campaign Table"
          ]}
        />
      )}
    </div>
  );
};

export default ImpressionsDetail;
