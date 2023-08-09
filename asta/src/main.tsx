import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AddModal from './components/AddModal.tsx'
import ClearModal from './components/ClearModal.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <AddModal />
    <ClearModal />
  </React.StrictMode>,
)
