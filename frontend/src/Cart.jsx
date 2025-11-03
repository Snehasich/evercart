import { useState, useEffect } from "react";
import { getCart, saveCart } from "./cartStorage";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

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

  const cleanPrice = (price) => {
    return Number(String(price).replace(/[^\d.-]/g, ""));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + cleanPrice(item.price) * item.quantity,
    0
  );

  const handleBuyNow = () => {
    alert("Proceeding to checkout...");
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

            <p>
              <strong>Subtotal:</strong>{" "}
              ₹{cleanPrice(item.price) * item.quantity}
            </p>

            <button
              className="remove-btn"
              onClick={() => handleRemove(item.productId)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3 className="cart-total">Total: ₹{totalPrice.toLocaleString()}</h3>

      {/* Buy Now button styled like Total Price */}
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
