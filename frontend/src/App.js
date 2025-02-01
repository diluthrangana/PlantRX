import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Main from "./pages/Main"; 
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./home/Home";
import Navbar from "./components/Navbar";
import PlantingPlanDetails from "./home/PlantingPlanDetails";
import SideNavbar from "./home/SideNavbar";
import Desease from "./home/Desease";
import { UserProvider } from "./contexts/UserContext"; 
import PlantingPlan from "./home/PlantingPlan";
import Plants from "./home/Plants";
import Chatbot from "./home/Chatbot";
import MyCalendar from "./home/MyCalendar";

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/signup"]; 

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/home" 
          element={ <div style={{ display: 'flex' }}><SideNavbar /><Home /></div>} 
        />
        <Route 
          path="/add-plan" 
          element={ <div style={{ display: 'flex' }}><SideNavbar /><PlantingPlan /></div>} 
        />
        <Route 
          path="/calendar" 
          element={ <div style={{ display: 'flex' }}><SideNavbar /><MyCalendar /></div>} 
        />
        <Route 
          path="/desease" 
          element={ <div style={{ display: 'flex' }}><SideNavbar /><Desease /></div>} 
        />
        <Route 
          path="/plants" 
          element={ <div style={{ display: 'flex' }}><SideNavbar /><Plants /></div>} 
        />
        <Route 
          path="/chatbot" 
          element={ <div style={{ display: 'flex' }}><SideNavbar /><Chatbot /></div>} 
        />
        
        <Route path="/planting-plan-details" element={<PlantingPlanDetails />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}
