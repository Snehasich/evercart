import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { getCart, saveCart } from "./cartStorage";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // For navigation to checkout page

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const updateCart = (newCart) => {
    saveCart(newCart);
    setCartItems(newCart);
  };

  const handleRemove = (productId) => {
    updateCart(cartItems.filter(item => item.productId !== productId));
  };

  const handleIncrease = (productId) => {
    const updated = cartItems.map(item =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);
  };

  const handleDecrease = (productId) => {
    const updated = cartItems
      .map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);
    updateCart(updated);
  };

  const cleanPrice = (price) => Number(String(price).replace(/[^\d.-]/g, ""));
  const totalPrice = cartItems.reduce(
    (total, item) => total + cleanPrice(item.price) * item.quantity,
    0
  );

  const handleBuyNow = () => {
    navigate("/checkout"); // ✅ Navigate to Checkout page
  };

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
              <button onClick={() => handleDecrease(item.productId)}>-</button>
              <span className="qty-number">{item.quantity}</span>
              <button onClick={() => handleIncrease(item.productId)}>+</button>
            </div>

            <p><strong>Subtotal:</strong> ₹{cleanPrice(item.price) * item.quantity}</p>
            <button className="remove-btn" onClick={() => handleRemove(item.productId)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3 className="cart-total" style={{
        textAlign: "center",
        fontSize: "1.3rem",
        fontWeight: "bold",
        marginTop: "20px",
      }}>
        Total: ₹{totalPrice.toLocaleString()}
      </h3>

      {/* ✅ Centered, Styled Buy Button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
        <button
          onClick={handleBuyNow}
          style={{
            backgroundColor: "#007bff", // Blue vibrant color
            color: "white",
            padding: "10px 40px",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
