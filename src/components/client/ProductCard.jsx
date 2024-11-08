import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Dummy product data to simulate fetching from an API
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones",
    price: "$100",
    images: ["/headphones.jpg", "/headphones2.jpg", "/headphones3.jpg", "/headphones4.jpg"],
    features: [
      "Noise cancellation",
      "Up to 20 hours of battery life",
      "Comfortable design",
      "Bluetooth 5.0"
    ]
  },
  {
    id: 2,
    name: "Smartwatch Pro",
    description: "Advanced smartwatch with health features",
    price: "$250",
    images: ["/smartwatch.jpg", "/smartwatch2.jpg", "/smartwatch3.jpg", "/smartwatch4.jpg"],
    features: [
      "Heart rate monitor",
      "GPS tracking",
      "Water-resistant",
      "Sleep tracking"
    ]
  },
];

const ProductCard = () => {
  // Use useParams to get the product id from the URL
  const { id } = useParams();

  // Find the product based on the id
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>; // Display a message if product is not found
  }

  // State to manage the main image displayed
  const [mainImage, setMainImage] = useState(product.images[0]);

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    console.log(`Added ${product.name} to cart`);
    // Add logic to update the cart state or send a request to an API
  };

  // Function to handle the buy now action
  const handleBuyNow = () => {
    console.log(`Proceed to buy ${product.name}`);
    // Add logic for navigation or checkout process
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md my-10">
      <div className="flex flex-col md:flex-row items-start">
        {/* Image section */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/2">
          {/* Main Image */}
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-auto object-cover rounded-md mb-4"
          />
          {/* Thumbnail Images */}
          <div className="flex space-x-2">
            {product.images.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-1/4 h-auto object-cover cursor-pointer rounded-md"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product details section */}
        <div className="md:ml-6 flex flex-col md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">Price: {product.price}</p>

          {/* List of Features */}
          <h2 className="text-xl font-semibold mb-4">Features:</h2>
          <ul className="list-disc pl-5 mb-6">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>

          <div className="space-x-4">
            <button 
              onClick={handleAddToCart} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow} 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
