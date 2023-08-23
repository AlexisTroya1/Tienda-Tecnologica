import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Facturacion from './Facturacion';
import Contactos from './Contactos';
import AcercaDe from './AcercaDe';


function App() {
  const [products, setProducts] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: ''
  });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetch('/productos')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const toggleTable = () => {
    setShowTable(!showTable);
    setEditingProductId(null);
  };

  const handleDelete = async (productId) => {
    try {
      await fetch(`/productos/${productId}`, {
        method: 'DELETE'
      });
      const updatedProducts = products.filter(product => product._id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });
      const data = await response.json();
      setProducts([...products, data]);
      setNewProduct({
        name: '',
        price: '',
        description: '',
        stock: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEdit = (productId) => {
    setEditingProductId(productId);
    const editedProduct = products.find(product => product._id === productId);
    setNewProduct(editedProduct);
  };

  const handleUpdateProduct = async () => {
    try {
      await fetch(`/productos/${editingProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });
      const updatedProducts = products.map(product =>
        product._id === editingProductId ? newProduct : product
      );
      setProducts(updatedProducts);
      setNewProduct({
        name: '',
        price: '',
        description: '',
        stock: ''
      });
      setEditingProductId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="App">
      <Router>
      <nav className="horizontal-menu">
  <ul className="menu-list">
    <li><Link to="/">Lista de Productos</Link></li>
    <li><Link to="/facturacion">Facturación</Link></li>
    <li><Link to="/contactos">Contactos</Link></li>
    <li><Link to="/acerca-de">Acerca de</Link></li>
  </ul>
</nav>
        <Routes>
          <Route
            path="/"
            element={
              <ListaProductos
                showTable={showTable}
                toggleTable={toggleTable}
                products={products}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                newProduct={newProduct}
                setNewProduct={setNewProduct}
                handleAddProduct={handleAddProduct}
                editingProductId={editingProductId}
                handleUpdateProduct={handleUpdateProduct}
              />
            }
          />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
        </Routes>
      </Router>
    </div>
  );
}

function ListaProductos({
  showTable,
  toggleTable,
  products,
  handleDelete,
  handleEdit,
  newProduct,
  setNewProduct,
  handleAddProduct,
  editingProductId,
  handleUpdateProduct
}) {
  return (
    <div>
      <h1 className="title">Tienda Tecnológica</h1>
      <button className="toggle-button" onClick={toggleTable}>
        {showTable ? 'Ocultar Productos' : 'Listar Productos'}
      </button>
      {showTable && (
        <div>
          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(product._id)}>
                      Editar
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(product._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-form">
            <h2>{editingProductId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Precio"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            {editingProductId ? (
              <button className="update-button" onClick={handleUpdateProduct}>
                Actualizar Producto
              </button>
            ) : (
              <button className="add-button" onClick={handleAddProduct}>
                Agregar Producto
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;