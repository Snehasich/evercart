import React, { useState, useEffect } from "react"; // 1. Import useEffect
import "./checkout.css";
import { getCart, saveCart } from "./cartStorage"; // 2. Import your cart functions

// 3. REMOVE `cartItems` from the props. It will get its own data.
const Checkout = () => {
  
  // 4. Add state to HOLD the cart items, just like in Cart.jsx
  const [cartItems, setCartItems] = useState([]);

  // 5. Add useEffect to LOAD the cart items from localStorage on mount
  useEffect(() => {
    setCartItems(getCart());
  }, []);

  // This local state for the form is perfect. Keep it.
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Helper function to clean price (copied from your Cart.jsx)
  const cleanPrice = (price) => Number(String(price).replace(/[^\d.-]/g, ""));

  // This `total` calculation will now work on the state loaded from localStorage
  const total = cartItems.reduce(
    (acc, item) => acc + cleanPrice(item.price) * item.quantity,
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

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert(
      `Order placed successfully!\nPayment Method: ${paymentMethod}\nTotal: ₹${total}`
    );

    // 6. (Recommended) Clear the cart from localStorage after a successful order
    saveCart([]); // This clears the cart
    setCartItems([]); // This updates the page to show an empty cart
    // You might want to navigate to a "Thank You" page here
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Cart Summary */}
      <div className="checkout-section">
        <h2>Order Summary</h2>

        {/* This will now work perfectly */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            // Use item.productId to match your Cart.jsx
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
        <h3 className="total">Total: ₹{total}</h3>
      </div>

      {/* Address Section (No changes needed) */}
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

      {/* Payment Section (No changes needed) */}
      <div className="checkout-section">
        {/* ...all your payment labels... */}
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