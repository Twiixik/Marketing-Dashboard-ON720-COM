import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import '../styles/cardBase.css';
import { useNavigate } from 'react-router-dom';

const data = [
  { platform: 'LinkedIn', cpc: 3.2 },
  { platform: 'AppSource', cpc: 2.4 },
  { platform: 'Google', cpc: 3.1 },
];

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
  return (
    <div className="card card-wide" onClick={() => navigate('/cost-per-click')} style={{ cursor: 'pointer' }}>
      <h2 className="card-title">Cost Per Click (CPC)</h2>
      <ResponsiveContainer width="100%" height={200}>   
        <BarChart data={data}>
          <XAxis dataKey="platform" />
          <YAxis tick={false} axisLine={false} />
          <Tooltip />
          <Bar
            dataKey="cpc"
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
