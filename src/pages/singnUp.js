import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const { signUp } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleEmail = (e) => {
    const val = e.target.value;
    setEmail(val);
  };
  const handlePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
  };

  const validate = () => {
    let validation = true;
    if (validation) {
      signUp({ email, password, name, mobile });
    } else {
      alert("invalid user");
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="amazon-logo">
          <img
            src="https://cdn.logojoy.com/wp-content/uploads/20230629132639/current-logo-600x338.png"
            alt="Amazon Logo"
          />
        </div>

        <div className="signup-box">
          <h2>Create Account</h2>
          <div className="customer-link">
            Already a customer?{" "}
            <Link to="/signin" className="signin-link">
              {" "}
              Sign in
            </Link>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validate();
            }}
          >
            <div className="input-group">
              <label>Mobile number</label>
              <div className="input-mobile">
                {" "}
                <select className="option-mobile">
                  <option>IN +91</option>
                </select>
                <input
                  type="text"
                  placeholder="Mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label>Your name</label>
              <input
                type="text"
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={handleEmail}
                placeholder="First and last name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password (at least 6 characters)</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                placeholder="Password"
              />
              <span> Passwords must be at least 6 characters.</span>
              <p>
                To verify your number, we will send you a text message with a
                temporary code. Message and data rates may apply.
              </p>
            </div>

            <button className="signup-button" type="submit">
              Verify your mobile number
            </button>
          </form>
          <div className="term-condition">
            <span>
              {" "}
              By creating an account or logging in, you agree to Amazon’s
              Conditions of Use and Privacy-Policy .
            </span>
          </div>
        </div>
      </div>
      <footer className="footer">
        <ul>
          <li>
            <Link to="/privacy">Condition of use</Link>
          </li>
          <li>
            <Link to="/help">Privacy Notice</Link>
          </li>
          <li>
            <Link to="/contact">Help</Link>
          </li>
        </ul>
        <span>© 1996-2024, Amazon.com, Inc. or its affiliates</span>
      </footer>
    </>
  );
};

export default SignUp;
