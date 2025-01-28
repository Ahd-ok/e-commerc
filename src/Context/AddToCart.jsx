import { createContext, useState } from "react";

export const Cart = createContext(true);

export function AddToCart({ children }) {
  const [addCart, setAddCart] = useState(false);
  return (
    <Cart.Provider value={{ addCart, setAddCart }}>
      {children}
    </Cart.Provider>
  )
}
