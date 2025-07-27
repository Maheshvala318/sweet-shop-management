import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFilter } from "../ContextApi/FilterContext";

const Wrapper = styled.div`
  .main {
    background-color: #FFBF78;
    height: 90vh;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #fffce8;
    text-align: center;
    padding: 20px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
  }

  .content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 0 20px;
  }

  h1 {
    white-space: nowrap;
    letter-spacing: 6px;
    font-size: 3.5rem;
    font-weight: 700;
    color: #fffce8;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
    margin-bottom: 1.5rem;
    font-family: 'Playfair Display', serif;
  }

  p {
    font-size: 1.3rem;
    color: #fffce8;
    font-weight: 400;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  }

  .shop {
    background-color: transparent;
    color: white;
    border: 2px solid white;
    padding: 12px 32px;
    margin-top: 25px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 30px;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 1rem;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
  }

  .shop:hover {
    background-color: rgba(255,255,255,0.15);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }

  .shop:active {
    transform: translateY(-1px);
  }

  .category-icons, .featured-products {
    margin: 50px auto;
    padding: 30px;
    max-width: 1200px;
    border-radius: 12px;
    background-color: #fff9e6;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }

  .section-title {
    font-size: 2.2rem;
    color: #7C3F1D;
    margin-bottom: 30px;
    text-align: center;
    font-weight: 600;
    letter-spacing: 1px;
    position: relative;
    padding-bottom: 15px;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: #FF7F2A;
    border-radius: 3px;
  }

  .card {
    width: 280px;
    border: none;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    transition: all 0.4s ease;
    background: white;
    margin: 15px;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.12);
  }

  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-body {
    padding: 20px;
    text-align: center;
  }

  .card-body p:first-child {
    font-size: 1.2rem;
    color: #7C3F1D;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .card-body p:last-child {
    color: #FF7F2A;
    font-weight: 700;
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
      letter-spacing: 3px;
    }

    .main {
      height: auto;
      padding: 80px 20px;
    }

    .card {
      width: 100%;
      margin: 15px 0;
    }
  }
`;

const carouselImages = [
  "/Home/1.jfif",
  "/Home/2.jfif",
  "/Home/3.jfif",
  "/Home/4.jfif",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { featureSweets = [] } = useFilter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <div
        className="main"
        style={{
          backgroundImage: `url(${carouselImages[currentImageIndex]})`,
          transition: "background-image 0.8s ease-in-out"
        }}
      >
        <div className="content">
          <h1>S W E E T &nbsp; D E L I G H T</h1>
          <p>Your Favourite Sweet Shop</p>
          <p>Discover Premium Handcrafted Confections</p>
          <Link to="/products">
            <button className="shop">Explore Collection</button>
          </Link>
        </div>
      </div>

      <div className="category-icons">
        <h2 className="section-title">Our Categories</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div className="card">
            <img src="/category1.jpg" alt="Chocolate" />
            <div className="card-body">
              <p>Chocolate</p>
              <p>From ₹199</p>
            </div>
          </div>
          <div className="card">
            <img src="/category2.jpg" alt="Traditional" />
            <div className="card-body">
              <p>Traditional</p>
              <p>From ₹149</p>
            </div>
          </div>
          <div className="card">
            <img src="/category3.jpg" alt="Festive" />
            <div className="card-body">
              <p>Festive Special</p>
              <p>From ₹249</p>
            </div>
          </div>
        </div>
      </div>

      <div className="featured-products">
        <h2 className="section-title">Featured Confections</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {featureSweets.map((sweet) => (
            <div className="card" key={sweet.id}>
              <img src={sweet.image} alt={sweet.name} />
              <div className="card-body">
                <p>{sweet.name}</p>
                <p>₹{sweet.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}