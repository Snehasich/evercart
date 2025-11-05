import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Cart from './Cart.jsx';
import Checkout from './checkout.jsx';
import InsideItems from "./Inside_items.jsx"; // ✅ FIXED: Renamed import
import SearchResults from './SearchBar.jsx';
import './App.css';



function App() {
  const loggedInUsername = "testUser"; // Replace with actual logged-in user

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout/>}/>
        {/* ✅ FIXED: Renamed component tag */}
        <Route path="/item/:id" element={<InsideItems  />} />
        <Route path="/SearchBar" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;