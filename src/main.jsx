import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './components/navigation/Router.jsx'
import { TimerProvider } from './context/TimerContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TimerProvider>
      <Router />
    </TimerProvider>
  </React.StrictMode>,
)
