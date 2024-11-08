import { useState } from 'react';

const ProductManagement = () => {
  // Dummy data for products
  const initialProducts = [
    {
      id: 1,
      name: "Smart TV 55 inch",
      purchasePrice: 300,
      sellingPrice: 500,
      stock: 10,
      category: "TVs",
    },
    {
      id: 2,
      name: "Laptop HP Pavilion",
      purchasePrice: 600,
      sellingPrice: 800,
      stock: 5,
      category: "Laptops",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      purchasePrice: 50,
      sellingPrice: 100,
      stock: 15,
      category: "Audio",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || product.category === selectedCategory)
  );

  return (
    <div className="p-4">
      {/* Controls for adding, searching, and filtering */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-green-500 text-white py-2 px-4 rounded-md">
          Add Product
        </button>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search products"
            className="border px-4 py-2 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border px-4 py-2 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="TVs">TVs</option>
            <option value="Laptops">Laptops</option>
            <option value="Audio">Audio</option>
            <option value="Phones">Phones</option>
            <option value="Power">Power</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <table className="w-full border-collapse bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-100 items-center">
            <th className="p-4">
              <input type="checkbox" />
            </th>
            <th className="p-4">Actions</th>
            <th className="p-4">Product Name</th>
            <th className="p-4">Unit Purchase Price</th>
            <th className="p-4">Unit Selling Price</th>
            <th className="p-4">Current Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-4 text-center">
                <input type="checkbox" />
              </td>
              <td className="p-4">
                <select className="border px-2 py-1 rounded-md">
                  <option>Actions</option>
                  <option>View</option>
                  <option>Edit</option>
                  <option>Delete</option>
                  <option>Add/Edit Stock</option>
                </select>
              </td>
              <td className="p-4">{product.name}</td>
              <td className="p-4">${product.purchasePrice.toFixed(2)}</td>
              <td className="p-4">${product.sellingPrice.toFixed(2)}</td>
              <td className="p-4 text-center">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
