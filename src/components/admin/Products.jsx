import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContextProvider';

const ProductManagement = () => {
  const navigate = useNavigate();
  const { categories, products } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // Manage selected product for detail view
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manage sidebar visibility

  // Filter products based on category and search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category.name === selectedCategory)
  );

  const handleViewProduct = (e,product) => {
    console.log(e.target.value)
    setSelectedProduct(product);
    setIsSidebarOpen(true);
  };

  return (
    <div className="flex" onClick={()=>setIsSidebarOpen(false)}>
      <div className="p-4 w-full">
        {/* Controls for adding, searching, and filtering */}
        <div className="flex justify-between items-center mb-4 w-full">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-600"
            onClick={() => navigate('/admin/add-product')}
          >
            Add Product
          </button>

          <div className="flex space-x-4 w-full">
            <input
              type="text"
              placeholder="Search products"
              className="border px-4 py-2 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border px-4 py-2 rounded-md w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => {
                return (
                  <option value={category.name} key={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Product Table */}
        <table className="w-full border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-center">Actions</th>
              <th className="p-4 text-center">Product Name</th>
              <th className="p-4 text-center">Unit Purchase Price</th>
              <th className="p-4 text-center">Unit Selling Price</th>
              <th className="p-4 text-center">Current Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="p-4 text-center">
                  <select className="border px-2 py-1 rounded-md w-auto max-w-xs" onClick={(e) => handleViewProduct(e,product)}>
                    <option>Actions</option>
                    <option >View</option>
                    <option>Edit</option>
                    <option>Delete</option>
                    <option>Add/Edit Stock</option>
                  </select>
                </td>
                <td className="p-4 text-center">{product.name}</td>
                <td className="p-4 text-center">KSH {product.purchase_price.toFixed(2)}</td>
                <td className="p-4 text-center">KSH {product.selling_price.toFixed(2)}</td>
                <td className="p-4 text-center">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sidebar for Product Details */}
      {isSidebarOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end">
          <div className="bg-white w-96 h-full p-6 overflow-y-auto">
            <button
              className="text-red-500 text-xl absolute top-4 right-4"
              onClick={() => setIsSidebarOpen(false)}
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="space-y-4">
              <p><strong>Product Name:</strong> {selectedProduct.name}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Category:</strong> {selectedProduct.category.name}</p>
              <p><strong>Unit Purchase Price:</strong> KSH {selectedProduct.purchase_price.toFixed(2)}</p>
              <p><strong>Unit Selling Price:</strong> KSH {selectedProduct.selling_price.toFixed(2)}</p>
              <p><strong>Stock Quantity:</strong> {selectedProduct.quantity}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
