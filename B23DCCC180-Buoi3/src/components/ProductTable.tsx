import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addProduct, updateProduct, deleteProduct, setSearchTerm } from '../redux/productSlice';

const ProductTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.products);
  const searchTerm = useSelector((state: RootState) => state.product.searchTerm);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('Văn phòng phẩm');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const openModal = (index: number | null = null) => {
    if (index !== null) {
      const product = products[index];
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setEditIndex(index);
    } else {
      setName('');
      setPrice(0);
      setCategory('Văn phòng phẩm');
      setEditIndex(null);
    }
    setModalIsOpen(true);
  };

  const saveProduct = () => {
    if (editIndex !== null) {
      dispatch(updateProduct({ index: editIndex, product: { name, price, category } }));
    } else {
      dispatch(addProduct({ name, price, category }));
    }
    setModalIsOpen(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <h2>Bảng Thông Tin</h2>
      <button onClick={() => openModal()} style={{ background: '#007bff', color: '#fff', padding: '10px', border: 'none', marginBottom: '10px' }}>
        Thêm Hàng Hóa
      </button>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        style={{ width: '200px', padding: '10px', marginBottom: '10px' }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tên</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Giá</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', width: '120px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts.map((product, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => openModal(index)} style={{ background: '#007bff', color: '#fff', border: 'none', padding: '3px 8px', fontSize: '12px' }}>Chỉnh sửa</button>
                <button onClick={() => dispatch(deleteProduct(index))} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '3px 8px', fontSize: '12px' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} style={{ marginRight: '5px', background: '#ccc', border: 'none', padding: '5px 10px' }}>Trước</button>
        Trang {currentPage}/{totalPages}
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} style={{ marginLeft: '5px', background: '#ccc', border: 'none', padding: '5px 10px' }}>Sau</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal-content" 
      >
        <h2>{editIndex !== null ? 'Chỉnh Sửa Hàng Hóa' : 'Thêm Hàng Hóa'}</h2>
        <input type="text" placeholder="Tên hàng hóa" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} required />
        <input type="number" placeholder="Giá hàng hóa" value={price} onChange={(e) => setPrice(Number(e.target.value))} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
          <option value="Văn phòng phẩm">Văn phòng phẩm</option>
          <option value="Đồ gia dụng">Đồ gia dụng</option>
          <option value="Thực phẩm">Thực phẩm</option>
        </select>
        <button onClick={saveProduct} style={{ background: '#28a745', color: '#fff', padding: '10px', border: 'none', width: '100%', marginBottom: '10px' }}>
          {editIndex !== null ? 'Lưu thay đổi' : 'Thêm hàng hóa'}
        </button>
        <button onClick={() => setModalIsOpen(false)} style={{ background: '#6c757d', color: '#fff', padding: '10px', border: 'none', width: '100%' }}>Đóng</button>
      </Modal>
    </div>
  );
};

export default ProductTable;