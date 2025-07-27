// frontend/src/styles/Button.js
import styled from "styled-components";

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #ff7f2a;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0661a;
  }
`;
