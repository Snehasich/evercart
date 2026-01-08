import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Items from "./Items.jsx";

/* ================= ALL PRODUCTS ================= */
const allProducts = [
  { id: "iphone15pro", name: "iPhone 15 Pro", price: "₹1,00,000", img: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/p/b/q/-original-imahggex2ye98xfn.jpeg?q=70&crop=false" },
  { id: "s24ultra", name: "Samsung Galaxy S24 Ultra", price: "₹1,29,999", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=70" },
  { id: "ipadairm2", name: "iPad Air (M2)", price: "₹59,900", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/w/p/r/-original-imahyp6gugx6vzqn.jpeg?q=70" },
  { id: "tabs9", name: "Samsung Galaxy Tab S9", price: "₹72,999", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/n/o/f/-original-imah69ytcerzgckb.jpeg?q=70" },

  { id: "macbookairm2", name: "MacBook Air M2", price: "₹1,14,990", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/f/j/g/-original-imahfthtkkzyazkf.jpeg?q=70&crop=false" },
  { id: "legion5pro", name: "Lenovo Legion 5 Pro", price: "₹1,49,990", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/z/b/6/-original-imahfkh3ezughhh4.jpeg?q=70&crop=false" },

  { id: "applewatch9", name: "Apple Watch Series 9", price: "₹41,900", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/7/r/e/45-mr993hn-a-ios-apple-yes-original-imagterzzu4fsrqg.jpeg?q=70" },
  { id: "galaxywatch6", name: "Samsung Galaxy Watch 6", price: "₹29,999", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/z/e/e/-original-imahcn9f7grhgv8s.jpeg?q=70" },

  { id: "airpodspro2", name: "AirPods Pro 2", price: "₹24,999", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/s/8/i/airpods-pro-2-2nd-generation-with-passive-noise-cancellation-original-imahf8fjbgaupcwp.jpeg?q=70" },
  { id: "sonywh1000xm5", name: "Sony WH-1000XM5", price: "₹29,990", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/v/d/g/-original-imahgr295uvptwq7.jpeg?q=70" },

  { id: "lgfridge", name: "LG 260L Refrigerator", price: "₹24,490", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/refrigerator-new/5/w/1/mr60-gb-51-2-2023-16-blue-star-47-44-5-original-imah76cgrdkhghta.jpeg?q=70" },
  { id: "philipsairfryer", name: "Philips Air Fryer", price: "₹8,999", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/air-fryer/y/n/y/black-4-2-1500-na120-00-philips-original-imahf3xdcpgtmzb8.jpeg?q=70" },
];

/* ================= COMPONENT ================= */
const Navbar = () => {
  const location = useLocation();
  const passedProducts = location.state?.products || null;
  const productList = passedProducts || allProducts;

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const initialQ = location.state?.q?.trim() || "";
    if (initialQ) {
      setQuery(initialQ);
      setFiltered(
        productList.filter(p =>
          p.name.toLowerCase().includes(initialQ.toLowerCase())
        )
      );
    }
  }, [location, productList]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setFiltered([]);
    } else {
      setFiltered(
        productList.filter(p =>
          p.name.toLowerCase().includes(val.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <nav className="bg-[#222] py-4 flex justify-center">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleSearch}
          className="w-[320px] px-3 py-2 rounded-md border
            outline-none focus:ring-2 focus:ring-blue-500"
        />
      </nav>

      {/* Results */}
      {query.trim() && (
        <div className="p-6">
          <h3 className="text-lg font-semibold">
            Search Results
            {filtered.length === 0 && " — No results found"}
          </h3>

          {filtered.length > 0 ? (
            <div className="flex flex-wrap gap-5 mt-4">
              {filtered.map(item => (
                <Items key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <p className="mt-3 text-gray-600">
              No products found for "{query}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
