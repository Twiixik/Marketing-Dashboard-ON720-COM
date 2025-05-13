import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExportModalOpenCard from '../components/ExportModalOpenCard';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { ChevronLeft, ChevronDown, Info } from 'react-feather';
import '../styles/cardBase.css';
import '../styles/openCards.css';

const visitsData = [
  { day: 'Mon', visits: 12 },
  { day: 'Tue', visits: 30 },
  { day: 'Wed', visits: 30 },
  { day: 'Thu', visits: 38 },
  { day: 'Fri', visits: 25 },
  { day: 'Sat', visits: 44 },
  { day: 'Sun', visits: 20 },
];

const rawSourceData = [
  { name: 'Organic', value: 300 },
  { name: 'Paid', value: 210 },
  { name: 'Referral', value: 150 },
  { name: 'Direct', value: 100 },
  { name: 'Social', value: 290 },
];

const totalValue = rawSourceData.reduce((sum, entry) => sum + entry.value, 0);

const sourceData = rawSourceData.map(entry => ({
  ...entry,
  percent: Math.round((entry.value / totalValue) * 100),
}));

const COLORS = ['var(--chart-purple-a)', 'var(--chart-purple-b)', 'var(--chart-blue-b)', 'var(--chart-green-a)', 'var(--chart-yellow-a)'];

const tableData = [
  { page: '/Pricing', views: 458, time: '4:58' },
  { page: '/Apps', views: 588, time: '4:58' },
  { page: '/Expense720', views: 1085, time: '4:58' },
];

const WebsiteTrafficDetail = () => {
  const navigate = useNavigate();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="card-container">
      {/* Header */}
      <div className="card-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={40} />
          </button>
          <h2 className="open-card-title">WebSite Traffic</h2>
        </div>
       {/* Info Button with Hover Tooltip */}
               <div className="info-wrapper"
                 onMouseEnter={() => setShowInfo(true)}
                 onMouseLeave={() => setShowInfo(false)}
               >
                 <button className="info-btn"><Info size={40} /></button>
                 {showInfo && (
                   <div className="info-tooltip">
                    Sessions represent individual visits to your website.
                    One person visiting twice counts as two sessions. 
                    Includes all traffic sources.
                   </div>
                 )}
                 </div>
             </div>

      <div className="detail-total">8,234</div>

      {/* Filters */}
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

      {/* Top Stats */}
      <div className="double-metric-boxes">
        <div className="metric-box">
          <h4>Unique Visitors</h4>
          <p>1,944</p>
        </div>
        <div className="metric-box">
          <h4>Average Session Duration</h4>
          <p>3min 44 sec</p>
        </div>
      </div>

      {/* Chart section */}
      <div className="double-chart-boxes">
        <div className="card-inner-box chart-container">
          <h3 className="centered-title">Quality Visits</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={visitsData}>
              <CartesianGrid vertical={false} />
              <XAxis tick={false} />
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
          <h3 className="centered-title">Source Break Down</h3>
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
            "Time Range: Last 7 Days",
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
