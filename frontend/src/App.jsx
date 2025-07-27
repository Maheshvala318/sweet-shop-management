// Updated App with Enhanced Theme and Components

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Nav from "./Components/Navbar";
import Footer from "./Components/Footer";
import SweetList from "./Components/SweetList";
import CartItems from "./Components/CartItems";
import styled, { createGlobalStyle } from "styled-components";
import SweetDetails from "./Components/SweetDetails";
import Register from "./Components/Register";
import Login from "./Components/Login";

// Global theme applied to the whole app
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #FFF9E6;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #7C3F1D;
  }

  a {
    text-decoration: none;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <GlobalStyle />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SweetList" element={<SweetList />} />
          <Route path="/sweet/:id" element={<SweetDetails />} />
          <Route path="/CartItems" element={<CartItems />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
