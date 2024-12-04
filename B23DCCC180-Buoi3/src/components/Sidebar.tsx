// src/components/Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div style={{ width: '200px', background: '#333', color: '#fff', padding: '10px', height: '100vh' }}>
      <button style={{ background: '#007bff', color: '#fff', padding: '10px', border: 'none', width: '100%' }}>
        Quản lý hàng hóa
      </button>
    </div>
  );
};

export default Sidebar;