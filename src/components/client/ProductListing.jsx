import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
    const [searchWord,setSearchWord]=useState("") //state to manage search bar content
    const [categoryWord,setCategoryWord]=useState("")//state to manage category dropdown

    const navigate=useNavigate()
    const allProducts = [
        {
          id: 1,
          name: "Samsung 55-inch 4K UHD Smart TV",
          description: "Experience stunning clarity and vibrant colors with this Samsung 55-inch 4K UHD Smart TV. Perfect for your home entertainment.",
          price: 499.99,
          rating: 4.5,
          image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQZS25LII9Jr_U1H2lCtqAapT44C1OIwC7NgmoxLcQdJmGFhPcMWhe2xJ_MmjLbf68JAzG085hWVfJmjY6Zju1vhNOveIjFcMcESIRFuaQoYwv1kT1yV9wfyrUuAdcfbS46x3uWuFo&usqp=CAc",
          category: "TVs"
        },
        {
          id: 2,
          name: "Apple MacBook Pro 13-inch (M1)",
          description: "Powered by Apple's M1 chip, this MacBook Pro is designed to offer exceptional performance for all your professional needs.",
          price: 1299.99,
          rating: 4.8,
          image: "https://via.placeholder.com/300x200?text=MacBook+Pro",
          category: "Laptops"
        },
        {
          id: 3,
          name: "iPhone 13 Pro Max",
          description: "Capture stunning photos with the iPhone 13 Pro Max, featuring a 120Hz ProMotion display and incredible battery life.",
          price: 1099.99,
          rating: 4.7,
          image: "https://via.placeholder.com/300x200?text=iPhone+13+Pro+Max",
          category: "Phones"
        },
        {
          id: 4,
          name: "Bose QuietComfort 35 II",
          description: "Experience world-class noise-canceling sound with the Bose QuietComfort 35 II headphones. Ideal for travel and everyday listening.",
          price: 299.99,
          rating: 4.6,
          image: "https://via.placeholder.com/300x200?text=Bose+Headphones",
          category: "Audio"
        },
        {
          id: 5,
          name: "Anker PowerCore 10000 Portable Charger",
          description: "Stay charged on the go with the Anker PowerCore 10000, a compact and powerful portable charger for all your devices.",
          price: 25.99,
          rating: 4.4,
          image: "https://via.placeholder.com/300x200?text=Anker+PowerCore",
          category: "Power"
        },
        {
          id: 6,
          name: "Sony 65-inch 4K OLED TV",
          description: "The Sony 65-inch 4K OLED TV delivers exceptional picture quality, perfect for movie lovers and gamers alike.",
          price: 2499.99,
          rating: 4.9,
          image: "https://via.placeholder.com/300x200?text=Sony+OLED+TV",
          category: "TVs"
        },
        {
          id: 7,
          name: "Dell XPS 13 Laptop",
          description: "The Dell XPS 13 offers top-tier performance, a stunning 13-inch display, and a sleek design, making it the ideal choice for professionals.",
          price: 999.99,
          rating: 4.7,
          image: "https://via.placeholder.com/300x200?text=Dell+XPS+13",
          category: "Laptops"
        },
        {
          id: 8,
          name: "Samsung Galaxy S21 Ultra",
          description: "With a powerful camera and a large display, the Samsung Galaxy S21 Ultra is built for those who demand the best in mobile technology.",
          price: 1199.99,
          rating: 4.6,
          image: "https://via.placeholder.com/300x200?text=Samsung+S21+Ultra",
          category: "Phones"
        },
        {
          id: 9,
          name: "JBL Flip 5 Bluetooth Speaker",
          description: "The JBL Flip 5 is a portable Bluetooth speaker that delivers powerful sound with deep bass, perfect for any outdoor adventure.",
          price: 99.99,
          rating: 4.5,
          image: "https://via.placeholder.com/300x200?text=JBL+Flip+5",
          category: "Audio"
        },
        {
          id: 10,
          name: "RAVPower 27000mAh Portable Charger",
          description: "Charge multiple devices at once with this high-capacity power bank from RAVPower, equipped with 3 USB ports and a sleek design.",
          price: 35.99,
          rating: 4.4,
          image: "https://via.placeholder.com/300x200?text=RAVPower+Charger",
          category: "Power"
        }
      ];
    const  products=allProducts.filter((product)=>{
        if (searchWord==="" && categoryWord===""){return true}
        else if(searchWord!==""&&categoryWord===""){return product.name.toLowerCase().includes(searchWord.toLowerCase())||product.category===categoryWord}
        else{return product.name.toLowerCase().includes(searchWord.toLowerCase())&&product.category===categoryWord}
    })
  return (
    <div className="flex">
  {/* Sidebar for filters (visible on large screens) */}
  <div className="hidden lg:block w-1/4 p-4">
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      {/* Add filter options here */}
      <div className="mb-4">
        <h3 className="font-medium">Color</h3>
        {/* Color filters */}
        <ul className="space-y-2">
          <li><input type="checkbox" /> Red</li>
          <li><input type="checkbox" /> Blue</li>
          <li><input type="checkbox" /> Black</li>
        </ul>
      </div>
      <div>
        <h3 className="font-medium">Price Range</h3>
        {/* Price filters */}
        <input type="range" min="0" max="1000" />
      </div>
    </div>
  </div>

  {/* Product Listing */}
  <div className="flex-1 p-4">
    {/* Top Bar: Search and Category Filter */}
    <div className="flex justify-between items-center mb-4">
      {/* Search Bar */}
      <div className="w-1/2">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchWord}
          onChange={(e)=>setSearchWord(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="ml-4 w-1/2">
        <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" value={categoryWord} onChange={(e)=>setCategoryWord(e.target.value)}>
          <option value="">All Categories</option>
          <option value="TVs">TVs</option>
          <option value="Laptops">Laptops</option>
          <option value="Phones">Phones</option>
          <option value="Audio">Audio</option>
          <option value="Power">Power</option>
        </select>
      </div>
    </div>

    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
  {products.map((product) => (
    <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden h-full flex flex-col">
      {/* Image and Rating */}
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
        <span className="absolute top-2 right-2 bg-black text-white p-1 rounded-md text-xs">
          {product.rating} ⭐
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-grow cursor-pointer" onClick={() => navigate(`/client/product/${product.id}`)}>
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="mt-2 text-xl font-bold">${product.price}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-auto p-4">
        <button
          className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
          onClick={() => navigate(`/client/product/${product.id}`)}
        >
          Details
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>

  </div>
</div>

  );
};

export default ProductListing;
