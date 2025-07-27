import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.css'
import { SweetContext, SweetContextProvider } from './ContextApi/SweetsContext.jsx';
import { FilterContextProvider } from './ContextApi/FilterContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ValidContextProvider } from './ContextApi/ValidContext.jsx';
import { CartProvider } from './ContextApi/CartContext.jsx';



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <SweetContextProvider>
      <FilterContextProvider>
        <ValidContextProvider>
          <CartProvider>
           <App />
          </CartProvider>
        </ValidContextProvider>
      </FilterContextProvider>
    </SweetContextProvider>
 </StrictMode>,
)
