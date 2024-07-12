import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useState } from "react";

const SignIn = () => {
  const { userSignin } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    let validation = true;
    if (validation) {
      userSignin({ email, password });
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
          <h3>Sign in or create account</h3>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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
