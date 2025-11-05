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
      navigate(`/SearchBar?q=${encodeURIComponent(query)}`);
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
    id: "iphone15pro",
    name: "iPhone 15 Pro",
    price: "₹1,00,000",
    img: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/p/b/q/-original-imahggex2ye98xfn.jpeg?q=70&crop=false",
    prices: 100000
  },
  {
    id: "s24ultra",
    name: "Samsung Galaxy S24 Ultra",
    price: "₹1,29,999",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=70",
    prices: 129999
  },
  {
    id: "ipadairm2",
    name: "iPad Air (M2)",
    price: "₹59,900",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/w/p/r/-original-imahyp6gugx6vzqn.jpeg?q=70",
    prices: 59900
  },
  {
    id: "tabs9",
    name: "Samsung Galaxy Tab S9",
    price: "₹72,999",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/n/o/f/-original-imah69ytcerzgckb.jpeg?q=70",
    prices: 72999
  }
];

//
const laptop_details = [
  {
    id: "macbookairm2",
    name: "MacBook Air M2",
    price: "₹1,14,990",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/f/j/g/-original-imahfthtkkzyazkf.jpeg?q=70&crop=false",
    prices: 114990
  },
  {
    id: "legion5pro",
    name: "Lenovo Legion 5 Pro",
    price: "₹1,49,990",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/z/b/6/-original-imahfkh3ezughhh4.jpeg?q=70&crop=false",
    prices: 149990
  },
  {
    id: "vivobook15",
    name: "ASUS Vivobook 15",
    price: "₹49,990",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/m/q/v/-original-imahguacfehnaqvd.jpeg?q=70&crop=false",
    prices: 49990
  },
  {
    id: "hp15s",
    name: "HP 15s Ryzen 5",
    price: "₹46,990",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/f/o/u/omnibook-3-ngai-thin-and-light-laptop-hp-original-imahcxyrftbs73tg.jpeg?q=70&crop=false 2x, https://rukminim2.flixcart.com/image/416/416/xif0q/computer/f/o/u/omnibook-3-ngai-thin-and-light-laptop-hp-original-imahcxyrftbs73tg.jpeg?q=70&crop=false 1x",
    prices: 46990
  }
];

const wearable_details = [
  {
    id: "applewatch9",
    name: "Apple Watch Series 9",
    price: "₹41,900",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/7/r/e/45-mr993hn-a-ios-apple-yes-original-imagterzzu4fsrqg.jpeg?q=70&crop=false 2x, https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/7/r/e/45-mr993hn-a-ios-apple-yes-original-imagterzzu4fsrqg.jpeg?q=70&crop=false 1x",
    prices: 41900
  },
  {
    id: "galaxywatch6",
    name: "Samsung Galaxy Watch 6",
    price: "₹29,999",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/z/e/e/-original-imahcn9f7grhgv8s.jpeg?q=70&crop=false 2x, https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/z/e/e/-original-imahcn9f7grhgv8s.jpeg?q=70&crop=false 1x",
    prices: 29999
  },
  {
    id: "noiseultra2",
    name: "Noise ColorFit Ultra 2",
    price: "₹2,999",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/e/g/x/35-306-wrb-sw-twistgo-std-blk-blk-android-ios-noise-yes-original-imah889zcdzvzcuf.jpeg?q=70&crop=false 2x, https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/e/g/x/35-306-wrb-sw-twistgo-std-blk-blk-android-ios-noise-yes-original-imah889zcdzvzcuf.jpeg?q=70&crop=false 1x",
    prices: 2999
  },
  {
    id: "boatxtend",
    name: "boAt Xtend",
    price: "₹1,599",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/screen-guard/screen-guard/8/d/u/xsfsg320-dasiana-original-imagpqx5kjhu6ngg.jpeg?q=70&crop=false 2x, https://rukminim2.flixcart.com/image/416/416/xif0q/screen-guard/screen-guard/8/d/u/xsfsg320-dasiana-original-imagpqx5kjhu6ngg.jpeg?q=70&crop=false 1x",
    prices: 1599
  }
];

const audio_details = [
  {
    id: "airpodspro2",
    name: "AirPods Pro 2",
    price: "₹24,999",
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/s/8/i/airpods-pro-2-2nd-generation-with-passive-noise-cancellation-original-imahf8fjbgaupcwp.jpeg?q=70",
    prices: 24999
  },
  {
    id: "sonywh1000xm5",
    name: "Sony WH-1000XM5",
    price: "₹29,990",
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/v/d/g/-original-imahgr295uvptwq7.jpeg?q=70",
    prices: 29990
  },
  {
    id: "jbltune510",
    name: "JBL Tune 510BT",
    price: "₹3,499",
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/z/n/y/-original-imagugvcse5hgn7b.jpeg?q=70",
    prices: 3499
  },
  {
    id: "boatairdopes181",
    name: "boAt Airdopes 181",
    price: "₹1,099",
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/y/a/f/-original-imahcbyzzq3w6y4f.jpeg?q=70",
    prices: 1099
  }
];

const appliance_details = [
  {
    id: "lgfridge",
    name: "LG 260L Refrigerator",
    price: "₹24,490",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/refrigerator-new/5/w/1/mr60-gb-51-2-2023-16-blue-star-47-44-5-original-imah76cgrdkhghta.jpeg?q=70",
    prices: 24490,
    style: { width: "1px", height: "2px" }
  },
  {
    id: "samsung7kg",
    name: "7kg Washing Machine",
    price: "₹17,990",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/washing-machine-new/x/l/h/-original-imahdz3vpycbsptd.jpeg?q=70",
    prices: 17990
  },
  {
    id: "dysonv8",
    name: "Dyson V8 Vacuum Cleaner",
    price: "₹28,900",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/vacuum-cleaner/c/t/d/-original-imagzjdp6zg37ywu.jpeg?q=70",
    prices: 28900
  },
  {
    id: "philipsairfryer",
    name: "Philips Air Fryer",
    price: "₹8,999",
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/air-fryer/y/n/y/black-4-2-1500-na120-00-philips-original-imahf3xdcpgtmzb8.jpeg?q=70",
    prices: 8999
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
              return <Items key={ele.id} id={ele.id} prices={ele.prices} name={ele.name} price={ele.price} img={ele.img}/>;
            })}
          </div>
      </div>

      <div className="items_container">
          <h1>Laptops</h1>
          <div className="boxes">
            {laptop_details.map(function(ele) {
              return <Items key={ele.id} id={ele.id} prices={ele.prices} name={ele.name} price={ele.price} img={ele.img}/>;
            })}
          </div>
      </div>

      <div className="items_container">
          <h1>Smartwatches</h1>
          <div className="boxes">
            {wearable_details.map(function(ele) {
              return <Items key={ele.id} id={ele.id} prices={ele.prices} name={ele.name} price={ele.price} img={ele.img}/>;
            })}
          </div>
      </div>

      <div className="items_container">
          <h1>Audio Products</h1>
          <div className="boxes">
            {audio_details.map(function(ele) {
              return <Items key={ele.id} id={ele.id} prices={ele.prices} name={ele.name} price={ele.price} img={ele.img}/>;
            })}
          </div>
      </div>

      <div className="items_container">
          <h1>Smart-Home Devices</h1>
          <div className="boxes">
            {appliance_details.map(function(ele) {
              return <Items key={ele.id} id={ele.id} prices={ele.prices} name={ele.name} price={ele.price} img={ele.img}/>;
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