import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  .main {
    background-color: #FFBF78;
    background-image: url("/home.png");
    height: 90vh;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #fffce8;
    text-align: center;
    padding: 20px;
  }

  .content {
    position: relative;
    top: 50px;
  }

  h1 {
    white-space: nowrap;
    letter-spacing: 6px;
    font-size: 2.8rem;
    font-weight: bold;
    color: #fffce8;
  }

  p {
    font-size: 1.1rem;
    color: #fffce8;
    font-weiht: 500;
  }

  .shop {
    background-color: transparent;
    color: White;
    border: 2px solid #fffce8;
    padding: 6px 14px;
    margin-top: 10px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    border-radius: 6px;
    font-weight: bold;
  }

  .shop:hover {
    background-color: #7C3F1D;
    color: #fffce8;
  }

  .category-icons,
  .featured-products {
    margin: 30px 20px;
    padding: 20px;
    border: 2px solid #f5d5a2;
    border-radius: 12px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #fff4d0;
  }

  .card {
    width: 220px;
    border: 1px solid #ffcc9c;
    border-radius: 8px;
    box-shadow: 2px 2px 10px #ffcba4;
    text-align: center;
    overflow: hidden;
    background: #fffef9;
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  .card-body {
    padding: 10px;
  }

  @media (max-width: 768px) {
    .main {
      height: auto;
      padding: 40px 10px;
    }

    .content {
      top: 20px;
      text-align: center;
    }

    .card {
      width: 90%;
    }

    .shop {
      padding: 4px 10px;
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

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  }, 3000); // change image every 3 seconds
  return () => clearInterval(interval);
}, []);

  return (
    <Wrapper>
        <div
        className="main"
        style={{
            backgroundImage: `url(${carouselImages[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.5s ease-in-out",
        }}
        >
        <div className="content">
            <h1>S W E E T &nbsp;D E L I G H T</h1> 
            <p>Your Favourite Sweet Shop</p>
            <p>Explore Our Delicious Sweets</p>
            <Link to="/">
            <button className="shop">SHOP NOW</button>
            </Link>
        </div>
        </div>

      {/* Sweet Categories — Icons or Images can be used here dynamically */}
      <div className="category-icons">
        {/* Commented placeholder: Map over sweet categories here */}
        {/* Example: ["Chocolate", "Candy", "Laddu"].map(...) */}
        <div>
          <h4>🍫 Chocolate</h4>
        </div>
        <div>
          <h4>🍬 Candy</h4>
        </div>
        <div>
          <h4>🍩 Donut</h4>
        </div>
        <div>
          <h4>🍰 Cake</h4>
        </div>
      </div>

      {/* Featured Products — Replace this with dynamic featured sweets */}
      <div className="featured-products">
        {/* Commented placeholder: Map over featureProducts */}
        <div className="card">
          <img src="/sweet1.jpg" alt="sweet" />
          <div className="card-body">
            <p>Chocolate Barfi</p>
            <p>₹199</p>
          </div>
        </div>
        <div className="card">
          <img src="/sweet2.jpg" alt="sweet" />
          <div className="card-body">
            <p>Rasgulla</p>
            <p>₹149</p>
          </div>
        </div>
        <div className="card">
          <img src="/sweet3.jpg" alt="sweet" />
          <div className="card-body">
            <p>Kaju Katli</p>
            <p>₹249</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
