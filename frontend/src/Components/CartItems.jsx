import React from "react";
import { Button } from "../styles/Button";
import { MdDelete } from "react-icons/md";
import styled from "styled-components";
import { useCart } from "../ContextApi/CartContext";
import { Link } from "react-router-dom";

const Wrep = styled.div`
  .del {
    scale: 2;
  }
  .del:hover {
    color: red;
  }
  .del:active {
    color: red;
    scale: 2.4;
  }

  /* Add these styles for product grid */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
    gap: 20px; /* Space between products */
    margin: 20px 0;
  }

  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
  }

  .product-info {
    width: 100%;
    margin-top: 10px;
  }

  @media (max-width: 992px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr); /* 2 columns on medium screens */
    }
  }

  @media (max-width: 576px) {
    .product-grid {
      grid-template-columns: 1fr; /* 1 column on small screens */
    }
  }
`;

export default function CartItems() {
  const { cart, decrementQuantity, removeFromCart, incrementQuantity, subtotal } = useCart();

  return (
    <Wrep>
      <div className="container">
        <h1 className="text-center mb-5">YOUR CART ITEMS</h1>
        
        {/* Product Grid */}
        <div className="product-grid">
          {cart.map((item) => (
            <div key={item.id} className="product-card">
              <img
                src={item.image}
                className="product-image"
                alt={item.name}
              />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                
                <div className="d-flex justify-content-between align-items-center">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => decrementQuantity(item.id)}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                      onClick={() => incrementQuantity(item.id)}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="price-display">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-danger btn-sm mt-2 w-100"
                >
                  <MdDelete /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary mt-5 p-4 bg-light rounded">
          <h3 className="mb-4">Order Summary</h3>
          
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="d-flex justify-content-between mb-2">
            <span>GST (5%):</span>
            <span>₹{((subtotal * 5) / 100).toFixed(2)}</span>
          </div>
          
          <hr />
          
          <div className="d-flex justify-content-between mb-4">
            <h5>Grand Total:</h5>
            <h4 className="fw-bold">
              ₹{(subtotal + (subtotal * 5) / 100).toFixed(2)}
            </h4>
          </div>
          
          <div className="text-end">
            <Link to="/address" className="btn btn-dark btn-lg">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </Wrep>
  );
}