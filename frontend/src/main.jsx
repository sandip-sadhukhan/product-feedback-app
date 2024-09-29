import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import './index.css'
import SuggestionsPage from './pages/suggestions-page.jsx'
import FeedbackDetailPage from './pages/feedback-detail-page.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SuggestionsPage />
  },
  {
    path: "/feedback/:feedbackId",
    element: <FeedbackDetailPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
