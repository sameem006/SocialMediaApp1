import { useState } from "react";
import "./login.css";

const Login = () => {
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");

      const handleSubmit = (e) => {
            e.preventDefault();

            // Backend connection will be added later
            console.log("Username:", username);
            console.log("Password:", password);
      };

      return (
            <main className="Login">
                  <div className="loginContainer">
                        <div className="loginHeader">
                              <h1>Welcome Back</h1>
                              <p>Login to your account</p>
                        </div>

                        <form className="loginForm" onSubmit={handleSubmit}>
                              <label htmlFor="username">Username</label>
                              <input id="username" type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                              <label htmlFor="password">Password</label>
                              <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                              <button type="submit">Login</button>
                        </form>

                        <p className="signupText">
                              Don't have an account? <a href="/signup">Sign up</a>
                        </p>
                  </div>
            </main>
      );
};

export default Login;
