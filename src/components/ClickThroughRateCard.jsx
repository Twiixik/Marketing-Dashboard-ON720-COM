import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cardBase.css'; // shared styles

const ctrData = [
  { platform: 'LinkedIn', percentage: 8.6, color: 'var(--chart-blue-b)' },
  { platform: 'AppSource', percentage: 2.8, color: 'var(--chart-green-b)' },
  { platform: 'Google', percentage: 6.5, color: 'var(--chart-yellow-a)' }
];

const ClickThroughRateCard = () => {
   const navigate = useNavigate();
  return (
    <div className="card card-wide" onClick={() => navigate('/click-through-rate')} style={{ cursor: 'pointer' }}>
      <h2 className="card-title">Click-Through Rate (CTR)</h2>
      <div className="ctr-bars">
  {ctrData.map((item) => (
    <div className="ctr-row" key={item.platform}>
      <div className="ctr-bar-wrapper">
        <div
          className="ctr-bar"
          style={{
            width: `${item.percentage * 20}px`,
            backgroundColor: item.color
          }}
        />
      </div>
      <div className="ctr-label">
        {item.platform} ({item.percentage}%)
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default ClickThroughRateCard;
