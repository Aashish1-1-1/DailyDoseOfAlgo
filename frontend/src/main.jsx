import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import About from './components/About/About.jsx'
import SignUp from './components/SignUp/Signup.jsx'
import User from './components/User/User.jsx'
import Github from './components/Github/Github.jsx'
import SignUpNew from './components/SignUp/SignupNew.jsx'

// method 1
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
        element: <SignUp />,
        children: [
          {
            path: '/signupnew',
            element: <SignUpNew/>
          }
        ]
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
 
// method 2
const router1 = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/signupnew" element={<SignUpNew/>}/>
      <Route path="/algorithms" element={<SignUp />} />
      <Route path="/quizes" element={<SignUp />} />
      <Route path="/contact" element={<SignUp />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/github/:username" element={<Github />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router1}/>
  </React.StrictMode>,
)
