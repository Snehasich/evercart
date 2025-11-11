import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Items from "./Items.jsx";

// ✅ Combine all product details in one place
const allProducts = [
// Mobiles & Tablets
{
id: "iphone15pro",
name: "iPhone 15 Pro",
price: "₹1,00,000",
img: "[https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/p/b/q/-original-imahggex2ye98xfn.jpeg?q=70&crop=false](https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/p/b/q/-original-imahggex2ye98xfn.jpeg?q=70&crop=false)",
},
{
id: "s24ultra",
name: "Samsung Galaxy S24 Ultra",
price: "₹1,29,999",
img: "[https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=70](https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=70)",
},
{
id: "ipadairm2",
name: "iPad Air (M2)",
price: "₹59,900",
img: "[https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/w/p/r/-original-imahyp6gugx6vzqn.jpeg?q=70](https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/w/p/r/-original-imahyp6gugx6vzqn.jpeg?q=70)",
},
{
id: "tabs9",
name: "Samsung Galaxy Tab S9",
price: "₹72,999",
img: "[https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/n/o/f/-original-imah69ytcerzgckb.jpeg?q=70](https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/n/o/f/-original-imah69ytcerzgckb.jpeg?q=70)",
},


// Laptops
{
  id: "macbookairm2",
  name: "MacBook Air M2",
  price: "₹1,14,990",
  img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/f/j/g/-original-imahfthtkkzyazkf.jpeg?q=70&crop=false",
},
{
  id: "legion5pro",
  name: "Lenovo Legion 5 Pro",
  price: "₹1,49,990",
  img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/z/b/6/-original-imahfkh3ezughhh4.jpeg?q=70&crop=false",
},
{
  id: "vivobook15",
  name: "ASUS Vivobook 15",
  price: "₹49,990",
  img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/m/q/v/-original-imahguacfehnaqvd.jpeg?q=70&crop=false",
},
{
  id: "hp15s",
  name: "HP 15s Ryzen 5",
  price: "₹46,990",
  img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/f/o/u/omnibook-3-ngai-thin-and-light-laptop-hp-original-imahcxyrftbs73tg.jpeg?q=70&crop=false",
},

// Smartwatches
{
  id: "applewatch9",
  name: "Apple Watch Series 9",
  price: "₹41,900",
  img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/7/r/e/45-mr993hn-a-ios-apple-yes-original-imagterzzu4fsrqg.jpeg?q=70&crop=false",
},
{
  id: "galaxywatch6",
  name: "Samsung Galaxy Watch 6",
  price: "₹29,999",
  img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/z/e/e/-original-imahcn9f7grhgv8s.jpeg?q=70&crop=false",
},
{
  id: "noiseultra2",
  name: "Noise ColorFit Ultra 2",
  price: "₹2,999",
  img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/e/g/x/35-306-wrb-sw-twistgo-std-blk-blk-android-ios-noise-yes-original-imah889zcdzvzcuf.jpeg?q=70&crop=false",
},
{
  id: "boatxtend",
  name: "boAt Xtend",
  price: "₹1,599",
  img: "https://rukminim2.flixcart.com/image/832/832/xif0q/screen-guard/screen-guard/8/d/u/xsfsg320-dasiana-original-imagpqx5kjhu6ngg.jpeg?q=70&crop=false",
},

// Audio
{
  id: "airpodspro2",
  name: "AirPods Pro 2",
  price: "₹24,999",
  img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/s/8/i/airpods-pro-2-2nd-generation-with-passive-noise-cancellation-original-imahf8fjbgaupcwp.jpeg?q=70",
},
{
  id: "sonywh1000xm5",
  name: "Sony WH-1000XM5",
  price: "₹29,990",
  img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/v/d/g/-original-imahgr295uvptwq7.jpeg?q=70",
},
{
  id: "jbltune510",
  name: "JBL Tune 510BT",
  price: "₹3,499",
  img: "https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/z/n/y/-original-imagugvcse5hgn7b.jpeg?q=70",
},
{
  id: "boatairdopes181",
  name: "boAt Airdopes 181",
  price: "₹1,099",
  img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/y/a/f/-original-imahcbyzzq3w6y4f.jpeg?q=70",
},

// Appliances
{
  id: "lgfridge",
  name: "LG 260L Refrigerator",
  price: "₹24,490",
  img: "https://rukminim2.flixcart.com/image/312/312/xif0q/refrigerator-new/5/w/1/mr60-gb-51-2-2023-16-blue-star-47-44-5-original-imah76cgrdkhghta.jpeg?q=70",
},
{
  id: "samsung7kg",
  name: "7kg Washing Machine",
  price: "₹17,990",
  img: "https://rukminim2.flixcart.com/image/312/312/xif0q/washing-machine-new/x/l/h/-original-imahdz3vpycbsptd.jpeg?q=70",
},
{
  id: "dysonv8",
  name: "Dyson V8 Vacuum Cleaner",
  price: "₹28,900",
  img: "https://rukminim2.flixcart.com/image/312/312/xif0q/vacuum-cleaner/c/t/d/-original-imagzjdp6zg37ywu.jpeg?q=70",
},
{
  id: "philipsairfryer",
  name: "Philips Air Fryer",
  price: "₹8,999",
  img: "https://rukminim2.flixcart.com/image/612/612/xif0q/air-fryer/y/n/y/black-4-2-1500-na120-00-philips-original-imahf3xdcpgtmzb8.jpeg?q=70",
},


];

const Navbar = ({ handleAddToCart }) => {
  const location = useLocation();
  // prefer products passed via navigation state, otherwise use bundled list
  const passedProducts = location.state && location.state.products ? location.state.products : null;
  const productList = passedProducts || allProducts;

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  // If Main navigated here with a query, perform initial search
  useEffect(() => {
    const initialQ = location.state && location.state.q ? String(location.state.q).trim() : "";
    if (initialQ) {
      setQuery(initialQ);
      const qLower = initialQ.toLowerCase();
      const results = productList.filter((item) =>
        item.name.toLowerCase().includes(qLower)
      );
      setFiltered(results);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]); // re-run when route state changes

  // live search on input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    const val = value.trim().toLowerCase();
    if (val === "") {
      setFiltered([]);
    } else {
      const results = productList.filter((item) =>
        item.name.toLowerCase().includes(val)
      );
      setFiltered(results);
    }
  };

  // support Enter as submit (keeps same behavior as typing)
  const handleSubmit = (e) => {
    e.preventDefault();
    const val = query.trim().toLowerCase();
    if (val === "") {
      setFiltered([]);
      return;
    }
    const results = productList.filter((item) =>
      item.name.toLowerCase().includes(val)
    );
    setFiltered(results);
  };

  return (
    <div>
      <nav
        className="navbar"
        style={{
          background: "#222",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={handleSearch}
            style={{
              width: "320px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #aaa",
              outline: "none",
            }}
          />
        </form>
      </nav>

      {/* 🧾 Show search results or "no results" when query is present */}
      {query.trim() !== "" && (
        <div style={{ padding: "20px" }}>
          <h3>Search Results{filtered.length === 0 ? " — No results found" : ""}</h3>

          {filtered.length > 0 ? (
            <div
              className="boxes"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginTop: "15px",
              }}
            >
              {filtered.map((item) => (
                <Items
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  img={item.img}
                  prices={item.prices}
                />
              ))}
            </div>
          ) : (
            <p style={{ marginTop: "12px", color: "#666" }}>
              No products found for "{query}". Try different keywords.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
