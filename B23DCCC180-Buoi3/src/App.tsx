// src/App.tsx
import React from 'react';
import Sidebar from './components/Sidebar';
import ProductTable from './components/ProductTable';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <ProductTable />
    </div>
  );
};

export default App;