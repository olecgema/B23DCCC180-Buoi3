// src/components/AddProductForm.tsx
import React, { useState } from 'react';

const AddProductForm: React.FC<{ onAdd: (name: string, price: number) => void }> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(name, price);
    setName('');
    setPrice(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tên hàng hóa"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Giá"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <button type="submit">Thêm</button>
    </form>
  );
};

export default AddProductForm;