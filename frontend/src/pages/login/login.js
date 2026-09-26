import { useState } from "react";
import "./login.css";
import api from "../../api/posts";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const { setIsLoggedIn, setCurrentUser } = useContext(DataContext);
      const [error, setError] = useState("");
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                  const response = await api.post("/auth/login", {
                        email,
                        password,
                  });

                  setIsLoggedIn(true);
                  setCurrentUser(response.data);
                  navigate("/");
            } catch (error) {
                  //console.log("LOGIN ERROR:", error);
                  console.log("Response:", error.response?.data);
                  //console.log("Message:", error.message);
                  setError(error.response?.data?.message || "Invalid email or password");
            }
      };

      return (
            <main className="Login">
                  <div className="loginContainer">
                        <div className="loginHeader">
                              <h1>Welcome Back</h1>
                              <p>Login to your account</p>
                        </div>

                        <form className="loginForm" onSubmit={handleSubmit}>
                              <label htmlFor="email">Email</label>
                              <input id="email" type="text" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                              <label htmlFor="password">Password</label>
                              <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                              <button type="submit">Login</button>
                        </form>

                        <p className="signupText">
                              Don't have an account? <a href="/signup">Sign up</a>
                        </p>
                        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
                  </div>
            </main>
      );
};

export default Login;
