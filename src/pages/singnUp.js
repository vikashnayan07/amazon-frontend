// SignUp.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});

  const validate = async () => {
    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const success = await signUp({ email, password, name, mobile });
      if (success) {
        toast.success("User created successfully!");
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      }
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
              {errors.mobile && <div className="error">{errors.mobile}</div>}
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
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password (at least 6 characters)</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
              <span>Passwords must be at least 6 characters.</span>
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
              By creating an account or logging in, you agree to Amazon’s
              Conditions of Use and Privacy Policy.
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
      <ToastContainer />
    </>
  );
};

export default SignUp;
