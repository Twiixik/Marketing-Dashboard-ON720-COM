import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExportModalOpenCard from '../components/ExportModalOpenCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer,
  PieChart, Pie
} from 'recharts';
import { ChevronLeft, ChevronDown, Info } from 'react-feather';
import '../styles/cardBase.css';
import '../styles/openCards.css';

const PIECOLORS = [
  'var(--chart-purple-a)',
  'var(--chart-yellow-a)',
  'var(--chart-green-a)',
  'var(--chart-purple-b)',
];

const LeadsGeneratedPage = () => {
  const navigate = useNavigate();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');

  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [summary, setSummary] = useState({
    topChannel: { name: '', leads: 0 },
    topCampaign: { name: '', leads: 0 },
    totalLeads: 0
  });

  useEffect(() => {
    fetch(`https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/leadsGenerated/${selectedRange}.json`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setBarData(data.barData || []);
          setPieData(data.pieData || []);
          setTableData(data.tableData || []);
          setSummary({
            topChannel: data.topChannel || { name: '', leads: 0 },
            topCampaign: data.topCampaign || { name: '', leads: 0 },
            totalLeads: data.totalLeads || 0
          });
        }
      });
  }, [selectedRange]);

  const totalLeadsFromPie = pieData.reduce((sum, item) => sum + item.value, 0);

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const percent = ((value / totalLeadsFromPie) * 100).toFixed(1);
      return (
        <div style={{
          background: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: '1px solid var(--black-10)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px'
        }}>
          <strong>{name}</strong><br />
          {value} leads ({percent}%)
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-container">
      {/* Header */}
      <div className="card-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={40} />
          </button>
          <h2 className="open-card-title">Leads Generated</h2>
        </div>
        <div className="info-wrapper"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <button className="info-btn"><Info size={40} /></button>
          {showInfo && (
            <div className="info-tooltip">
              Leads are users who filled out a form (e.g., Book Demo, Webinar Signup). 
              These are counted when form submissions are completed successfully.
            </div>
          )}
        </div>
      </div>

      <div className="detail-total">{summary.totalLeads.toLocaleString()}</div>

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
          <h4>Top Channel</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '28px' }}>
            <strong>{summary.topChannel.name}</strong><span>{summary.topChannel.leads} Leads</span>
          </div>
        </div>
        <div className="metric-box">
          <h4>Top Campaign</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '28px' }}>
            <strong>{summary.topCampaign.name}</strong><span>{summary.topCampaign.leads} Leads</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="double-chart-boxes">
        <div className="card-inner-box chart-container">
          <h3 className="centered-title">Leads by Channel</h3>
          <ResponsiveContainer width="100%" height={200}>
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
                    } />
                ))}
              </Bar>
              <Bar dataKey="paid">
                {barData.map((entry, index) => (
                  <Cell key={`paid-${index}`}
                    fill={
                      entry.platform === 'LinkedIn' ? 'var(--chart-blue-a)' :
                      entry.platform === 'Google' ? 'var(--chart-yellow-b)' :
                      'var(--chart-green-a)'
                    } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-inner-box chart-container">
          <h3 className="centered-title">Leads by Form</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIECOLORS[index % PIECOLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
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
              <th>Form Type</th>
              <th>Leads</th>
              <th>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.campaign}</td>
                <td>{row.type}</td>
                <td>{row.leads}</td>
                <td>{row.conversion}</td>
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
          title="Leads Generated"
          filters={[
            `Time Range: ${selectedRange}`,
            "Platforms: Google, LinkedIn, AppSource",
            "Channel: Organic, Paid"
          ]}
          included={[
            "Top Channel",
            "Top Campaign",
            "Leads by Channel",
            "Leads by Form",
            "Breakdown by Campaign"
          ]}
        />
      )}
    </div>
  );
};

export default LeadsGeneratedPage;
