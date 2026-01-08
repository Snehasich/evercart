import logo from "./logo.jpg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Items from "./Items.jsx";

function Main() {
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    document.body.classList.toggle("dark", savedMode);

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username") || "";
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate("/SearchBar", { state: { q: query, products: allProducts } });
      setQuery("");
    }
  };

  const toggleMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.toggle("dark", newMode);
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

  /* ================= PRODUCT DATA ================= */

  const mobile_tablet_details = [
    { id: "iphone15pro", name: "iPhone 15 Pro", price: "₹1,00,000", img: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/p/b/q/-original-imahggex2ye98xfn.jpeg?q=70" },
    { id: "s24ultra", name: "Samsung Galaxy S24 Ultra", price: "₹1,29,999", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=70" },
    { id: "ipadairm2", name: "iPad Air (M2)", price: "₹59,900", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/w/p/r/-original-imahyp6gugx6vzqn.jpeg?q=70" },
    { id: "tabs9", name: "Samsung Galaxy Tab S9", price: "₹72,999", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/n/o/f/-original-imah69ytcerzgckb.jpeg?q=70" },
  ];

  const laptop_details = [
    { id: "macbookairm2", name: "MacBook Air M2", price: "₹1,14,990", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/f/j/g/-original-imahfthtkkzyazkf.jpeg?q=70" },
    { id: "legion5pro", name: "Lenovo Legion 5 Pro", price: "₹1,49,990", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/z/b/6/-original-imahfkh3ezughhh4.jpeg?q=70" },
    { id: "vivobook15", name: "ASUS Vivobook 15", price: "₹49,990", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/m/q/v/-original-imahguacfehnaqvd.jpeg?q=70" },
    { id: "hp15s", name: "HP 15s Ryzen 5", price: "₹46,990", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/f/o/u/omnibook-3-ngai-thin-and-light-laptop-hp-original-imahcxyrftbs73tg.jpeg?q=70" },
  ];

  const wearable_details = [
    { id: "applewatch9", name: "Apple Watch Series 9", price: "₹41,900", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/7/r/e/45-mr993hn-a-ios-apple-yes-original-imagterzzu4fsrqg.jpeg?q=70" },
    { id: "galaxywatch6", name: "Samsung Galaxy Watch 6", price: "₹29,999", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/z/e/e/-original-imahcn9f7grhgv8s.jpeg?q=70" },
    { id: "noiseultra2", name: "Noise ColorFit Ultra 2", price: "₹2,999", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/e/g/x/35-306-wrb-sw-twistgo-std-blk-blk-android-ios-noise-yes-original-imah889zcdzvzcuf.jpeg?q=70" },
    { id: "boatxtend", name: "boAt Xtend", price: "₹1,599", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/screen-guard/screen-guard/8/d/u/xsfsg320-dasiana-original-imagpqx5kjhu6ngg.jpeg?q=70" },
  ];

  const audio_details = [
    { id: "airpodspro2", name: "AirPods Pro 2", price: "₹24,999", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/s/8/i/airpods-pro-2-2nd-generation-with-passive-noise-cancellation-original-imahf8fjbgaupcwp.jpeg?q=70" },
    { id: "sonywh1000xm5", name: "Sony WH-1000XM5", price: "₹29,990", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/v/d/g/-original-imahgr295uvptwq7.jpeg?q=70" },
    { id: "jbltune510", name: "JBL Tune 510BT", price: "₹3,499", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/z/n/y/-original-imagugvcse5hgn7b.jpeg?q=70" },
    { id: "boatairdopes181", name: "boAt Airdopes 181", price: "₹1,099", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/y/a/f/-original-imahcbyzzq3w6y4f.jpeg?q=70" },
  ];

  const appliance_details = [
    { id: "lgfridge", name: "LG 260L Refrigerator", price: "₹24,490", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/refrigerator-new/5/w/1/mr60-gb-51-2-2023-16-blue-star-47-44-5-original-imah76cgrdkhghta.jpeg?q=70" },
    { id: "samsung7kg", name: "7kg Washing Machine", price: "₹17,990", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/washing-machine-new/x/l/h/-original-imahdz3vpycbsptd.jpeg?q=70" },
    { id: "dysonv8", name: "Dyson V8 Vacuum Cleaner", price: "₹28,900", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/vacuum-cleaner/c/t/d/-original-imagzjdp6zg37ywu.jpeg?q=70" },
    { id: "philipsairfryer", name: "Philips Air Fryer", price: "₹8,999", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/air-fryer/y/n/y/black-4-2-1500-na120-00-philips-original-imahf3xdcpgtmzb8.jpeg?q=70" },
  ];

  const allProducts = [
    ...mobile_tablet_details,
    ...laptop_details,
    ...wearable_details,
    ...audio_details,
    ...appliance_details,
  ];

  return (
    <div className="bg-white dark:bg-[#121212] text-black dark:text-white">

      {/* HEADER */}
      <header className="flex justify-between items-center px-5 py-3 bg-blue-500 dark:bg-[#1e1e1e] text-[15px] font-semibold">
        <img src={logo} alt="Evercart" className="w-[70px] rounded-2xl" />

        <form onSubmit={handleSearch} className="flex items-center max-w-[470px] flex-grow bg-gray-100 dark:bg-[#333] rounded-xl px-3 py-1">
          <i className="fa-solid fa-magnifying-glass text-gray-500" />
          <input className="w-full bg-transparent outline-none ml-2 text-sm" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" />
        </form>

        <div className="flex items-center gap-10">
          {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}
          <Link to="/cart">Cart</Link>
          <button onClick={toggleMode} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      {/* PRODUCT SECTIONS */}
      {[
        ["Mobiles and Tablets", mobile_tablet_details],
        ["Laptops", laptop_details],
        ["Smartwatches", wearable_details],
        ["Audio Products", audio_details],
        ["Smart-Home Devices", appliance_details],
      ].map(([title, data]) => (
        <section key={title} className="w-[95%] max-w-[1200px] mx-auto my-12 bg-[hsla(0,44%,34%,0.185)] rounded-3xl py-6">
          <h1 className="ml-8 mb-4 text-xl font-semibold">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
            {data.map((item) => <Items key={item.id} {...item} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Main;
