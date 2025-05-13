import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExportModalOpenCard from '../components/ExportModalOpenCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer,
  PieChart, Pie
} from 'recharts';
import { ChevronLeft, ChevronDown, Info } from 'react-feather';
import '../styles/cardBase.css';
import '../styles/openCards.css';

const barData = [
  { platform: 'LinkedIn', organic: 150, paid: 100 },
  { platform: 'Google', organic: 110, paid: 60 },
  { platform: 'AppSource', organic: 70, paid: 40 },
];

const pieData = [
  { name: 'Contact', value: 120 },
  { name: 'Book a Demo', value: 100 },
  { name: 'Webinar', value: 90 },
  { name: 'Trial', value: 80 },
];

const tableData = [
  { campaign: 'Spring 2024', type: 'Webinar', leads: 18, conversion: '4.8%' },
  { campaign: 'App Promo Week', type: 'Book a Demo', leads: 14, conversion: '3.7%' },
  { campaign: 'Product Launch', type: 'Contact', leads: 9, conversion: '2.8%' }
];

const COLORS = [
  'var(--chart-yellow-b)',
  'var(--chart-purple-a)',
  'var(--chart-green-b)',
  'var(--chart-blue-a)',
];

const PIECOLORS = [
  'var(--chart-purple-a)',
  'var(--chart-yellow-a)',
  'var(--chart-green-a)',
  'var(--chart-purple-b)',
];

// TOOLTIP with % OUT OF 100
const totalLeads = pieData.reduce((sum, item) => sum + item.value, 0);
const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    const percent = ((value / totalLeads) * 100).toFixed(1);
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

const LeadsGeneratedPage = () => {
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
          <h2 className="open-card-title">Leads Generated</h2>
        </div>
        {/* Info Button with Hover Tooltip */}
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

      <div className="detail-total">356</div>

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
          <h4>Top Channel</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-heading)', fontSize: '28px' }}>
            <strong>Google ADS</strong><span>148 Leads</span>
          </div>
        </div>
        <div className="metric-box">
          <h4>Top Campaign</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-heading)', fontSize: '28px' }}>
            <strong>Spring 2024</strong><span>18 Leads</span>
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
            "Time Range: Last 7 Days",
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