import React from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import '../styles/cardBase.css';
import { useNavigate } from 'react-router-dom';


const data = [
  {
    name: 'LinkedIn',
    organic: 9200,
    paid: 1234,
  },
  {
    name: 'AppSource',
    organic: 5000,
    paid: 1258,
  },
  {
    name: 'Google',
    organic: 8000,
    paid: 1234,
  }
];

// Color map using your CSS variables
const colorMap = {
  LinkedIn: 'var(--chart-blue-b)',
  AppSource: 'var(--chart-green-b)',
  Google: 'var(--chart-yellow-a)',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { organic, paid } = payload[0].payload;
    const total = organic + paid;
    return (
      <div className="custom-tooltip">
        <strong>{label}</strong><br />
        • Organic: {organic.toLocaleString()}<br />
        • Paid: {paid.toLocaleString()}<br />
        <strong>Total: {total.toLocaleString()}</strong>
      </div>
    );
  }
  return null;
};

const ImpressionsCard = () => {
   const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate('/impressions')} style={{ cursor: 'pointer' }}>
      <div className="card-title">Impressions</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barCategoryGap="25%">
          <XAxis dataKey="name" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey={({ organic, paid }) => organic + paid}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorMap[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ImpressionsCard;
