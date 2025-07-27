import React from "react";
import styled from "styled-components";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
const Wrapper = styled.footer`
  background-color: #7C3F1D; /* Dark Brown */
  color: #FFF0B3; /* Creamy Yellow */
  padding: 30px 20px 10px;
  text-align: center;

  .footer-top {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 20px;
  }

  .section {
    flex: 1;
  }

  a {
    color: #FFBF78; /* Light Orange */
    margin: 0 8px;
    font-size: 18px;
    text-decoration: none;
  }

  a:hover {
    color: #FF7F2A; /* Bright Orange */
  }

  hr {
    margin: 20px 0;
    border-color: #FFBF78;
  }

  .footer-bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 14px;
  }

  @media (min-width: 768px) {
    .footer-top {
      flex-direction: row;
      justify-content: space-around;
      text-align: left;
    }

    .footer-bottom {
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <div className="footer-top">
        <div className="section">
          <h5>SweetieShop</h5>
          <p>Management System for Sweets</p>
        </div>
        <div className="section">
          <h5>Follow Us</h5>
          <a href="https://www.instagram.com/mahesh.16__?igsh=MWd3dG51amV6NHB2dQ==">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100025186593677">
            <FaFacebookF />
          </a>
          <a href="https://chat.whatsapp.com/EJJBvtslvWP8IXGurSNDVS">
            <FaWhatsapp />
          </a>
        </div>
        <div className="section">
          <h5>Call Us</h5>
          <a href="tel:9879524287">+91 9879524287</a>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <div>
          Privacy Policy <br />
          <Link to="/term" style={{ color: "white" }}>
            Terms & Conditions
          </Link>
        </div>
        <div>©2024 SweetieShop, All Rights Reserved</div>
      </div>
    </Wrapper>
  );
}
