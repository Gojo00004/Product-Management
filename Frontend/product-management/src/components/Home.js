import React from 'react';
import "../resources/home.css"; // You can link your CSS here for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to the Product Management System</h1>
      </div>
      <hr />
      <div className="home-content">
        <p>
          Our Product Management System is designed to help you manage and organize your products efficiently. Whether you are adding, updating, or viewing product details, our system simplifies the entire process for you.
        </p>
        <hr />
        <h2>How It Works:</h2>
        <hr />
        <ul>
          <li><strong>Add New Products:</strong> Easily add new products to the system with all the necessary details like name, price, and barcode.</li>
          <li><strong>Update Existing Products:</strong> Modify any details of existing products with ease to keep your inventory accurate.</li>
          <li><strong>View Product List:</strong> Browse through the list of all products, and access their details like price and barcode.</li>
        </ul>
        <hr />
        <h2>Get Started:</h2>
        <hr />
        <p>
          To get started, you can add a new product by navigating to the "Products" section.
        </p>
      </div>
    </div>
  );
}

export default Home;
