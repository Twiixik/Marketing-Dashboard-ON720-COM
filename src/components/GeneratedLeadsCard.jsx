import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import '../styles/cardBase.css';
import { useNavigate } from 'react-router-dom';

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
        {value} Leads – {name}
      </div>
    );
  }
  return null;
};

const GeneratedLeadsCard = () => {
  const navigate = useNavigate();
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetch('https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/leadsGenerated/Last 7 Days/pieData.json')
      .then((res) => res.json())
      .then((data) => {
        if (data) setPieData(data);
      });
  }, []);

  return (
    <div className="card" onClick={() => navigate('/leads-generated')} style={{ cursor: 'pointer' }}>
      <h2 className="card-title">Generated Leads</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={75}
            innerRadius={0}
            dataKey="value"
            stroke="none"
          >
            {pieData.map((entry, index) => (
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
