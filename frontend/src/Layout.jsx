// import React from "react";
// import Header from "./components/Header/Header";
// import { Outlet, redirect } from "react-router-dom";
// import Footer from "./components/Footer/Footer";
// import { AuthProvider, useAuth } from "./Context/Auth";

// const Layout = () => {

//   const auth = useAuth();
//   let isAuthenticated = auth.isAuthenticated;
//   console.log(auth)
//   // isAuthenticated = auth.isAuthenticated;
//   // let isAuthenticated = false;

//   const PublicRoutes = ["/", "/login", "/signup", "/contact", "/about", "/termsandconditions"];

//   if (!isAuthenticated && !PublicRoutes.includes(window.location.pathname)) {
//     return redirect("/login");
//   }


//   return (
//     <>
//       <AuthProvider>
//         <Header />
//         <Outlet />
//         <Footer />
//       </AuthProvider>
//     </>
//   );
// };

// export default Layout;

import React from "react";
import Header from "./components/Header/Header";
import { Outlet, useNavigate, redirect } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { AuthProvider, useAuth } from "./Context/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google';


const Layout = () => {
  const PublicRoutes = ["/", "/login", "/signup", "/contact", "/about", "/termsandconditions", "/auth/success"];

  return (
    <AuthProvider>
      <LayoutContent PublicRoutes={PublicRoutes} />
    </AuthProvider>
  );
};

const LayoutContent = ({ PublicRoutes }) => {
  const { auth } = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const navigate = useNavigate();

  if (!isAuthenticated && !PublicRoutes.includes(window.location.pathname)) {
    console.log(`Redirecting to login from ${window.location.pathname}`);
    return navigate("/login");
  }

  return (
    <>
      <GoogleOAuthProvider clientId="903882814714-9uqs45mhrs8kn4evvrq581iqdm8pfm96.apps.googleusercontent.com" >
        <Header />
        <Outlet />
        <Footer />
      </GoogleOAuthProvider>
    </>
  );
};

export default Layout;
