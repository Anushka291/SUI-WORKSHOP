import React from 'react';

const Header = ({ onToggleTheme }) => {
  return (
    <header className="dashboard-header">
      <h1>📋 Mint Dashboard</h1>
      <button onClick={onToggleTheme}>Toggle Theme</button>
    </header>
  );
};

export default Header;
