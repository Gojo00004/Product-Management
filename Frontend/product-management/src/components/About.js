import React from 'react';
import "../resources/about.css"; // You can link your CSS here for styling

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About This Project</h1>
      </div>
      <hr/>
      <div className="about-content">
        <p>
          Welcome to our product search application! This platform allows users to quickly search for products based on their query and get real-time results, displaying relevant product details such as name, price, and barcode. Our user-friendly interface enables seamless interaction, with a dedicated search bar where users can input their query and view the results instantly.
        </p>
        <hr/>
        <h2>Key Features:</h2>
        <hr/>
        <ul>
          <li><strong>Real-time Results:</strong> Fetches product information dynamically from the server.</li>
          <li><strong>Clear Product Details:</strong> Displays key details such as product name, price, and barcode.</li>
        </ul>
        <hr/>
        <h2>Our Mission</h2>
        <hr/>
        <p>
          Our mission is to provide users with an intuitive and effective search experience while maintaining data accuracy and performance. Whether you are looking for specific products or browsing options, our application is designed to meet your needs efficiently.
        </p>
      </div>
    </div>
  );
}

export default About;
