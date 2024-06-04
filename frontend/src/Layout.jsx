import React from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { AuthProvider } from './Context/Auth';
const Layout = () => {
  return (
    <>
	<AuthProvider>
        <Header />
        <Outlet />
        <Footer />
	</AuthProvider>
    </>
  )
}

export default Layout
