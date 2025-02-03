import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

    if (!searchQuery) {
      setMessage('Please enter a search term.');
      setProducts([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/searchproducts?query=${searchQuery}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data1 = await res.json();
      console.log('Fetched Data:', data1);

      if (data1.success) {
        if (Array.isArray(data1.products)) {
          setProducts(data1.products);
        } else {
          console.error("Unexpected API Response:", data1);
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
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-4" to="/">
                  <img src={props.logo} alt="Logo" style={{ width: '90px', height: '100px', marginRight: '0px', marginLeft: '0px' }} />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active fs-4" to="/">{props.title}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active fs-4" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active fs-4" to="/about">About</Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn button-css1 fs-5" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      {isSearchPressed && message && <div className="mt-3 alert alert-info">{message}</div>}

      {isSearchPressed && (
        <div className="container mt-5">
          {products.length > 0 ? (
            <table className="table">
              <thead>
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
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
