import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import About from './components/About/About.jsx'
import SignUp from './components/SignUp/Signup.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/algorithms',
        element: <SignUp />
      },
      {
        path: '/quizes',
        element: <SignUp />
      },
      {
        path: '/contact',
        element: <SignUp />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
