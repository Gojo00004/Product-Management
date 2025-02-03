import React, { useState } from 'react';
import "../resources/navbar.css";

export default function Navbar(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [isSearchPressed, setIsSearchPressed] = useState(false);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearchPressed(true);

    if (!searchQuery.trim()) {
      setMessage('Please enter a search term.');
      setProducts([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/searchproducts?query=${searchQuery}`);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Fetched Data:', data);

      if (data.success) {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
          setMessage(data.products.length ? '' : 'No products found.');
        } else {
          console.error("Unexpected API Response:", data);
          setMessage('Unexpected response format.');
          setProducts([]);
        }
      } else {
        setMessage('Error searching products.');
        setProducts([]);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setProducts([]);
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      {/* 🟢 Navbar */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          {/* Navbar Toggler for Mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link fs-5" href="/">{props.title}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="/products">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="/about">About</a>
              </li>
            </ul>

            {/* 🟢 Search Form */}
            <form className="d-flex align-items-center search-form" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary1 fs-5" type="submit">Search</button>
            </form>

          </div>
        </div>
      </nav>

      {/* 🟢 Display Message After Search */}
      {isSearchPressed && message && (
        <div className="mt-3 alert alert-info">
          {message}
        </div>
      )}

      {/* 🟢 Display Products Table if Products Exist */}
      {isSearchPressed && products.length > 0 && (
        <div className="container mt-4">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Barcode</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.ProductName || product.productName}</td>
                  <td>{product.ProductPrice || product.productPrice}</td>
                  <td>{product.ProductBarcode || product.productBarcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
