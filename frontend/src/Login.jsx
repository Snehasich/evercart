import React, { useState } from "react"; 
import axios from "axios"; 

// The API base path defined in your Spring Boot AuthController
const API_BASE_URL = "/api/auth"; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); 
  const [loading, setLoading] = useState(false); 

  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  // 🟢 Handle Login (API Call)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });

      // Store login state and username
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username); // backend returns username

      alert(`Login successful! Welcome, ${username}`);
      window.location.href = "/"; // redirect to main page

    } catch (error) {
      const message = error.response?.data || "Login failed!";
      alert(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };



  // 🟣 Handle Sign-Up (API Call)
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // POST request to Spring Boot registration endpoint
      const response = await axios.post(`${API_BASE_URL}/register`, {
        username: username,
        password: password,
      });

      // Assuming Spring Boot returns 201 CREATED and a success message
      alert(`🎉 ${response.data} Please log in now.`);
      
      resetForm();
      setIsLogin(true); // switch back to login view

    } catch (error) {
      // Handle server response errors (e.g., 409 Conflict for username already taken)
      const message = error.response?.data || "Registration failed. Try again!";
      alert(`⚠️ ${message}`);
      
    } finally {
      setLoading(false);
    }
  };

  // ================== UI ==================
  return (
    <div className="Login">
      {isLogin ? (
        // ---------------- LOGIN FORM ----------------
        <form className="login-all" onSubmit={handleLogin}>
          <h1>Login</h1>

          <div className="username">
            <h4>Username</h4>
            <input
              type="text"
              placeholder="Enter your username"
              className="u log"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="password">
            <h4>Password</h4>
            <input
              type="password"
              placeholder="Enter your password"
              className="p log"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'} {/* Disable button during API call */}
          </button>
          
          <p>
            Don’t have an account?{" "}
            <a
              href="#!" // CORRECTED: Fixes accessibility warning
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor navigation
                setIsLogin(false);
                resetForm();
              }}
            >
              Sign Up
            </a>
          </p>
        </form>
      ) : (
        // ---------------- SIGN-UP FORM ----------------
        <form className="login-all" onSubmit={handleSignUp}>
          <h1>Sign Up</h1>

          <div className="username">
            <h4>Username</h4>
            <input
              type="text"
              placeholder="Create username"
              className="u log"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="password">
            <h4>Password</h4>
            <input
              type="password"
              placeholder="Create password"
              className="p log"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'} {/* Disable button during API call */}
          </button>

          <p>
            Already have an account?{" "}
            <a
              href="#!" // CORRECTED: Fixes accessibility warning
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor navigation
                setIsLogin(true);
                resetForm();
              }}
            >
              Log In
            </a>
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;
