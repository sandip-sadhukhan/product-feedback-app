import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import './index.css'
import SuggestionsPage from './pages/suggestions-page.jsx'
import FeedbackDetailPage from './pages/feedback-detail-page.jsx'
import AddFeedbackPage from './pages/add-feedback-page.jsx'
import EditFeedbackPage from './pages/edit-feedback-page.jsx'
import RoadmapPage from './pages/roadmap-page.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SuggestionsPage />
  },
  {
    path: "/feedback/add/",
    element: <AddFeedbackPage />
  },
  {
    path: "/feedback/edit/:feedbackId",
    element: <EditFeedbackPage />
  },
  {
    path: "/feedback/:feedbackId",
    element: <FeedbackDetailPage />
  },
  {
    path: "/roadmap",
    element: <RoadmapPage />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
