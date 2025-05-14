import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import '../styles/cardBase.css';
import { useNavigate } from 'react-router-dom';

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
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/impressions/Last 7 Days/platformData.json')
      .then((res) => res.json())
      .then((fetchedData) => {
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        }
      });
  }, []);

  return (
    <div className="card" onClick={() => navigate('/impressions')} style={{ cursor: 'pointer' }}>
      <div className="card-title">Impressions</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barCategoryGap="25%">
          <XAxis dataKey="platform" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey={(d) => d.organic + d.paid}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorMap[entry.platform]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ImpressionsCard;
