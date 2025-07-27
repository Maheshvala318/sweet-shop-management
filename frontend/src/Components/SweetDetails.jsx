import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useSweet } from "../ContextApi/SweetsContext";
import { useCart } from "../ContextApi/CartContext";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";

const Wrapper = styled.section`
  background-color: #fff9e6;
  padding: 60px 0;
  min-height: calc(100vh - 120px);

  .product-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 60px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .image-container {
    background: #fff3dd;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .product-image {
    width: 100%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 12px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }

  .details-container {
    background: #fff3dd;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    color: #5c2c06;
  }

  .product-title {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #7C3F1D;
    font-weight: 700;
    line-height: 1.2;
  }

  .product-price {
    color: #FF7F2A;
    font-weight: 700;
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 25px;
    color: #7C3F1D;
    font-weight: 600;
    
    svg {
      color: #FFBF78;
      font-size: 1.2rem;
    }
  }

  .product-description {
    line-height: 1.8;
    margin-bottom: 35px;
    font-size: 1.1rem;
  }

  .button-group {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .not-found {
    text-align: center;
    padding: 100px 20px;
    
    h2 {
      color: #a94442;
      font-size: 2rem;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 1.2rem;
      color: #7C3F1D;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 0;
    
    .product-container {
      gap: 30px;
    }
    
    .image-container,
    .details-container {
      padding: 20px;
    }
    
    .product-title {
      font-size: 2rem;
    }
    
    .button-group {
      flex-direction: column;
      gap: 15px;
    }
  }
`;

export default function SweetDetails() {
  const { id } = useParams();
  const sweets = useSweet();
  const { addToCart } = useCart();

  const sweet = sweets.find((s) => s.id.toString() === id);

  if (!sweet) {
    return (
      <Wrapper>
        <div className="not-found">
          <h2>❌ Sweet not found!</h2>
          <p>We couldn't find the sweet you're looking for.</p>
        </div>
      </Wrapper>
    );
  }

  const handleAddToCart = () => {
    addToCart(sweet);
    // You can add a toast notification here if you want
    alert(`${sweet.name} added to cart!`);
  };

  return (
    <Wrapper>
      <div className="product-container">
        <div className="image-container">
          <img 
            src={sweet.image} 
            alt={sweet.name} 
            className="product-image" 
          />
        </div>

        <div className="details-container">
          <h1 className="product-title">{sweet.name}</h1>
          <h3 className="product-price">₹{sweet.price}</h3>
          <div className="rating">
            <FiStar />
            <span>{sweet.ratings} / 5.0</span>
          </div>
          <p className="product-description">{sweet.description}</p>
          
          <div className="button-group">
            <Button 
              onClick={handleAddToCart}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <FiShoppingCart /> Add to Cart
            </Button>
            <Button 
              secondary
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <FaRegCommentDots /> Leave Review
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}