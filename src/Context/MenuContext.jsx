import { useState } from "react";
import { createContext } from "react";

export const Menu = createContext(true);
export default function MenuContext({ children }) {
  const [isOpen, setOpen] = useState(true);
  return <Menu.Provider value={{ isOpen, setOpen }}>
    {children}
  </Menu.Provider>
}