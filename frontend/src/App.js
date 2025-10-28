import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Cart from './Cart.jsx';
import InsideItems from "./Inside_items.jsx"; // ✅ FIXED: Renamed import
import './App.css';

function App() {
  const loggedInUsername = "testUser"; // Replace with actual logged-in user

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart username={loggedInUsername} />} />
        <Route path="/item/:id" element={<InsideItems username={loggedInUsername} />} />
      </Routes>
    </Router>
  );
}

export default App;