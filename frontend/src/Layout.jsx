import { React, useEffect, useRef} from 'react';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { AuthProvider, useAuth } from './Context/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Loader from './components/Loader/Loader';

const Layout = () => {
  const PublicRoutes = ['/', '/login', '/signup', '/contact', '/about', '/termsandconditions', '/auth/success', 'privacypolicy', '/user/aashish'];

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId='903882814714-9uqs45mhrs8kn4evvrq581iqdm8pfm96.apps.googleusercontent.com'>
        <Header />
        <LayoutContent PublicRoutes={PublicRoutes} />
        <Footer />
      </GoogleOAuthProvider>
    </AuthProvider>
  );
};

const LayoutContent = ({ PublicRoutes }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, loading } = auth;

  const isPublicRoute = PublicRoutes.includes(location.pathname);

  useEffect(() => {
    if (loading) {
      // Show loading screen while checking authentication
      return;
    }

    if (isAuthenticated) {
      // Navigate to dashboard if authenticated
      // navigate("/dashboard");
    } else {
      // Navigate to signup if not authenticated
      if (!isPublicRoute) {
        
      } else {
        navigate(location.pathname);
      }
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <Loader />;
  }

  // Render the appropriate content based on the authentication status
  return isAuthenticated ? (
    <Outlet />
  ) : isPublicRoute ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};


export default Layout;
