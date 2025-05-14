import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import '../styles/cardBase.css';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  LinkedIn: 'var(--chart-blue-b)',
  AppSource: 'var(--chart-green-b)',
  Google: 'var(--chart-yellow-a)',
};

const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} />;
};

const CostPerClickCard = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/cpc/Last 7 Days/barData.json')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setChartData(data);
        }
      });
  }, []);

  return (
    <div className="card card-wide" onClick={() => navigate('/cost-per-click')} style={{ cursor: 'pointer' }}>
      <h2 className="card-title">Cost Per Click (CPC)</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="platform" />
          <YAxis tick={false} axisLine={false} />
          <Tooltip />
          <Bar
            dataKey="cost"
            shape={(props) => (
              <CustomBar {...props} fill={COLORS[props.payload.platform]} />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostPerClickCard;
