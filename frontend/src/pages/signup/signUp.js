import { useState } from "react";
import "./signUp.css";

const Signup = () => {
      const [username, setUsername] = useState("");
      const [fullName, setFullName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const handleSubmit = (e) => {
            e.preventDefault();

            console.log({
                  username,
                  fullName,
                  email,
                  password,
            });
      };

      return (
            <main className="Signup">
                  <div className="signupContainer">
                        <div className="signupHeader">
                              <h1>Create Account</h1>
                              <p>Sign up to get started</p>
                        </div>

                        <form className="signupForm" onSubmit={handleSubmit}>
                              <label htmlFor="username">Username</label>
                              <input id="username" type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                              <label htmlFor="fullName">Full Name</label>
                              <input id="fullName" type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />

                              <label htmlFor="email">Email</label>
                              <input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                              <label htmlFor="password">Password</label>
                              <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                              <button type="submit">Sign Up</button>
                        </form>

                        <p className="loginText">
                              Already have an account? <a href="/login">Login</a>
                        </p>
                  </div>
            </main>
      );
};

export default Signup;
