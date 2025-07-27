export default function CartReducer(state, action) {
  switch (action.type) {
    case "addToCart":
      const { id, name, image, price } = action.payload.product;
      
      // Check if item already exists in cart
      const existingItem = state.cart.find((item) => item.id === id);
      
      if (existingItem) {
        // If exists, increase quantity
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If new item, add to cart
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              id,
              name,
              image,
              price,
              quantity: 1,
            },
          ],
        };
      }

    case "removeFromCart":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case "decrementQuantity":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              }
            : item
        ),
      };

    case "incrementQuantity":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "calculateSubtotal":
      const subtotal = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return { ...state, subtotal };

    case "clearCart":
      return { ...state, cart: [], subtotal: 0 };

    default:
      return state;
  }
}