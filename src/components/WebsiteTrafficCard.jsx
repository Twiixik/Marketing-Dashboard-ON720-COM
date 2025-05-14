import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import '../styles/cardBase.css';
import { useNavigate } from 'react-router-dom';

const WebsiteTrafficCard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/websiteTraffic/Last 7 Days/visitsData.json')
      .then((res) => res.json())
      .then((fetched) => {
        if (Array.isArray(fetched)) {
          setData(fetched);
        }
      });
  }, []);

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
