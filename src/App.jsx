import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './index.css'
import AppLayout from './layouts/AppLayout'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import JobListing from './pages/JobListing'
import JobPage from './pages/JobPage'
import PostJob from './pages/PostJob'
import Savedjobs from './pages/Savedjobs'
import Myjobs from './pages/Myjobs'
import { ThemeProvider } from './components/theme-provider'
import ProtectedRoute from './components/protected-route'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/onboarding',
        element: (<ProtectedRoute>
        <Onboarding />
        </ProtectedRoute>)
      },
      {
        path: '/jobs',
        element: (<ProtectedRoute>
        <JobListing />
        </ProtectedRoute>)
      },
      {
        path: '/job/:id',
        element: (<ProtectedRoute>
        <JobPage />
        </ProtectedRoute>)
      },
      {
        path: '/post-job',
        element: (<ProtectedRoute>
        <PostJob />
        </ProtectedRoute>)
      },
      {
        path: '/saved-job',
        element: (<ProtectedRoute>
        <Savedjobs />
        </ProtectedRoute>)
      },
      {
        path: '/my-jobs',
        element: (<ProtectedRoute>
        <Myjobs />
        </ProtectedRoute>)
      }
    ]
  }
])
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
  )
}

export default App
