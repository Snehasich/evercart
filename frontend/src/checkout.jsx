import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, saveCart } from "./cartStorage";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const items = getCart();
    setCartItems(items || []);
  }, []);

  const cleanPrice = (price) =>
    Number(String(price).replace(/[^\d.-]/g, "")) || 0;

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

    localStorage.setItem(
      "address",
      `${address.street}, ${address.city}, ${address.pincode}`
    );

    const endTime = Date.now() + 15 * 60 * 1000;
    localStorage.setItem("orderEndTime", endTime);

    saveCart([]);
    setCartItems([]);

    navigate("/cart");
  };

  return (
    <div className="max-w-[750px] mx-auto my-8 p-8 bg-white dark:bg-[#1e1e1e]
      rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.08)] text-[#222] dark:text-white">

      <h1 className="text-center text-2xl font-bold mb-6">
        Checkout
      </h1>

      {/* Order Summary */}
      <div className="border border-gray-200 dark:border-gray-700
        rounded-xl p-6 mb-6 bg-gray-50 dark:bg-[#2a2a2a]">

        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            Your cart is empty.
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between mb-3">

              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-medium">
                ₹{cleanPrice(item.price) * item.quantity}
              </p>
            </div>
          ))
        )}

        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        <h3 className="text-right font-bold text-lg">
          Total: ₹{total.toLocaleString()}
        </h3>
      </div>

      {/* Address */}
      <div className="border border-gray-200 dark:border-gray-700
        rounded-xl p-6 mb-6 bg-gray-50 dark:bg-[#2a2a2a]">

        <h2 className="text-xl font-semibold mb-4">
          Delivery Address
        </h2>

        {["Full Name", "Phone Number", "Street Address", "City", "Pincode"].map(
          (placeholder, index) => {
            const keys = ["name", "phone", "street", "city", "pincode"];
            return (
              <input
                key={index}
                type="text"
                placeholder={placeholder}
                value={address[keys[index]]}
                onChange={(e) =>
                  setAddress({ ...address, [keys[index]]: e.target.value })
                }
                className="w-full p-3 mb-3 border border-gray-300 dark:border-gray-600
                  rounded-lg bg-white dark:bg-[#1e1e1e]
                  focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20
                  outline-none"
              />
            );
          }
        )}
      </div>

      {/* Payment */}
      <div className="border border-gray-200 dark:border-gray-700
        rounded-xl p-6 mb-6 bg-gray-50 dark:bg-[#2a2a2a]">

        <h2 className="text-xl font-semibold mb-4">
          Payment Method
        </h2>

        {["COD", "UPI", "Card"].map(method => (
          <label
            key={method}
            className="flex items-center gap-2 mb-2 cursor-pointer">

            <input
              type="radio"
              name="payment"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {method === "COD"
              ? "Cash on Delivery"
              : method === "UPI"
              ? "UPI Payment"
              : "Credit / Debit Card"}
          </label>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between gap-4 mt-6 max-sm:flex-col">
        <button
          onClick={() => navigate("/cart")}
          className="flex-1 bg-gray-200 dark:bg-gray-700
            hover:bg-gray-300 dark:hover:bg-gray-600
            py-3 rounded-lg font-medium transition">
          ← Back to Cart
        </button>

        <button
          onClick={handlePlaceOrder}
          className="flex-1 bg-blue-600 hover:bg-blue-800
            text-white py-3 rounded-lg font-semibold transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
