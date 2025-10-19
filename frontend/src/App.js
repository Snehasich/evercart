import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Cart from './Cart.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<ProtectedRoute> <Cart/> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;