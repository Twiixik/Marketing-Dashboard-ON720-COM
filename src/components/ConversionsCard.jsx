import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import '../styles/cardBase.css';
import '../styles/conversionsCard.css';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'App Installs', value: 120 },
  { name: 'Trial Signups', value: 65 },
  { name: 'Demo Booking', value: 52 },
];

const COLORS = [
  'var(--chart-green-a)',
  'var(--chart-yellow-b)',
  'var(--chart-purple-b)',
];

const ConversionsCard = () => {
  const navigate = useNavigate();
  const total = data.reduce((sum, item) => sum + item.value, 0);
  

  return (
<div className="card conversions-card" onClick={() => navigate('/conversions')} style={{ cursor: 'pointer' }}>
  <h2 className="card-title">Conversions</h2>

  <div className="conversions-body">
    <div className="donut-wrapper">
      <PieChart width={220} height={220}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div className="donut-center">
        <strong>{total}</strong>
        <span>Total<br />Conversions</span>
      </div>
    </div>

    <div className="legend">
      {data.map((entry, index) => (
        <div className="legend-item" key={index}>
          <span
            className="legend-color"
            style={{ backgroundColor: COLORS[index] }}
          />
          <span>{entry.name}</span>
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default ConversionsCard;
