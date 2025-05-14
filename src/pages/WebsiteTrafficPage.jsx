import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExportModalOpenCard from '../components/ExportModalOpenCard';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { ChevronLeft, ChevronDown, Info } from 'react-feather';
import '../styles/cardBase.css';
import '../styles/openCards.css';

const COLORS = [
  'var(--chart-purple-a)',
  'var(--chart-purple-b)',
  'var(--chart-blue-b)',
  'var(--chart-green-a)',
  'var(--chart-yellow-a)'
];

const WebsiteTrafficDetail = () => {
  const navigate = useNavigate();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');

  const [visitsData, setVisitsData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [summary, setSummary] = useState({ visitors: 0, duration: '' });

  useEffect(() => {
    fetch(`https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/websiteTraffic/${selectedRange}.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setVisitsData(data.visitsData || []);
          setSourceData(data.sourceData || []);
          setTableData(data.pageTable || []); // <- key corrected
          setSummary({
            visitors: data.uniqueVisitors || 0, // <- key corrected
            duration: data.avgSession || ''     // <- key corrected
          });
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
          <h2 className="open-card-title">Website Traffic</h2>
        </div>
        <div className="info-wrapper"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <button className="info-btn"><Info size={40} /></button>
          {showInfo && (
            <div className="info-tooltip">
              Sessions represent individual visits to your website.
              One person visiting twice counts as two sessions. Includes all traffic sources.
            </div>
          )}
        </div>
      </div>

      <div className="detail-total">{summary.visitors.toLocaleString()}</div>

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

      {/* Top Stats */}
      <div className="double-metric-boxes">
        <div className="metric-box">
          <h4>Unique Visitors</h4>
          <p>{summary.visitors.toLocaleString()}</p>
        </div>
        <div className="metric-box">
          <h4>Average Session Duration</h4>
          <p>{summary.duration}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="double-chart-boxes">
        <div className="card-inner-box chart-container">
          <h3 className="centered-title">Quality Visits</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={visitsData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tick={false} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#0377FF"
                strokeWidth={2}
                dot={{ r: 5, strokeWidth: 1, fill: '#0377FF' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-inner-box chart-container">
          <h3 className="centered-title">Source Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={sourceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  const percent = props.payload.percent || 0;
                  return [`${percent}% (${value})`, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="double-table-boxes">
        <table>
          <thead>
            <tr>
              <th>Pages</th>
              <th>Views</th>
              <th>Avg. Time</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.page}</td>
                <td>{row.views}</td>
                <td>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Top Pages</th>
              <th>Views</th>
              <th>Avg. Time</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.page}</td>
                <td>{row.views}</td>
                <td>{row.time}</td>
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
          title="Website Traffic"
          filters={[
            `Time Range: ${selectedRange}`,
            "Platforms: Google, LinkedIn, AppSource",
            "Channel: Organic, Paid"
          ]}
          included={[
            "Total Visitors",
            "Quality Visits",
            "Source Breakdown",
            "Page Tables"
          ]}
        />
      )}
    </div>
  );
};

export default WebsiteTrafficDetail;
