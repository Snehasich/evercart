import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, saveCart } from "./cartStorage";
import "./checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  // 🛒 Cart & form state
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // 🔄 Load cart from localStorage
  useEffect(() => {
    const items = getCart();
    setCartItems(items || []);
  }, []);

  // 🧮 Clean price helper
  const cleanPrice = (price) =>
    Number(String(price).replace(/[^\d.-]/g, "")) || 0;

  // 💰 Calculate total price
  const total = cartItems.reduce(
    (acc, item) => acc + cleanPrice(item.price) * item.quantity,
    0
  );

  // ✅ Handle placing the order
  const handlePlaceOrder = () => {
    // Check for required address fields
    if (
      !address.name ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      alert("⚠️ Please fill all delivery address fields before placing the order.");
      return;
    }

    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    alert(
      `✅ Order placed successfully!\nPayment Method: ${paymentMethod}\nTotal: ₹${total.toLocaleString()}`
    );

    // ✅ Save address for Timer.jsx to display
    localStorage.setItem(
      "address",
      `${address.street}, ${address.city}, ${address.pincode}`
    );

    // ✅ Start a 15-minute persistent timer (in milliseconds)
    const endTime = Date.now() + 15 * 60 * 1000; // 15 minutes
    localStorage.setItem("orderEndTime", endTime);

    // ✅ Clear the cart
    saveCart([]);
    setCartItems([]);

    // ✅ Navigate back to cart (Timer will appear automatically)
    navigate("/cart");
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* 🧾 Order Summary */}
      <div className="checkout-section">
        <h2>Order Summary</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.productId} className="checkout-item">
              <div>
                <h3>{item.name}</h3>
                <p>Qty: {item.quantity}</p>
              </div>
              <p>₹{cleanPrice(item.price) * item.quantity}</p>
            </div>
          ))
        )}

        <hr />
        <h3 className="total">Total: ₹{total.toLocaleString()}</h3>
      </div>

      {/* 🏠 Address Section */}
      <div className="checkout-section">
        <h2>Delivery Address</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Street Address"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pincode"
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
        />
      </div>

      {/* 💳 Payment Section */}
      <div className="checkout-section">
        <h2>Payment Method</h2>

        <label>
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI Payment
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="Card"
            checked={paymentMethod === "Card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Credit / Debit Card
        </label>
      </div>

      {/* 🟢 Buttons */}
      <div className="checkout-actions">
        <button className="back-btn" onClick={() => navigate("/cart")}>
          ← Back to Cart
        </button>

        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
