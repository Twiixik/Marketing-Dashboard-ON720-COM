import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import '../styles/cardBase.css';
import { useNavigate } from 'react-router-dom';


const data = [
  { name: 'Contact', value: 35 },
  { name: 'Book a Demo', value: 25 },
  { name: 'Webinar', value: 22 },
  { name: 'Trial', value: 18 },
];

const COLORS = [
  'var(--chart-purple-a)',
  'var(--chart-green-b)',
  'var(--chart-blue-a)',
  'var(--chart-yellow-b)',
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="custom-tooltip">
        <span style={{ display: 'inline-block', marginRight: '6px', fontSize: '14px' }}>
          ●
        </span>
        {value}% {name}
      </div>
    );
  }
  return null;
};

const GeneratedLeadsCard = () => {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate('/leads-generated')} style={{ cursor: 'pointer' }}>
      <h2 className="card-title">Generated Leads</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={75}
            innerRadius={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <p className="chart-subtitle">Last 7 Days</p>
    </div>
  );
};

export default GeneratedLeadsCard;
