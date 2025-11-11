import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 1. Accept `cartItems` as a prop
const Checkout = ({ cartItems }) => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // All checks have been removed as requested.

    // Save address to localStorage for timer page.
    // If the fields are empty, this will just save ", , "
    localStorage.setItem("address", `${address.street}, ${address.city}, ${address.pincode}`);

    // Navigate to timer page immediately
    navigate("/timer");
  };

  // Helper for input styles
  const inputStyles = "w-full p-2 border border-gray-300 rounded-md mb-3";

  return (
    // Replaced `checkout-container` with Tailwind classes
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-lg font-inter my-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

      {/* Cart Summary */}
      {/* Replaced `checkout-section` with Tailwind classes */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            // Replaced `checkout-item` with Tailwind classes
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium">₹{item.price * item.quantity}</p>
            </div>
          ))
        )}
        
        <hr className="my-4" />
        {/* Replaced `total` with Tailwind classes */}
        <h3 className="text-xl font-bold text-right text-gray-800">Total: ₹{total}</h3>
      </div>

      {/* Address Section */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
          className={inputStyles}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          className={inputStyles}
        />
        <input
          type="text"
          placeholder="Street Address"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className={inputStyles}
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          className={inputStyles}
        />
        <input
          type="text"
          placeholder="Pincode"
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          className={inputStyles}
        />
      </div>

      {/* Payment Section */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
        <label className="flex items-center space-x-2 mb-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="form-radio text-blue-600"
          />
          <span>Cash on Delivery</span>
        </label>
        <label className="flex items-center space-x-2 mb-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="form-radio text-blue-600"
          />
          <span>UPI Payment</span>
        </label>
        <label className="flex items-center space-x-2 mb-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="Card"
            checked={paymentMethod === "Card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="form-radio text-blue-600"
          />
          <span>Credit/Debit Card</span>
        </label>
      </div>

      {/* Place Order Button */}
      {/* Replaced `place-order-btn` with Tailwind classes */}
      <button 
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400" 
        onClick={handleCheckout}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;