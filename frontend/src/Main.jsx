import logo from './logo.jpg';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Load saved mode and login info from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username") || "";
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      window.location.href = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
      setQuery("");
    }
  };

  const toggleMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      document.body.classList.toggle("dark-mode", newMode);
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/"); // redirect to home
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

        {/* Login / Username Section */}
        <div className="login_form">
          <i className="fa-regular fa-user"></i>

          {isLoggedIn ? (
            <>
              <span className="head4 head">Hello</span>
              <i className="fa-solid fa-angle-down up"></i>
              <div className="login_dropdown">
                <p>Welcome back, {username}!</p>
                <button 
                  onClick={handleLogout} 
                  className="dropdown_link" 
                  style={{ fontSize: "18px", background: "none", border: "none", cursor: "pointer" }}
                >
                  <strong>Logout</strong>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="head4 head">Login</Link>
              <i className="fa-solid fa-angle-down up"></i>
              <div className="login_dropdown">
                <p>Hello! Please log in to continue.</p>
                <Link to="/login" className="dropdown_link" style={{ fontSize: "20px" }}>
                  <strong>Login/Sign Up</strong>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="cart_item">
          <i className="fa-solid fa-cart-shopping"></i>
          <Link to="/cart" className='head4 head'>Cart</Link>
        </div>

        <div className="mode">
          <button onClick={toggleMode} style={{ height: "40px" }}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
