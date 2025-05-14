import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExportModalOpenCard from '../components/ExportModalOpenCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer
} from 'recharts';
import { ChevronLeft, ChevronDown, Info } from 'react-feather';
import '../styles/cardBase.css';
import '../styles/openCards.css';

const COLORS = ['var(--chart-blue-b)', 'var(--chart-yellow-a)', 'var(--chart-green-b)'];

const CostPerClickPage = () => {
  const navigate = useNavigate();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');

  const [barData, setBarData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [totalCPC, setTotalCPC] = useState('');
  const [totalSpend, setTotalSpend] = useState('');

  useEffect(() => {
    fetch(`https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/cpc/${selectedRange}.json`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setBarData(data.barData || []);
          setTableData(data.tableData || []);
          setTotalCPC(data.totalCPC || '');
          setTotalSpend(data.totalSpend || '');
        }
      });
  }, [selectedRange]);

  return (
    <div className="card-container">
      {/* Header */}
      <div className="card-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={40} />
          </button>
          <h2 className="open-card-title">Cost Per Click</h2>
        </div>
        <div
          className="info-wrapper"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <button className="info-btn"><Info size={40} /></button>
          {showInfo && (
            <div className="info-tooltip">
              CPC shows the average cost paid per ad click. 
              It’s calculated by dividing total ad spend by the number of clicks received.
            </div>
          )}
        </div>
      </div>

      {/* Total Value */}
      <div className="detail-total">Kr<span>{totalCPC}</span></div>

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

      {/* Chart Section */}
      <div className="card-inner-box chart-container">
        <div className="card-header">
          <h3>Average CPC by Platform</h3>
          <div>
            <strong>Total Spend: {totalSpend}</strong><br />
            <small>{selectedRange}</small>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData} barCategoryGap={50}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="platform" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" barSize={80}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="card-inner-box table-container">
        <div className="card-header">
          <h3>Breakdown by Campaign</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Platform</th>
              <th>Avg. CPC</th>
              <th>Total Spend</th>
              <th>Total Click</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.campaign}</td>
                <td>{row.platform}</td>
                <td>{row.cpc}</td>
                <td>{row.spend}</td>
                <td>{row.click}</td>
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
          title="Cost Per Click"
          filters={[
            `Time Range: ${selectedRange}`,
            "Platforms: Google, LinkedIn, AppSource",
            "Channel: Organic, Paid"
          ]}
          included={[
            "Average CPC by Platform",
            "Total Spend",
            "Breakdown by Campaign",
          ]}
        />
      )}
    </div>
  );
};

export default CostPerClickPage;
