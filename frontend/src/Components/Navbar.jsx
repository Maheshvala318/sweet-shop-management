import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.nav`
  background-color: #7C3F1D; /* Dark Brown */
  color: white;
  padding: 10px 20px;

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav-item {
    cursor: pointer;
    position: relative;
    padding: 4px 0;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    color: #FFF0B3; /* Creamy Yellow */
  }

  .nav-item::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 2px;
    background-color: #FFBF78; /* Light Orange */
    transition: width 0.3s ease-in-out;
  }

  .nav-item:hover::after,
  .nav-item:active::after {
    width: 100%;
  }

  .nav-item:hover {
    transform: scale(1.05);
    color: #FF7F2A; /* Orange */
  }

  .logo img {
    height: 50px;
    width: 100px;
    object-fit: cover;
    mix-blend-mode: screen;
  }

  .btn {
    padding: 6px 12px;
    background-color: #FFBF78;
    color: #7C3F1D;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .cart {
    font-size: 24px;
    cursor: pointer;
  }

  .profile {
    font-size: 24px;
    cursor: pointer;
  }
`;

const Nav = () => {
  return (
    <Wrapper>
      <div className="navbar">
        <div className="nav-left">
          <div className="logo">
            <Link to="/">
              <img src="/logo1.jpg" alt="Logo" />
            </Link>
          </div>
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/SweetList" className="nav-item">Sweets</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
        </div>

        <div className="nav-right">
            <Link to="/login">
                <button className="btn">Login</button>
            </Link>
            <Link to="/cartItems">
                <div className="cart">🛒</div>
            </Link>
        </div>

      </div>
    </Wrapper>
  );
};

export default Nav;
