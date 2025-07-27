import React from "react";
import CartItems from "./CartItems";
import NoCartItem from "./NoCartItem";
import { useCart } from "../ContextApi/CartContext";

export default function Cart() {
  const { cart } = useCart();
  return <>{cart.length > 0 ? <CartItems /> : <NoCartItem />}</>;
}