import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import navigation hook
import { getCart, saveCart } from "./cartStorage";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();  // ✅ Initialize navigation

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const updateCart = (newCart) => {
    saveCart(newCart);
    setCartItems(newCart);
  };

  const handleBuyNow = () => {
    navigate("/checkout");  // ✅ Navigate to Checkout page
  };

  // ... rest of your existing Cart code (same as before)
  
  const cleanPrice = (price) => Number(String(price).replace(/[^\d.-]/g, ""));
  const totalPrice = cartItems.reduce(
    (total, item) => total + cleanPrice(item.price) * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return <h2 className="cart-empty">Your Cart is Empty</h2>;

  return (
    <div className="cart-container" style={{ color: "black" }}>
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.productId} className="cart-item">
          <img src={item.img} alt={item.name} className="cart-img" />
          <div className="cart-details">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Price:</strong> ₹{cleanPrice(item.price)}</p>
            <div className="qty-section">
              <span><strong>Quantity: </strong></span>
              <button onClick={() => updateCart(cartItems.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0))}>-</button>
              <span className="qty-number">{item.quantity}</span>
              <button onClick={() => updateCart(cartItems.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i))}>+</button>
            </div>
            <p><strong>Subtotal:</strong> ₹{cleanPrice(item.price) * item.quantity}</p>
            <button className="remove-btn" onClick={() => updateCart(cartItems.filter(i => i.productId !== item.productId))}>Remove</button>
          </div>
        </div>
      ))}

      <h3 className="cart-total">Total: ₹{totalPrice.toLocaleString()}</h3>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <button
          onClick={handleBuyNow}
          style={{
            background: "none",
            border: "none",
            color: "black",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            padding: "0",
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
