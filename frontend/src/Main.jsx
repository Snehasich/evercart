import logo from './logo.jpg';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar";
import Items from './Items.jsx';

function Main() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // ✅ Combine all products into a single list for search suggestions
  const allProducts = [
    // Mobiles & Tablets
    { id: "iphone15pro", name: "iPhone 15 Pro" },
    { id: "s24ultra", name: "Samsung Galaxy S24 Ultra" },
    { id: "ipadairm2", name: "iPad Air (M2)" },
    { id: "tabs9", name: "Samsung Galaxy Tab S9" },
    // Laptops
    { id: "macbookairm2", name: "MacBook Air M2" },
    { id: "legion5pro", name: "Lenovo Legion 5 Pro" },
    { id: "vivobook15", name: "ASUS Vivobook 15" },
    { id: "hp15s", name: "HP 15s Ryzen 5" },
    // Smartwatches
    { id: "applewatch9", name: "Apple Watch Series 9" },
    { id: "galaxywatch6", name: "Samsung Galaxy Watch 6" },
    { id: "noiseultra2", name: "Noise ColorFit Ultra 2" },
    { id: "boatxtend", name: "boAt Xtend" },
    // Audio
    { id: "airpodspro2", name: "AirPods Pro 2" },
    { id: "sonywh1000xm5", name: "Sony WH-1000XM5" },
    { id: "jbltune510", name: "JBL Tune 510BT" },
    { id: "boatairdopes181", name: "boAt Airdopes 181" },
    // Appliances
    { id: "lgfridge", name: "LG 260L Refrigerator" },
    { id: "samsung7kg", name: "7kg Washing Machine" },
    { id: "dysonv8", name: "Dyson V8 Vacuum Cleaner" },
    { id: "philipsairfryer", name: "Philips Air Fryer" },
  ];

  // ✅ Load saved mode and login info
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username") || "";
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername);
  }, []);

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

  // ✅ Product categories (same as before)
  const mobile_tablet_details = [ /* your mobile_tablet_details array here */ ];
  const laptop_details = [ /* your laptop_details array here */ ];
  const wearable_details = [ /* your wearable_details array here */ ];
  const audio_details = [ /* your audio_details array here */ ];
  const appliance_details = [ /* your appliance_details array here */ ];

  return (
    <div className="Main">
      <div className="header">
        <img src={logo} alt="Evercart Logo" className="logo" />

        {/* ✅ Smart Search Bar Integration */}
        <div className="search_bar" style={{ width: "40%", position: "relative" }}>
          <SearchBar products={allProducts} />
        </div>

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

      {/* ✅ Product Sections (same as before) */}
      <div className="items_container">
        <h1>Mobiles and Tablets</h1>
        <div className="boxes">
          {mobile_tablet_details.map(ele => (
            <Items key={ele.id} {...ele} />
          ))}
        </div>
      </div>

      <div className="items_container">
        <h1>Laptops</h1>
        <div className="boxes">
          {laptop_details.map(ele => (
            <Items key={ele.id} {...ele} />
          ))}
        </div>
      </div>

      <div className="items_container">
        <h1>Smartwatches</h1>
        <div className="boxes">
          {wearable_details.map(ele => (
            <Items key={ele.id} {...ele} />
          ))}
        </div>
      </div>

      <div className="items_container">
        <h1>Audio Products</h1>
        <div className="boxes">
          {audio_details.map(ele => (
            <Items key={ele.id} {...ele} />
          ))}
        </div>
      </div>

      <div className="items_container">
        <h1>Smart-Home Devices</h1>
        <div className="boxes">
          {appliance_details.map(ele => (
            <Items key={ele.id} {...ele} />
          ))}
        </div>
      </div>

      {/* ✅ Footer (unchanged) */}
      <footer style={{ background: "#212121", color: "#fff", padding: "40px 5%", marginTop: "60px" }}>
        {/* your full footer code here */}
      </footer>
    </div>
  );
}

export default Main;
