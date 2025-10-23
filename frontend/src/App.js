import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Cart from './Cart.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ItemDetail from './ItemDetail.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<ProtectedRoute> <Cart/> </ProtectedRoute>} />
        <Route path='/item-detail' element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}

export default App;