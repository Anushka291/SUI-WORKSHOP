import React from 'react';

const HistoryList = ({ history }) => {
  return (
    <div className="history-list">
      <h2 className="section-title">Minted NFTs (Session)</h2>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>
            <strong>{item.customerId}</strong>
            <br />
            <img src={item.imageUrl} alt="Minted" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
