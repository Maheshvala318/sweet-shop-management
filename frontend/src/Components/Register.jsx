import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import axios from "axios";
import { useValid } from "../ContextApi/ValidContext";
import Alert from "react-bootstrap/Alert";
import Button1 from "react-bootstrap/Button";

const Wrapper = styled.section`
  .main {
    height: 100vh;
    background: linear-gradient(60deg, red, #59d5e0, pink);
  }

  .signup-btn {
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
  fullname: "",
  email: "",
  password: "",
  cpassword: "",
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

const Register = () => {
  const { updateShowNav, updateData, updateStatus } = useValid();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (location.pathname === "/register") {
      updateShowNav("login");
    }
  }, []);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "inputEvent", payload: { name, value } });
  };

  const postRegisterData = async (event) => {
  event.preventDefault();

  if (state.password !== state.cpassword) {
    setShow(true);
    setMsg("Password and Confirm Password must be same");
    return;
  }

  const formField = {
    name: state.fullname,
    email: state.email,
    password: state.password,
  };

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/register/", formField);
    updateData(res.data);
    setShow(true);
    setMsg("Registered Successfully");
  } catch (err) {
    console.error("Backend Error:", err.response?.data);
    
    // Check for email already exists error - updated this part
    if (err.response?.data?.email?.[0]?.includes('already exists')) {
      setShow(true);
      setMsg("This email is already registered. Please use a different email or login.");
    } 
    // Handle other 400 errors
    else if (err.response?.status === 400) {
      setShow(true);
      setMsg("Invalid registration data. Please check your inputs.");
    } 
    // Handle other errors
    else {
      setShow(true);
      setMsg("Something went wrong. Please try again later.");
    }
  }
};

  return (
    <>
      <Wrapper>
        <div className="container-fluid d-flex justify-content-center align-items-center flex-column main">
          <div className="border shadow rounded p-3 px-5 bg-light inner-div">
            <h3 className="text-center my-2">Welcome</h3>
            <form onSubmit={postRegisterData} className="form-group d-flex flex-column row-gap-2">
              <label>Fullname:</label>
              <input
                className="form-control"
                type="text"
                name="fullname"
                value={state.fullname}
                onChange={inputEvent}
                required
              />
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
              <label>Confirm Password:</label>
              <input
                className="form-control"
                type="password"
                name="cpassword"
                value={state.cpassword}
                onChange={inputEvent}
                required
              />
              <Button type="submit" className="w-100 signup-btn">
                Sign Up
              </Button>
              <p className="form-text">
                Already have an Account? <Link to="/login">Login</Link>
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
          {msg === "Register Successfully" && (
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
                updateData({ name: state.fullname, email: state.email });
                msg === "Register Successfully" && navigate("/login");
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

export default Register;
