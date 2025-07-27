import React from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  .del {
    scale: 2;
    cursor: pointer;
  }

  .del:hover {
    color: red;
  }

  .del:active {
    color: red;
    scale: 2.4;
  }

  h1.main-title {
    font-size: 36px;
    color: #9C2C10;
    text-align: center;
    margin-bottom: 40px;
  }

  .heading-row {
    display: flex;
    justify-content: space-around;
    border-bottom: none;
    margin-bottom: 10px;
    padding-bottom: 0;
  }

  .heading-row h3 {
    position: relative;
    font-size: 18px;
    color: #7C3F1D;
    font-weight: 600;
    padding-bottom: 5px;
  }

  .heading-row h3::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: #FF7F2A;
  }

  .col {
    color: #FF7F2A;
  }

  .text-section {
    background-color: #fff9e6;
    padding: 40px;
    border-radius: 10px;
  }
`;


const staticCart = [
  {
    id: 1,
    name: "Kaju Katli",
    price: 249,
    quantity: 2,
    image: "/Home/3.jfif",
  },
  {
    id: 2,
    name: "Rasgulla",
    price: 149,
    quantity: 1,
    image: "/Home/2.jfif",
  },
];

export default function CartItems() {
  const subtotal = staticCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = (subtotal * 5) / 100;
  const total = subtotal + gst;

  return (
    <Wrapper>
      <div className="text-center align-items-center m-5">
        <h1 className="mb-5">YOUR CART ITEMS</h1>
        <div className="row text-center bg-dark text-white rounded">
          <h3 className="col-5">Title</h3>
          <h3 className="col">Price</h3>
          <h3 className="col">Quantity</h3>
          <h3 className="col">Total</h3>
          <h3 className="col">Remove</h3>
        </div>
        <hr />

        {staticCart.map((item) => (
          <div key={item.id}>
            <div className="row d-flex align-items-center">
              <div className="col-5 d-flex align-items-center">
                <img
                  src={item.image}
                  style={{ width: "100px", height: "100px" }}
                  alt={item.name}
                />
                <h1 className="m-4">{item.name}</h1>
              </div>
              <p className="col">₹{item.price}</p>
              <p className="col d-flex justify-content-around">
                <span>➖</span>
                {item.quantity}
                <span>➕</span>
              </p>
              <h4 className="col">₹{(item.price * item.quantity).toFixed(2)}</h4>
              <MdDelete className="col del" />
            </div>
            <hr />
          </div>
        ))}

        <div className="d-flex justify-content-end">
          <div style={{ width: "500px" }}>
            <div className="d-flex justify-content-between">
              <div className="h5">Sub Total :</div>
              <div>₹{subtotal.toFixed(2)}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="h5">GST :</div>
              <div>₹{gst.toFixed(2)}</div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="h5">Grand Total :</div>
              <div className="h1 fw-bold">₹{total.toFixed(2)}</div>
            </div>
            <div className="d-flex justify-content-end my-3">
              <Link to="/address">
                <button className="btn btn-dark">Check Out</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
