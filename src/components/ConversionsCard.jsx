import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import '../styles/cardBase.css';
import '../styles/conversionsCard.css';
import { useNavigate } from 'react-router-dom';

const COLORS = [
  'var(--chart-green-a)',
  'var(--chart-yellow-b)',
  'var(--chart-purple-b)',
];

const ConversionsCard = () => {
  const navigate = useNavigate();
  const [donutData, setDonutData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/conversions/Last 7 Days.json')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDonutData(data.donutData || []);
          setTotal(data.summary?.total || 0);
        }
      });
  }, []);

  return (
    <div className="card conversions-card" onClick={() => navigate('/conversions')} style={{ cursor: 'pointer' }}>
      <h2 className="card-title">Conversions</h2>

      <div className="conversions-body">
        <div className="donut-wrapper">
          <PieChart width={220} height={220}>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <div className="donut-center">
            <strong>{total}</strong>
            <span>Total<br />Conversions</span>
          </div>
        </div>

        <div className="legend">
          {donutData.map((entry, index) => (
            <div className="legend-item" key={index}>
              <span
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
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
