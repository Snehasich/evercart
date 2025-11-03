import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ products }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Filter products that include the search text
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(value)
    );

    setSuggestions(filtered.slice(0, 5)); // show max 5 suggestions
  };

  const handleSelect = (product) => {
    setQuery(product.name);
    setSuggestions([]);
    navigate(`/product/${product.id}`); // navigate to product page
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const matched = products.find(
      (p) => p.name.toLowerCase() === query.toLowerCase()
    );

    if (matched) navigate(`/product/${matched.id}`);
    else alert("No product found!");
  };

  return (
    <div style={{ position: "relative", width: "300px", margin: "auto" }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
          }}
        />
      </form>

      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            listStyle: "none",
            padding: "5px",
            margin: 0,
            zIndex: 100,
          }}
        >
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
