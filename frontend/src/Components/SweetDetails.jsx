// SweetDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useSweet } from "../ContextApi/SweetsContext";

const Wrapper = styled.section`
  background-color: #fff9e6;
  padding: 40px 0;

  .container1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
  }

  .img-container {
    width: 400px;
    height: 480px;
    padding: 20px;
    background: #fff3dd;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  .img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .dis-container {
    max-width: 500px;
    background: #fff3dd;
    padding: 30px;
    border-radius: 12px;
    color: #5c2c06;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  h1 {
    font-size: 28px;
    margin-bottom: 10px;
    color: #7C3F1D;
  }

  h3 {
    color: #FF7F2A;
    font-weight: 600;
    font-size: 22px;
  }

  p {
    margin: 10px 0;
    line-height: 1.6;
    font-size: 16px;
  }

  button {
    margin-top: 10px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    .container1 {
      flex-direction: column;
      align-items: center;
    }

    .img-container,
    .dis-container {
      width: 90%;
      margin: auto;
    }
  }
`;

export default function SweetDetails() {
  const { id } = useParams();
  const sweets = useSweet();

  const sweet = sweets.find((s) => s.id.toString() === id);

  if (!sweet) {
    return (
      <Wrapper>
        <div className="text-center">
          <h2 style={{ color: "#a94442", marginTop: "100px" }}>
            ❌ Sweet not found!
          </h2>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="container1">
        <div className="img-container d-flex justify-content-center align-items-center">
          <img src={sweet.image} alt={sweet.name} />
        </div>

        <div className="dis-container d-flex justify-content-center align-items-start flex-column">
          <h1>{sweet.name}</h1>
          <h3>₹{sweet.price}</h3>
          <p>⭐ {sweet.ratings} / 5.0</p>
          <p>{sweet.description}</p>
          <Button>Add to Cart</Button>
          <Button>Review</Button>
        </div>
      </div>
    </Wrapper>
  );
}
