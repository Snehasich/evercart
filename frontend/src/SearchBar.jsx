import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ products }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.trim() === "") {
      setFiltered([]);
    } else {
      const results = products.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      setFiltered(results);
    }
  };

  const handleSelect = (item) => {
    setQuery(item.name);
    setFiltered([]);
    navigate(`/product/${item.id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = products.find(
      (item) => item.name.toLowerCase() === query.toLowerCase()
    );
    if (match) navigate(`/product/${match.id}`);
    else alert("Product not found in your store");
  };

  return (
    <div style={{ position: "relative" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleSearch}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </form>

      {filtered.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "5px",
            position: "absolute",
            width: "100%",
            background: "white",
            color: "black",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          {filtered.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              style={{
                padding: "8px",
                cursor: "pointer",
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
