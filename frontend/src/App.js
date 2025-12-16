import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Footter from "./components/Footter";
import Games from "./pages/Games";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import SingUp from "./pages/SingUp";
import SignIn from "./pages/SignIn";
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footter />
    </>
  );
}

function SubLayout() {
  return <Outlet />;
}

function App() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          backgroundColor: "#01010a",
          minHeight: "100%",
          boxShadow: "0 0 50px rgba(0, 0, 0, 0.8)",
        }}
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
          </Route>

          <Route element={<SubLayout />}>
            <Route path="/sign-up" element={<SingUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/email-verify" element={<EmailVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

export default App;