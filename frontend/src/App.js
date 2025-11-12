import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Cart from './Cart.jsx';
import Checkout from './checkout.jsx';
import InsideItems from "./Inside_items.jsx";
import SearchResults from './SearchBar.jsx'; // add import
import Timer from './timer.jsx'; // Make sure this matches the filename
import './App.css';



function App() {
  const loggedInUsername = "testUser";

  const [cartItems, setCartItems] = useState([]);

  // 3. Create the function to add items to the cart
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If it exists, map over the array and increase the quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it's a new item, add it to the cart with quantity 1
        // ✅ FIX: We create a new object using the *numeric price* (product.prices)
        // This keeps your cart calculations accurate.
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.prices, // Using the numeric price
          img: product.img,
        };
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // 4. Calculate cart count (optional, but useful for a navbar)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <Routes>
        {/* 5. Pass props down to each component that needs them */}
        <Route 
          path="/" 
          element={<Main handleAddToCart={handleAddToCart} cartCount={cartCount} />} 
        />
        
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/cart" 
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} cartCount={cartCount} />} 
        />
        
        <Route 
          path="/checkout" 
          element={<Checkout cartItems={cartItems} />} 
        />
        
        <Route 
          path="/item/:id" 
          element={<InsideItems handleAddToCart={handleAddToCart} cartCount={cartCount} />} 
        />
        
        {/* Add SearchBar route so Main's navigate("/SearchBar", { state }) works */}
        <Route 
          path="/SearchBar" 
          element={<SearchResults handleAddToCart={handleAddToCart} cartCount={cartCount} />} 
        />
      </Routes>

      <Timer />
    </Router>
  );
}

export default App;