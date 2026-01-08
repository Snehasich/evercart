import { useState, useEffect } from "react";
import { getCart, saveCart } from "./cartStorage";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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
    updateCart(
      cartItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (productId) => {
    updateCart(
      cartItems
        .map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const cleanPrice = (price) =>
    Number(String(price).replace(/[^\d.-]/g, ""));

  const totalPrice = cartItems.reduce(
    (total, item) => total + cleanPrice(item.price) * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <h2 className="text-[30px] text-center py-10 text-gray-600 dark:text-gray-300">
        Your Cart is Empty
      </h2>
    );

  const goToCheckout = () => navigate("/checkout");

  return (
    <div className="max-w-[900px] mx-auto p-8 text-black dark:text-white">

      {/* Title */}
      <h2 className="text-[40px] font-bold text-center bg-accent text-white
        w-[300px] mx-auto mb-8 py-2 rounded-[40px]">
        Your Cart
      </h2>

      {/* Cart Items */}
      {cartItems.map(item => (
        <div
          key={item.productId}
          className="flex items-center gap-5 bg-[#fff7e0] dark:bg-[#2a2a2a]
            p-5 rounded-[18px] shadow-md my-4">

          <img
            src={item.img}
            alt={item.name}
            className="w-[180px] h-[180px] object-contain
              bg-white p-2 rounded-lg"
          />

          <div>
            <p className="text-lg"><strong>Name:</strong> {item.name}</p>
            <p className="text-lg">
              <strong>Price:</strong> ₹{cleanPrice(item.price)}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 my-2">
              <strong>Quantity:</strong>

              <button
                onClick={() => handleDecrease(item.productId)}
                className="w-[34px] h-[34px] rounded-full bg-accent text-white
                  hover:bg-yellow-600 transition">
                -
              </button>

              <span className="text-lg font-bold">{item.quantity}</span>

              <button
                onClick={() => handleIncrease(item.productId)}
                className="w-[34px] h-[34px] rounded-full bg-accent text-white
                  hover:bg-yellow-600 transition">
                +
              </button>
            </div>

            <p className="text-lg">
              <strong>Subtotal:</strong>{" "}
              ₹{cleanPrice(item.price) * item.quantity}
            </p>

            <button
              onClick={() => handleRemove(item.productId)}
              className="mt-3 bg-red-500 hover:bg-red-700
                text-white px-4 py-2 rounded-lg transition">
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Total */}
      <h3 className="text-[32px] text-center bg-red-500 text-white
        w-[300px] mx-auto my-6 py-2 rounded-[40px]">
        Total: ₹{totalPrice.toLocaleString()}
      </h3>

      {/* Checkout */}
      <button
        onClick={goToCheckout}
        className="flex items-center justify-center
          mx-auto mt-20 w-[300px] h-[50px]
          bg-olive text-white rounded-lg
          hover:opacity-90 transition">
        Enter
      </button>
    </div>
  );
};

export default Cart;
