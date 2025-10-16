import logo from './logo.jpg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Main() {
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); // track mode

  // Load saved mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    if (query.trim() !== "") {  // input is not empty
      window.location.href = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
      setQuery("");
    }
  };

  const toggleMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      document.body.classList.toggle("dark-mode", newMode);
      localStorage.setItem("darkMode", newMode); // persist choice
      return newMode;
    });
  };

  return (
    <div className="Main">
      <div className="header">
        <img src={logo} alt="Evercart Logo" className="logo" />

        <form className="search_bar" onSubmit={handleSearch}>
          <i 
            className="fa-solid fa-magnifying-glass sch" 
            onClick={handleSearch} 
            style={{ cursor: "pointer" }}
           />
          <input
            className="search"
            type="text"
            value={query}
            placeholder="Search for products, brands and more"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="login_form">
          <i className="fa-regular fa-user"></i>
          <Link to="/login" className="head4 head">Login</Link>
          <i className="fa-solid fa-angle-down up"></i>

          <div className="login_dropdown">
            <p>Hello! Please log in to continue.</p>
            <Link to="/login" className="dropdown_link" style={{fontSize:"20px"}}>
              <strong>Login/Sign Up</strong>
            </Link>
          </div>
        </div>

        <div className="cart_item">
          <i className="fa-solid fa-cart-shopping"></i>
          <Link to="/cart" className='head4 head'>Cart</Link>
        </div>

        <div className="mode">
          <button onClick={toggleMode} style={{height:"40px"}}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;