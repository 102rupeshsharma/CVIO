import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader"; 
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true); 

      fetch(process.env.REACT_APP_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          setLoading(false); 
          if (!response.ok) {
            throw new Error("Login failed!");
          }
          return response.json();
        })
        .then((data) => {
          if (data.message === "Login successful") {
            localStorage.setItem("username", data.user.username);
            toast.success("Login successful!");
            navigate("/");
          } else {
            toast.error(data.message || "Login Failed!");
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("User doesn't exist.");
        });
    } else {
      setErrors(validationErrors);
      toast.error("Please fill in all the required fields.");
    }
  };

  return (
    <>
      <div className="login_main_container">
        <div className={loading ? "login_container no_background" : "login_container"}>
          {loading ? (
            <div className="loader">
              <ClipLoader color={"#123abc"} loading={loading} size={50} />
            </div>
          ) : (
            <>
              <div className="login_form">
                <div className="login_heading">Login</div>
                <form onSubmit={onSubmit} className="form">
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="login_input"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="login_input"
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                  </div>
                  <div className="login_btn">
                    <button className="login_submit" disabled={!email || !password}>
                      Login
                    </button>
                  </div>
                </form>
                <div className="login_forgotPassword">
                  <span className="Login_href" href="/forgotPassword">
                    Forgot Password
                  </span>
                </div>
                <div className="login_signinText">
                  <span style={{ color: "black" }}>Don't have an account?</span>
                  <span style={{ margin: "4px" }}>
                    <span
                      className="register"
                      onClick={() =>
                        navigate("/register", { state: { returnUrl: "/" } })
                      }
                    >
                      Sign Up
                    </span>
                  </span>
                </div>
              </div>

              <div className="login_InfoContainer">
                <div className="login_header">
                  <img src="resume.png" alt="Your CV" />
                  <span>Your CV</span>
                </div>
                <div className="login_info">
                  <span>Make a CV to define yourself the right way. Meet </span>
                  <span>thousands of job announcements and employers</span>
                  <span>by the help of your profile with a private extension,</span>
                  <span> which you can share at all social</span>
                  <span>media environments.</span>
                </div>
                <footer className="login_footer">
                  <button
                    className="login_signup"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </footer>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
