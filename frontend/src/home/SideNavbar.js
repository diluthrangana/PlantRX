import React from "react";
import { FaHome, FaSeedling, FaVirus, FaSignOutAlt, FaPlus, FaComment, FaCloudRain } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const SideNavbar = () => {
  const navigate = useNavigate(); 

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <h2>PlantRX</h2>
        </div>
        <div style={styles.navLinks}>
          <div style={styles.navItem} onClick={() => navigate("/home")}>
            <FaHome style={styles.icon} />
            <span style={styles.linkText}>My Plans</span>
          </div>
          <div style={styles.navItem} onClick={() => navigate("/add-plan")}>
            <FaPlus style={styles.icon} />
            <span style={styles.linkText}>Add Plan</span>
          </div>
          <div style={styles.navItem} onClick={() => navigate("/plants")}>
            <FaSeedling style={styles.icon} />
            <span style={styles.linkText}>Plants</span>
          </div>
          <div style={styles.navItem} onClick={() => navigate("/desease")}>
            <FaVirus style={styles.icon} />
            <span style={styles.linkText}>Deseases</span>
          </div>
          <div style={styles.navItem} onClick={() => navigate("/chatbot")}>
            <FaCloudRain style={styles.icon} />
            <span style={styles.linkText}>Weather</span>
          </div>
          <div style={styles.navItem} onClick={() => navigate("/chatbot")}>
            <FaComment style={styles.icon} />
            <span style={styles.linkText}>Chatbot</span>
          </div>
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    paddingTop: "60px", 
    
  },

  sidebar: {
    width: "20%", 
    color: "#000", 
    height: "100vh",
    paddingTop: "20px", 
    paddingLeft:"15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "fixed", 
    top: "60px", 
    right: 0,
    borderLeft: "1px solid #d3d3d3", 
  },
  logo: {
    textAlign: "left",
    paddingLeft: "25px",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#685752", 
  },
  navLinks: {
    display: "flex",
    flexDirection: "column",
  },
  navItem: {
    padding: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s ease",
  },
  icon: {
    fontSize: "20px",
    marginRight: "15px",
    color: "#997C70", 
  },
  linkText: {
    fontSize: "15px",
    color: "685752", 
  },
};

export default SideNavbar;
