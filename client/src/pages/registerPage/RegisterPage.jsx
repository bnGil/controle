import React, { useState } from "react";
import JobsSpinner from "../../components/spinner/JobsSpinner";
import { useUser } from "../../context/userContext";

import "./registerPage.css";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { register } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newUser = { firstName, lastName, email, password };
      await register(newUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <JobsSpinner isShown={loading} />;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="registerPage-container">
      <h1>Sign Up</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">
            <b>First Name</b>
          </label>
          <input
            type="text"
            id="fname"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="lname">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            id="lname"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
