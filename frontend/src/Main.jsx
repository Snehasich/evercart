import logo from './logo.jpg';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Items from './Items.jsx';

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



  const mobile_tablet_details = [
    {
      name: "iPhone 15 Pro",
      price: "₹1,34,900",
      img: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/p/b/q/-original-imahggex2ye98xfn.jpeg?q=70&crop=false"
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      price: "₹1,29,999",
      img: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=70&crop=false"
    },
    {
      name: "iPad Air (M2)",
      price: "₹59,900",
      img: "https://rukminim2.flixcart.com/image/416/416/xif0q/tablet/w/p/r/-original-imahyp6gugx6vzqn.jpeg?q=70&crop=false"
    },
    {
      name: "Samsung Galaxy Tab S9",
      price: "₹72,999",
      img: "https://rukminim2.flixcart.com/image/416/416/xif0q/tablet/n/o/f/-original-imah69ytcerzgckb.jpeg?q=70&crop=false"
    }
  ];


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

      <div className="items_container">
          <h1>Mobiles and Tablets</h1>
          <div className="boxes">
            {mobile_tablet_details.map(function(ele) {
              return <Items name={ele.name} price={ele.price} img={ele.img}/>;
            })}
          </div>
      </div>

       {/* ✅ Text-based Footer */}
      <footer style={{ background: "#212121", color: "#fff", padding: "40px 5%", marginTop: "60px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", lineHeight: "1.8" }}>
          
          <div>
            <h4>ABOUT</h4>
            <p>Contact Us</p>
            <p>About Us</p>
            <p>Careers</p>
            <p>Evercart Stories</p>
            <p>Press</p>
            <p>Corporate Information</p>
          </div>

          <div>
            <h4>GROUP COMPANIES</h4>
            <p>Myntra</p>
            <p>Cleartrip</p>
            <p>Shopsy</p>
          </div>

          <div>
            <h4>HELP</h4>
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation & Returns</p>
            <p>FAQ</p>
          </div>

          <div>
            <h4>CONSUMER POLICY</h4>
            <p>Cancellation & Returns</p>
            <p>Terms Of Use</p>
            <p>Security</p>
            <p>Privacy</p>
            <p>Sitemap</p>
            <p>Grievance Redressal</p>
            <p>EPR Compliance</p>
          </div>

          <div style={{ minWidth: "250px" }}>
            <h4>Mail Us:</h4>
            <p>Evercart Internet Private Limited,<br/>
            Buildings Alyssa, Begonia &<br/>
            Clove Embassy Tech Village,<br/>
            Outer Ring Road, Devarabeesanahalli Village,<br/>
            Bengaluru, 560060, Karnataka, India</p>

            <h4>Social:</h4>
            <div style={{ fontSize: "20px", display: "flex", gap: "10px" }}>
              <i className="fa-brands fa-x-twitter"></i>
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>

          <div style={{ minWidth: "250px" }}>
            <h4>Registered Office Address:</h4>
            <p>Evercart Internet Private Limited,<br/>
            Buildings Alyssa, Begonia &<br/>
            Clove Embassy Tech Village,<br/>
            Outer Ring Road, Devarabeesanahalli Village,<br/>
            Bengaluru, 560060, Karnataka, India</p>
            <p><strong>CIN:</strong> U51109KA2012PTC066105</p>
            <p><strong>Telephone:</strong> 9798021232 / 7019836687</p>
          </div>
        </div>

        <hr style={{ margin: "30px 0", borderColor: "#444" }} />

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "20px", fontSize: "14px" }}>
            <p>Become a Seller</p>
            <p>Advertise</p>
            <p>Gift Cards</p>
            <p>Help Center</p>
          </div>
          <p>© 2025–2026 Evercart.com</p>
          <div style={{ fontSize: "22px", display: "flex", gap: "10px" }}>
            <i className="fa-brands fa-cc-visa"></i>
            <i className="fa-brands fa-cc-mastercard"></i>
            <i className="fa-brands fa-cc-amex"></i>
            <i className="fa-brands fa-cc-discover"></i>
            <i className="fa-brands fa-cc-paypal"></i>
          </div>
        </div>
      </footer>
      
    </div>
  );
}

export default Main;
