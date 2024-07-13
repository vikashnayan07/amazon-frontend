import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useState } from "react";

const SignIn = () => {
  const { userSignin } = useLogin();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrMobileError, setEmailOrMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(mobile));
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validate = () => {
    let isValid = true;

    if (!validateEmail(emailOrMobile) && !validateMobile(emailOrMobile)) {
      setEmailOrMobileError(
        "Please enter a valid email or 10-digit mobile number."
      );
      isValid = false;
    } else {
      setEmailOrMobileError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      const payload = validateEmail(emailOrMobile)
        ? { email: emailOrMobile, password }
        : { mobile: emailOrMobile, password };
      userSignin(payload);
    } else {
      setGeneralError(
        "Invalid input. Please correct the errors and try again."
      );
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
          <h3>Sign in or create account</h3>
          <div className="customer-link">
            No account? Create one!{" "}
            <Link to="/signup" className="signin-link">
              {" "}
              Signup
            </Link>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              validate();
            }}
          >
            <div className="input-group">
              <label>Enter mobile number or email</label>
              <div className="input-mobile">
                {" "}
                <input
                  type="text"
                  name="username"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                />
              </div>
              {emailOrMobileError && (
                <div className="error-message">{emailOrMobileError}</div>
              )}
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
            </div>
            {generalError && (
              <div className="error-message">{generalError}</div>
            )}
            <button className="signup-button" type="submit">
              Continue
            </button>
          </form>
          <div className="term-condition">
            <span>
              {" "}
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice.
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

export default SignIn;
