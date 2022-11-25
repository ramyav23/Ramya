import { useState } from "react";
import "./Login.css";
const Login = ({ users, setCurrentStatus }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isError, setError] = useState(false);

  const loginHandler = () => {
    let isLogin = users.some((user) => {
      console.log(
        user.email,
        loginData.email,
        user.password,
        loginData.password
      );
      return (
        user.email === loginData.email && user.password === loginData.password
      );
    });
    if (isLogin) {
      setError(false);
      setCurrentStatus("home");
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <section className="login" id="login">
        <div className="head">
          <h1 className="company">Login</h1>
        </div>

        <div className="form">
          <input
            type="text"
            placeholder="Email"
            className="text"
            required
            name="email"
            value={loginData.email}
            onChange={(e) => {
              setLoginData((prevState) => ({
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
            value={loginData.value}
            onChange={(e) => {
              setLoginData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <br />
          <button className="btn-login" onClick={loginHandler}>
            Login
          </button>
          <button
            className="btn-login"
            onClick={() => {
              setCurrentStatus("signup");
            }}
          >
            Sign up
          </button>
          <br />
          <div style={{ marginTop: "15px" }}>
            {isError && (
              <p style={{ color: "red" }}>
                Email / Password details are incorrect
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
