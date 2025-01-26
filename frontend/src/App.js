import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main"; 
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { UserProvider } from "./data/UserContext"; 

export default function App() {
  return (
    <UserProvider>
    <Router>
      {/* Navbar is rendered outside Routes to display it on all pages */}
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        {/* Example of an optional home route */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}
