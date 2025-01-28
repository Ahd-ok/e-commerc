import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import MenuContext from './Context/MenuContext.jsx'
import WindowContext from './Context/WindowContext.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { AddToCart } from './Context/AddToCart.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <StrictMode>
      <WindowContext>
        <MenuContext>
          <AddToCart>
            <App />
          </AddToCart>
        </MenuContext>
      </WindowContext>
    </StrictMode>
  </Router>
)
