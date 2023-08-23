import React, { useState, useEffect } from 'react';
import './Facturacion.css'; 

function Facturacion() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedProductPrice, setSelectedProductPrice] = useState('');
  const [selectedProductStock, setSelectedProductStock] = useState(0);
  const [error, setError] = useState('');
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    fetch('/productos')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const product = products.find(product => product.name === selectedProduct);
    if (product) {
      setSelectedProductPrice(product.price);
      setSelectedProductStock(product.stock);
    } else {
      setSelectedProductPrice('');
      setSelectedProductStock(0);
    }
  }, [selectedProduct, products]);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleGenerateInvoice = () => {
    const selectedProductObj = products.find(product => product.name === selectedProduct);

    if (selectedProductObj) {
      if (quantity > selectedProductStock) {
        setError('La cantidad a facturar es mayor al stock disponible');
        setInvoiceDetails(null);
      } else {
        setError('');
        const totalPrice = selectedProductObj.price * quantity;
        const tax = totalPrice * 0.12;
        const totalWithTax = totalPrice + tax;
        const invoice = {
          product: selectedProductObj.name,
          description: selectedProductObj.description,
          price: selectedProductObj.price,
          quantity: quantity,
          subtotal: totalPrice,
          tax: tax.toFixed(2),
          total: totalWithTax.toFixed(2)
        };
        setInvoiceDetails(invoice);
      }
    }
  };

  return (
    <div className="facturacion-container">
      <h1 className="title">Facturación</h1>
      <form className="facturacion-form">
        <label htmlFor="productSelect">Seleccione un producto:</label>
        <select id="productSelect" value={selectedProduct} onChange={handleProductChange}>
          <option value="">Seleccione...</option>
          {products.map(product => (
            <option key={product._id} value={product.name}>{product.name}</option>
          ))}
        </select>
        <p>Precio: {selectedProductPrice !== '' ? `$${selectedProductPrice}` : ''}</p>
        <p>Stock disponible: {selectedProductStock}</p>
        <label htmlFor="quantityInput">Cantidad:</label>
        <input type="number" id="quantityInput" value={quantity} onChange={handleQuantityChange} />
        {error && <p className="error-message">{error}</p>}
        <button className="generate-button" type="button" onClick={handleGenerateInvoice}>
          Generar Factura
        </button>
        {invoiceDetails && (
          <div className="invoice-details">
            <h1 className="title">Detalles de factura</h1>
            <table className="invoice-table">
              <tbody>
                <tr>
                  <td>Producto:</td>
                  <td>{invoiceDetails.product}</td>
                </tr>
                <tr>
                  <td>Descripción:</td>
                  <td>{invoiceDetails.description}</td>
                </tr>
                <tr>
                  <td>Precio:</td>
                  <td>${invoiceDetails.price}</td>
                </tr>
                <tr>
                  <td>Cantidad:</td>
                  <td>{invoiceDetails.quantity}</td>
                </tr>
                <tr>
                  <td>Subtotal:</td>
                  <td>${invoiceDetails.subtotal}</td>
                </tr>
                <tr>
                  <td>Impuesto (12%):</td>
                  <td>${invoiceDetails.tax}</td>
                </tr>
                <tr>
                  <td>Total Factura:</td>
                  <td>${invoiceDetails.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </form>
    </div>
  );
}

export default Facturacion;
