import React, { useState } from "react";
import "./Checkout.css";

const Checkout = () => {
  // Sample cart data (you can replace this with context or props)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Redmi Note 13", price: 14999, quantity: 1 },
    { id: 2, name: "HP Pavilion Laptop", price: 58999, quantity: 1 },
  ]);

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

  const handlePlaceOrder = () => {
    if (
      !address.name ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      alert("Please fill all address details before placing the order.");
      return;
    }

    alert(
      `Order placed successfully!\nPayment Method: ${paymentMethod}\nTotal: ₹${total}`
    );
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Cart Summary */}
      <div className="checkout-section">
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-item">
            <div>
              <h3>{item.name}</h3>
              <p>Qty: {item.quantity}</p>
            </div>
            <p>₹{item.price * item.quantity}</p>
          </div>
        ))}
        <hr />
        <h3 className="total">Total: ₹{total}</h3>
      </div>

      {/* Address Section */}
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

      {/* Payment Section */}
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
          Credit/Debit Card
        </label>
      </div>

      {/* Place Order Button */}
      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
