// ✅ FIXED: Import useCallback
import { useState, useEffect, useCallback } from "react"; 

const Cart = ({ username }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ FIXED: Wrap fetchCart in useCallback
  const fetchCart = useCallback(() => {
    fetch(`http://localhost:8080/api/cart?username=${username}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch cart");
        return res.json();
      })
      .then(data => setCartItems(data))
      .catch(err => console.error("Cart fetch error:", err));
  }, [username]); // ✅ FIXED: Dependency for useCallback is username

  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // ✅ FIXED: Dependency for useEffect is fetchCart

  // Remove item
  const handleRemove = (productId) => {
    fetch(`http://localhost:8080/api/cart/${productId}?username=${username}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to remove item");
        fetchCart();
      })
      .catch(err => console.error("Cart remove error:", err));
  };

  // Increase quantity
  const handleIncrease = (item) => {
    // Note: Your 'price' field is a Double, 'prices' (from Main.jsx) might be different
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    fetch(`http://localhost:8080/api/cart?username=${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update quantity");
        fetchCart();
      })
      .catch(err => console.error("Quantity increase error:", err));
  };

  // Decrease quantity
  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      // Remove item if quantity goes below 1
      handleRemove(item.productId);
      return;
    }

    const updatedItem = { ...item, quantity: item.quantity - 1 };
    fetch(`http://localhost:8080/api/cart?username=${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update quantity");
        fetchCart();
      })
      .catch(err => console.error("Quantity decrease error:", err));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) return <h2>Your Cart is Empty</h2>;

  return (
    <div className="cart">
      <h2 className="yourcart">Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.productId} className="cart-item">
          <p className="name"><strong>Name:</strong> {item.name}</p>
          <p className="price"><strong>Price:</strong> ${item.price}</p>
          <p className="quantity">
            <strong>Quantity:</strong>
            <button onClick={() => handleDecrease(item)}>-</button>
            {item.quantity}
            <button onClick={() => handleIncrease(item)}>+</button>
          </p>
          <p className="subtotal"><strong>Subtotal:</strong> ${item.price * item.quantity}</p>
          <button onClick={() => handleRemove(item.productId)}>Remove</button>
        </div>
      ))}
      <h3 className="total">Total: ${totalPrice.toFixed(2)}</h3> {/* Added toFixed(2) for currency */}
    </div>
  );
};

export default Cart;