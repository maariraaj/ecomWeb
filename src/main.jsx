import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartContextProvider } from './components/cart-context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartContextProvider>
    <App />
  </CartContextProvider>,
)
