import React, { useState } from "react";

import "./loginPage.css";
import { useUser } from "../../context/userContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>spinner</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">
            <b>Email</b>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="button" type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
