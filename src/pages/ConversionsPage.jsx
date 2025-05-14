import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExportModalOpenCard from '../components/ExportModalOpenCard';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { ChevronLeft, ChevronDown, Info } from 'react-feather';
import '../styles/cardBase.css';
import '../styles/openCards.css';

const COLORS = ['var(--chart-purple-a)', 'var(--chart-purple-b)', 'var(--chart-blue-b)'];

const ConversionsPage = () => {
  const navigate = useNavigate();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');

  const [trendData, setTrendData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [summary, setSummary] = useState({ demoBookings: 0, webinarSignups: 0, total: 0 });

  useEffect(() => {
    fetch(`https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/conversions/${selectedRange}.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTrendData(data.trendData || []);
          setBarData(data.barData || []);
          setTableData(data.tableData || []);
          setSummary(data.summary || { demoBookings: 0, webinarSignups: 0, total: 0 });
        }
      });
  }, [selectedRange]);

  return (
    <div className="card-container">
      <div className="card-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}><ChevronLeft size={40} /></button>
          <h2 className="open-card-title">Conversions</h2>
        </div>
        <div className="info-wrapper"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <button className="info-btn"><Info size={40} /></button>
          {showInfo && (
            <div className="info-tooltip">
              A conversion is a completed user action that has value such as an App install, demo booking, or trial signup
            </div>
          )}
        </div>
      </div>

      <div className="detail-total">{summary.total.toLocaleString()}</div>

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

      <div className="double-metric-boxes">
        <div className="metric-box">
          <h4>Demo Bookings</h4>
          <p>{summary.demoBookings}</p>
        </div>
        <div className="metric-box">
          <h4>Webinar Signups</h4>
          <p>{summary.webinarSignups}</p>
        </div>
        <div className="metric-box">
          <h4>Total Conversions</h4>
          <p>{summary.total}</p>
        </div>
      </div>

      <div className="double-chart-boxes">
        <div className="card-inner-box chart-container">
          <h3 className="centered-title">Trend Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tick={false} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#0377FF" strokeWidth={2} dot={{ r: 5, strokeWidth: 1, fill: '#0377FF' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-inner-box chart-container">
          <h3 className="centered-title">Conversion By Platform</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {barData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
              <th>Type</th>
              <th>Conversions</th>
              <th>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.campaign}</td>
                <td>{row.platform}</td>
                <td>{row.type}</td>
                <td>{row.conversions}</td>
                <td>{row.rate}</td>
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
          title="Conversions"
          filters={[
            `Time Range: ${selectedRange}`,
            "Platforms: Google, LinkedIn, AppSource",
            "Channel: Organic, Paid"
          ]}
          included={[
            "Conversions",
            "Conversion Rate",
            "Trend Over Time",
            "Conversion by Platform",
            "Breakdown by Campaign"
          ]}
        />
      )}
    </div>
  );
};

export default ConversionsPage;
