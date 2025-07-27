import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button1 from "react-bootstrap/Button";
import { useValid } from "../ContextApi/ValidContext";

const Wrapper = styled.section`
  .main {
    height: 100vh;
    background: linear-gradient(60deg, red, #59d5e0, pink);
  }

  .login-btn {
    background: linear-gradient(60deg, #eb4034, #34a1eb, #34eb40);
    &:hover {
      color: white;
      border: 1px solid white;
    }
  }

  .inner-div {
    width: 400px;
    height: 70%;
  }
`;

const initialState = {
  email: "",
  password: "",
};

const reducer = (state, action) => {
  if (action.type === "inputEvent") {
    const { name, value } = action.payload;
    return {
      ...state,
      [name]: value,
    };
  }
  return state;
};

const Login = () => {
  const { updateStatus, updateShowNav, updateData } = useValid();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (location.pathname === "/login") {
      updateShowNav("login");
    }
  }, []);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "inputEvent", payload: { name, value } });
  };

  const postLoginData = async (event) => {
  event.preventDefault();

  const formData = {
    email: state.email,
    password: state.password,
  };

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/login/",
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log("Login API Response:", res.data);

    if (res.data && res.data.msg === 'Login successful') {
      // Update context with available data (user_id and email from form)
      updateData({
        id: res.data.user_id,
        name: '',              // Will be empty since backend doesn't provide
        email: state.email     // Using email from form state
      });

      setShow(true);
      setMsg(res.data.msg);
      
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      throw new Error(res.data.msg || "Login failed");
    }

  } catch (err) {
    console.error("Login Error:", err);
    setShow(true);
    // Improved error message display
    const errorMsg = err.response?.data?.msg || 
                    err.response?.data?.detail || 
                    err.message || 
                    "Login failed. Please try again.";
    setMsg(errorMsg);
  }
};

  return (
    <>
      <Wrapper>
        <div className="container-fluid d-flex justify-content-center align-items-center flex-column main">
          <div className="border shadow rounded p-3 px-5 bg-light inner-div">
            <h3 className="text-center my-2">Welcome Back</h3>
            <form onSubmit={postLoginData} className="form-group d-flex flex-column row-gap-2">
              <label>Email:</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={state.email}
                onChange={inputEvent}
                required
              />
              <label>Password:</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={state.password}
                onChange={inputEvent}
                required
              />
              <Button type="submit" className="w-100 login-btn">
                Log In
              </Button>
              <p className="form-text">
                Forget Password? <Link to="/forgetpass">Click Here</Link>
              </p>
              <p className="form-text">
                Don't have an Account? <Link to="/register">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </Wrapper>
      {show && (
        <Alert
          variant="primary"
          className="position-absolute top-50 start-50 translate-middle-x px-5"
        >
          {msg === "Login Successfully" && (
            <Alert.Heading>A Success Message!</Alert.Heading>
          )}
          <div className="text-center">{msg}</div>
          <div className="d-flex justify-content-center">
            <Button1
              variant="outline-primary"
              className="mt-2"
              onClick={() => {
                setShow(false);
                updateStatus("login");
                updateShowNav("register");
                if (msg === "Login Successfully") {
                  navigate("/");
                }
              }}
            >
              Close
            </Button1>
          </div>
        </Alert>
      )}
    </>
  );
};

export default Login;