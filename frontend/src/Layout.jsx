import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { AuthProvider, useAuth } from './Context/Auth';

const Layout = () => {
  const PublicRoutes = ['/', '/login', '/signup', '/contact', '/about', '/termsandconditions'];

  return (
    <AuthProvider>
      <Header />
      <LayoutContent PublicRoutes={PublicRoutes} />
      <Footer />
    </AuthProvider>
  );
};

const LayoutContent = ({ PublicRoutes }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const { isAuthenticated, loading } = auth;

  if (loading) {
    return <div>Loading...</div>; // or any loading indicator
  }

  const isPublicRoute = PublicRoutes.includes(location.pathname);

  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Layout;

