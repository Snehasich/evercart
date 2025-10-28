import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCart, saveCart } from "./cartStorage";

const InsideItems = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (!product) return;
    const exists = getCart().some(item => item.productId === product.id);
    setIsInCart(exists);
  }, [product]);

  const handleToggleCart = () => {
    const cart = getCart();

    if (isInCart) {
      const updated = cart.filter(item => item.productId !== product.id);
      saveCart(updated);
      setIsInCart(false);
    } else {
      const newItem = {
        productId: product.id,
        name: product.name,
        price: product.price, // number field
        prices: product.prices,
        img: product.img,
        quantity: 1
      };
      saveCart([...cart, newItem]);
      setIsInCart(true);
    }
  };

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="inside_items">
      <img src={product.img} alt={product.name} />
      <div className="i">
        <p>{product.name}</p>
        <h6>{product.price}</h6>
        <button onClick={handleToggleCart}>
          {isInCart ? "Added to Cart" : "Cart"}
        </button>
      </div>
    </div>
  );
};

export default InsideItems;
