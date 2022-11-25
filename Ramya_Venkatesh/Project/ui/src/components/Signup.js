import { useState } from "react";
import "./Login.css";
const Signup = ({ signupHandle, setCurrentStatus }) => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const signupHandler = () => {
    signupHandle(signUpData);
  };
  return (
    <>
      <div className="login-container">
        <section className="login" id="login">
          <div className="head">
            <h1 className="company">Sign up</h1>
          </div>

          <div className="form">
            <input
              type="text"
              placeholder="Username"
              className="text"
              required
              name="name"
              value={signUpData.name}
              onChange={(e) => {
                setSignUpData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Email"
              className="text"
              required
              name="email"
              value={signUpData.email}
              onChange={(e) => {
                setSignUpData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              className="password"
              name="password"
              value={signUpData.value}
              onChange={(e) => {
                setSignUpData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
            />

            <button className="btn-login" id="do-login" onClick={signupHandler}>
              Sign up
            </button>
            <button
              className="btn-login"
              onClick={() => {
                setCurrentStatus("login");
              }}
            >
              Login
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
export default Signup;
