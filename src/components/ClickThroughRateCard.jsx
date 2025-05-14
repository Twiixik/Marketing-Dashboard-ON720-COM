import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cardBase.css';

const ClickThroughRateCard = () => {
  const navigate = useNavigate();
  const [ctrData, setCtrData] = useState([]);

  useEffect(() => {
    fetch('https://marketing-dashboard-on720com-default-rtdb.europe-west1.firebasedatabase.app/ctr/Last 7 Days/platformSummary.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const colorMap = {
            'LinkedIn': 'var(--chart-blue-b)',
            'Google Ads': 'var(--chart-yellow-a)',
            'AppSource': 'var(--chart-green-b)',
          };

          const formatted = data.map((item) => {
            const numericValue = parseFloat(item.ctr.replace('%', '').replace(',', '.'));
            return {
              ...item,
              percentage: numericValue,
              color: colorMap[item.platform] || 'var(--chart-purple-a)',
            };
          });
          setCtrData(formatted);
        }
      });
  }, []);

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
