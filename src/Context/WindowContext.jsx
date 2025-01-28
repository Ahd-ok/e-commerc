import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);

export default function WindowContext({ children }) {

  useEffect(() => {
    function changeWidth() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth);

    return () => {
      window.removeEventListener('resize', changeWidth);
    }
  }, [])

  const [windowsize, setWindowSize] = useState(window.innerWidth);
  return <WindowSize.Provider value={{ windowsize, setWindowSize }}>
    {children}
  </WindowSize.Provider>
}