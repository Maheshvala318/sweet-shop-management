import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import axios from "axios";
import { useValid } from "../ContextApi/ValidContext";
import Alert from "react-bootstrap/Alert";
import { FiUser, FiMail, FiLock, FiLogIn } from "react-icons/fi";

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff9e6;
  padding: 20px;

  .register-container {
    width: 100%;
    max-width: 450px;
    background: white;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 15px 35px rgba(124, 63, 29, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid rgba(124, 63, 29, 0.1);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 18px 40px rgba(124, 63, 29, 0.15);
    }
  }

  .register-header {
    text-align: center;
    margin-bottom: 40px;
    
    h2 {
      color: #7C3F1D;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 10px;
      font-family: 'Playfair Display', serif;
    }
    
    p {
      color: #7C3F1D;
      opacity: 0.8;
      font-size: 0.95rem;
    }
  }

  .form-group {
    margin-bottom: 25px;
    
    label {
      display: block;
      margin-bottom: 8px;
      color: #7C3F1D;
      font-weight: 500;
      font-size: 0.95rem;
    }
    
    .input-wrapper {
      position: relative;
      
      svg {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #7C3F1D;
        opacity: 0.6;
      }
    }
    
    input {
      width: 100%;
      padding: 12px 15px 12px 45px;
      border: 1px solid rgba(124, 63, 29, 0.2);
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background-color: #fffce8;
      color: #5c2c06;
      
      &:focus {
        outline: none;
        border-color: #FF7F2A;
        box-shadow: 0 0 0 3px rgba(255, 127, 42, 0.1);
        background-color: white;
      }
    }
  }

  .register-btn {
    width: 100%;
    padding: 14px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 30px;
    background: linear-gradient(to right, #FF7F2A, #FFBF78);
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    
    &:hover {
      background: linear-gradient(to right, #FF6F1A, #FFAF68);
      transform: translateY(-2px);
      box-shadow: 0 7px 14px rgba(255, 127, 42, 0.2);
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  .links-container {
    margin-top: 30px;
    text-align: center;
    font-size: 0.9rem;
    color: #7C3F1D;
    
    a {
      color: #FF7F2A;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
      
      &:hover {
        color: #FF6F1A;
        text-decoration: underline;
      }
    }
  }

  .alert-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    min-width: 300px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(124, 63, 29, 0.2);
  }

  .password-match {
    font-size: 0.8rem;
    margin-top: 5px;
    color: ${props => props.match ? '#34eb40' : '#eb4034'};
    display: flex;
    align-items: center;
    gap: 5px;
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
      setMsg("Password and Confirm Password must match");
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
      setMsg("Registration Successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Backend Error:", err.response?.data);
      
      if (err.response?.data?.email?.[0]?.includes('already exists')) {
        setShow(true);
        setMsg("This email is already registered. Please use a different email or login.");
      } else if (err.response?.status === 400) {
        setShow(true);
        setMsg("Invalid registration data. Please check your inputs.");
      } else {
        setShow(true);
        setMsg("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <Wrapper match={state.password === state.cpassword && state.password !== ""}>
      <div className="register-container">
        <div className="register-header">
          <h2>Create Your Account</h2>
          <p>Join our sweet community today</p>
        </div>
        
        <form onSubmit={postRegisterData}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <FiUser />
              <input
                type="text"
                name="fullname"
                value={state.fullname}
                onChange={inputEvent}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <FiMail />
              <input
                type="email"
                name="email"
                value={state.email}
                onChange={inputEvent}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FiLock />
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={inputEvent}
                placeholder="Create a password"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <FiLock />
              <input
                type="password"
                name="cpassword"
                value={state.cpassword}
                onChange={inputEvent}
                placeholder="Confirm your password"
                required
              />
            </div>
            {state.password && state.cpassword && (
              <div className="password-match">
                {state.password === state.cpassword ? (
                  <>
                    <span>✓</span> Passwords match
                  </>
                ) : (
                  <>
                    <span>✗</span> Passwords don't match
                  </>
                )}
              </div>
            )}
          </div>
          
          <button type="submit" className="register-btn">
            <FiLogIn /> Sign Up
          </button>
        </form>
        
        <div className="links-container">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
      
      {show && (
        <div className="alert-container">
          <Alert
            variant={msg.includes("Successful") ? "success" : "danger"}
            onClose={() => setShow(false)}
            dismissible
          >
            <Alert.Heading>
              {msg.includes("Successful") ? "Sweet Success!" : "Registration Issue"}
            </Alert.Heading>
            <p>{msg}</p>
          </Alert>
        </div>
      )}
    </Wrapper>
  );
};

export default Register;