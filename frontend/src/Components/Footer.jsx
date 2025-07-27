import React from "react";
import styled from "styled-components";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Wrapper = styled.footer`
  background: linear-gradient(135deg, #5a2e1a 0%, #7C3F1D 100%);
  color: #FFF0B3;
  padding: 50px 20px 20px;
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #FF7F2A 0%, #FFBF78 100%);
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-top {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 30px;
  }

  .footer-section {
    position: relative;
    padding-bottom: 20px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 2px;
      background: #FF7F2A;
    }
  }

  .footer-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #FFBF78;
    letter-spacing: 1px;
  }

  .footer-text {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  .social-links {
    display: flex;
    gap: 15px;
    margin-top: 20px;
  }

  .social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 191, 120, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFBF78;
    font-size: 1.1rem;
    transition: all 0.3s ease;

    &:hover {
      background: #FF7F2A;
      color: white;
      transform: translateY(-3px);
    }
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    font-size: 0.95rem;
  }

  .contact-icon {
    color: #FF7F2A;
    font-size: 1.1rem;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 191, 120, 0.3) 50%, transparent 100%);
    margin: 30px 0;
  }

  .footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    font-size: 0.85rem;
    color: rgba(255, 240, 179, 0.7);

    a {
      color: rgba(255, 191, 120, 0.9);
      transition: color 0.3s ease;
      text-decoration: none;

      &:hover {
        color: #FF7F2A;
        text-decoration: underline;
      }
    }
  }

  .copyright {
    text-align: center;
    margin-top: 10px;
  }

  @media (min-width: 768px) {
    .footer-bottom {
      flex-direction: row;
      justify-content: space-between;
    }

    .copyright {
      text-align: right;
    }
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-section">
            <h4 className="footer-title">Sweet Delight</h4>
            <p className="footer-text">
              Premium handcrafted sweets made with traditional recipes and the finest ingredients.
            </p>
            <div className="social-links">
              <a 
                href="https://www.instagram.com/mahesh.16__?igsh=MWd3dG51amV6NHB2dQ==" 
                className="social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100025186593677" 
                className="social-link"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://chat.whatsapp.com/EJJBvtslvWP8IXGurSNDVS" 
                className="social-link"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact Us</h4>
            <div className="contact-item">
              <span className="contact-icon"><FaPhoneAlt /></span>
              <a href="tel:9879524287">+91 9879524287</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon"><MdEmail /></span>
              <a href="mailto:info@sweetdelight.com">info@sweetdelight.com</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <Link to="/" className="footer-text block mb-2">Home</Link>
            <Link to="/products" className="footer-text block mb-2">Our Products</Link>
            <Link to="/about" className="footer-text block mb-2">About Us</Link>
            <Link to="/contact" className="footer-text block mb-2">Contact</Link>
          </div>
        </div>

        <div className="divider"></div>

        <div className="footer-bottom">
          <div>
            <Link to="/privacy" className="mr-4">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Sweet Delight. All rights reserved.
          </div>
        </div>
      </div>
    </Wrapper>
  );
}