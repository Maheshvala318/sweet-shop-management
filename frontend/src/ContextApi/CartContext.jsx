import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../Reducer/CartReducer";

const CartContext = createContext();

const initialState = {
  cart: [],
  subtotal: 0,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Calculate subtotal whenever cart changes
  useEffect(() => {
    dispatch({ type: "calculateSubtotal" });
  }, [state.cart]);

  const addToCart = (product) => {
    dispatch({ type: "addToCart", payload: { product } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "removeFromCart", payload: { id: productId } });
  };

  const decrementQuantity = (productId) => {
    dispatch({ type: "decrementQuantity", payload: { id: productId } });
  };

  const incrementQuantity = (productId) => {
    dispatch({ type: "incrementQuantity", payload: { id: productId } });
  };

  const clearCart = () => {
    dispatch({ type: "clearCart" });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        decrementQuantity,
        incrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };