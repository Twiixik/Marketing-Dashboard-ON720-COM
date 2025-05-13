import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import '../styles/cardBase.css';
import { useNavigate } from 'react-router-dom';


const data = [
  { day: 'Mon', visits: 20 },
  { day: 'Tue', visits: 12 },
  { day: 'Wed', visits: 58 },
  { day: 'Thu', visits: 38 },
  { day: 'Fri', visits: 90 },
  { day: 'Sat', visits: 60 },
  { day: 'Sun', visits: 18 },
];

const WebsiteTrafficCard = () => {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate('/website-traffic')} style={{ cursor: 'pointer' }}>
      <h2 className="card-title">Web Traffic</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="day"     
            tick={false}         
            axisLine={true}      
            tickLine={false}     
          />
          <YAxis
            tick={{ fontSize: 12 }}
            width={30}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#0377FF"
            strokeWidth={2}
            dot={{ r: 5, strokeWidth: 1, fill: '#0377FF' }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="chart-subtitle">Last 7 Days</p>
    </div>
  );
};

export default WebsiteTrafficCard;
