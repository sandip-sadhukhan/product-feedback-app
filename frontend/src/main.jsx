import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import './index.css'
import SuggestionsPage from './pages/suggestions-page.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SuggestionsPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
