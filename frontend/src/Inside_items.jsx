import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// ✅ FIXED: Renamed component to PascalCase
const InsideItems = ({ username }) => { 
  const location = useLocation();
  const { product } = location.state || {};

  const [buttonText, setButtonText] = useState("Cart");
  const [isInCart, setIsInCart] = useState(false);

  // Check if product is already in backend cart
  useEffect(() => {
    if (!product) return;

    fetch(`http://localhost:8080/api/cart?username=${username}`)
      .then(res => res.json())
      .then(data => {
        // ✅ FIXED: Changed to product.id to match the string ID
        const exists = data.some(item => item.productId === product.id); 
        setIsInCart(exists);
        setButtonText(exists ? "Added" : "Cart");
      })
      .catch(err => console.error("Cart fetch error:", err));
  }, [product, username]);

  const handleToggleCart = () => {
    if (!product) return;

    if (isInCart) {
      // Remove from cart
      // ✅ FIXED: Changed to product.id
      fetch(`http://localhost:8080/api/cart/${product.id}?username=${username}`, {
        method: "DELETE",
      })
        // Note: The delete endpoint doesn't return JSON, it just returns 200 OK
        .then(res => {
            if (!res.ok) throw new Error("Failed to remove item");
            setIsInCart(false);
            setButtonText("Cart");
        })
        .catch(err => console.error("Cart remove error:", err));
    } else {
      // Add to cart
      const cartItem = {
        productId: product.id, // ✅ FIXED: Changed to product.id
        name: product.name,
        price: product.prices, // ✅ FIXED: Your Main.jsx uses 'prices' for the number
        quantity: 1
      };

      fetch(`http://localhost:8080/api/cart?username=${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      })
        .then(res => res.json())
        .then(() => {
          setIsInCart(true);
          setButtonText("Added");
        })
        .catch(err => console.error("Cart add error:", err));
    }
  };

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="inside_items">
      <img src={product.img} alt={product.name} />
      <div className="i">
        <p>{product.name}</p>
        {/* ✅ FIXED: Your Main.jsx uses 'price' for the string "₹1,34,900" */}
        <h6>{product.price}</h6> 
        <button onClick={handleToggleCart}>{buttonText}</button>
      </div>
    </div>
  );
};

export default InsideItems; // ✅ FIXED: Renamed export