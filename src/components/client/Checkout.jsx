import React, { useState, useEffect } from 'react';

const Checkout = () => {
  // State to hold cart items
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Calculate subtotal price
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxRate = 0.16; // Example tax rate (16%)
  const shippingFee = subtotal > 0 ? 200 : 0; // Example shipping fee, free if cart is empty

  // Calculate total with tax and shipping
  const taxAmount = subtotal * taxRate;
  const totalPrice = subtotal + taxAmount + shippingFee;

  // State for shipping details
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  // Handle input changes
  const handleInputChange = (e, setDetails) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Check if all shipping fields are filled
  const isShippingComplete = Object.values(shippingDetails).every((field) => field.trim() !== '');

  const handlePlaceOrder = () => {
    if (isShippingComplete) {
      alert('Order placed successfully!');
      // Add functionality to handle order submission (e.g., API call)
    } else {
      alert('Please fill in all fields before placing the order.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        {cartItems.length > 0 ? (
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} (x{item.quantity})</span>
                <span>KSH {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>KSH {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (16%)</span>
              <span>KSH {taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>KSH {shippingFee.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>KSH {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">No items in the cart.</p>
        )}
      </div>

      {/* Shipping Details */}
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
        <form className="space-y-2">
          {['name', 'address', 'city', 'postalCode', 'country'].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={shippingDetails[field]}
                onChange={(e) => handleInputChange(e, setShippingDetails)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          ))}
        </form>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full py-2 bg-green-500 text-white font-semibold rounded-md mt-4"
        disabled={cartItems.length === 0 || !isShippingComplete}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
