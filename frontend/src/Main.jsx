import React from "react";
import SearchBar from "./SearchBar";
import Items from "./Items";

const Main = () => {
  // Example product list — replace with your real product data
  const products = [
    { id: 1, name: "iPhone 15", price: "₹79,999" },
    { id: 2, name: "MacBook Air", price: "₹1,09,999" },
    { id: 3, name: "Apple Watch", price: "₹29,999" },
    { id: 4, name: "AirPods Pro", price: "₹24,999" },
    { id: 5, name: "iPad Pro", price: "₹89,999" },
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Our Store</h1>

      {/* ✅ Search Bar component */}
      <SearchBar products={products} />

      {/* ✅ Product list (existing component) */}
      <Items products={products} />
    </div>
  );
};

export default Main;
