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

  // ✅ Product list for SearchBar suggestions
  const allProducts = [
    { id: "iphone15pro", name: "iPhone 15 Pro" },
    { id: "s24ultra", name: "Samsung Galaxy S24 Ultra" },
    { id: "ipadairm2", name: "iPad Air (M2)" },
    { id: "tabs9", name: "Samsung Galaxy Tab S9" },
    { id: "macbookairm2", name: "MacBook Air M2" },
    { id: "legion5pro", name: "Lenovo Legion 5 Pro" },
    { id: "vivobook15", name: "ASUS Vivobook 15" },
    { id: "hp15s", name: "HP 15s Ryzen 5" },
    { id: "applewatch9", name: "Apple Watch Series 9" },
    { id: "galaxywatch6", name: "Samsung Galaxy Watch 6" },
    { id: "noiseultra2", name: "Noise ColorFit Ultra 2" },
    { id: "boatxtend", name: "boAt Xtend" },
    { id: "airpodspro2", name: "AirPods Pro 2" },
    { id: "sonywh1000xm5", name: "Sony WH-1000XM5" },
    { id: "jbltune510", name: "JBL Tune 510BT" },
    { id: "boatairdopes181", name: "boAt Airdopes 181" },
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
    navigate("/");
  };

  // ✅ Product category data (unchanged)
  const mobile_tablet_details = [ /* your mobile_tablet_details */ ];
  const laptop_details = [ /* your laptop_details */ ];
  const wearable_details = [ /* your wearable_details */ ];
  const audio_details = [ /* your audio_details */ ];
  const appliance_details = [ /* your appliance_details */ ];

  return (
    <div className="Main">
      {/* ---------- HEADER ---------- */}
      <div className="header">
        <img src={logo} alt="Evercart Logo" className="logo" />

        {/* ✅ Smart Search Bar */}
        <div style={{ width: "40%", position: "relative" }}>
          <SearchBar products={allProducts} />
        </div>

        {/* ---------- LOGIN SECTION ---------- */}
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
                  style={{
                    fontSize: "18px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
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

        {/* ---------- CART SECTION ---------- */}
        <div className="cart_item">
          <i className="fa-solid fa-cart-shopping"></i>
          <Link to="/cart" className='head4 head'>Cart</Link>
        </div>

        {/* ---------- DARK MODE TOGGLE ---------- */}
        <div className="mode">
          <button onClick={toggleMode} style={{ height: "40px" }}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* ---------- PRODUCT SECTIONS ---------- */}
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

      {/* ---------- FOOTER ---------- */}
      <footer style={{ background: "#212121", color: "#fff", padding: "40px 5%", marginTop: "60px" }}>
        {/* Your original footer content here */}
      </footer>
    </div>
  );
}

export default Main;
