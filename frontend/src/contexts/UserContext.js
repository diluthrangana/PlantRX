import React, { createContext, useState, useContext, useEffect } from "react";


const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  // Retrieve user data from localStorage when the app loads
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser); // Initialize user state with stored user (if any)

  // Login function to save user data to localStorage
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
  };

  // Logout function to clear user data from state and localStorage
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user data from localStorage on logout
  };

  // Automatically remove the user data from state and localStorage when the app is unmounted (optional)
  useEffect(() => {
    return () => {
      localStorage.removeItem("user");
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUser = () => useContext(UserContext);
