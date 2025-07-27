import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useValid } from "../ContextApi/ValidContext";
import { FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { FaCookieBite } from "react-icons/fa";

const Wrapper = styled.nav`
  background: linear-gradient(135deg, #5a2e1a 0%, #7C3F1D 100%);
  color: white;
  padding: 0 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 2px solid #FF7F2A;

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    height: 70px;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .nav-item {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 0.5px;
    color: #FFF0B3;
    text-decoration: none;
    position: relative;
    padding: 8px 0;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 2px;
      background: #FFBF78;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #FF7F2A;
      
      &::after {
        width: 100%;
      }
    }
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 700;
    color: #FFBF78;
    text-decoration: none;
    
    .icon {
      font-size: 1.8rem;
    }
  }

  .btn {
    padding: 8px 20px;
    background: #FFBF78;
    color: #5a2e1a;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;

    &:hover {
      background: #FF7F2A;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  }

  .cart-icon {
    color: #FFF0B3;
    font-size: 1.4rem;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      color: #FF7F2A;
      transform: scale(1.1);
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 15px;
    color: #FFF0B3;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #FFBF78;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5a2e1a;
    font-weight: bold;
    font-size: 1.1rem;
    transition: all 0.3s ease;

    &:hover {
      background: #FF7F2A;
      transform: scale(1.05);
    }
  }

  .user-name {
    font-weight: 500;
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    
    .nav-left {
      gap: 20px;
    }
    
    .nav-right {
      gap: 15px;
    }
  }
`;

const Nav = () => {
  const { status, data, updateStatus, updateData } = useValid();

  const handleLogout = () => {
    updateData({ name: '', email: '', id: null });
    updateStatus("login");
    localStorage.removeItem('authToken');
  };

  return (
    <Wrapper>
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">
            <FaCookieBite className="icon" />
            <span>SweetDelight</span>
          </Link>
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/SweetList" className="nav-item">Our Sweets</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
        </div>

        <div className="nav-right">
          {status === "logout" ? (
            <div className="user-info">
              <div className="user-avatar" title={data.name || 'User'}>
                {data.name ? data.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="user-name">{data.name || 'User'}</span>
              <button className="btn" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
              <Link to="/cartItems" className="cart-icon">
                <FiShoppingCart />
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="btn">
                  <FiUser /> Login
                </button>
              </Link>
              <Link to="/cart" className="cart-icon">
                <FiShoppingCart />
              </Link>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Nav;