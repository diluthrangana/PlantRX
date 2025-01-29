import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  const styles = {
    mainContainer: {
      backgroundImage: 'url(../assets/30399.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'flex-end', 
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      paddingRight: '50px', 
    },
    content: {
      textAlign: 'left', 
    },
    h1: {
      fontSize: '3em',
      marginBottom: '10px',
      marginLeft: '10px',
    },
    p: {
      fontSize: '1em',
      marginBottom: '30px',
      marginLeft: '10px',
    },
    button: {
      border: '2px solid white',
      backgroundColor: 'transparent',
      color: 'white',
      padding: '10px 50px',
      margin: '10px',
      fontSize: '1.2em',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: '0.3s',
    },
    buttonHover: {
      // backgroundColor: 'gray',
      // color: 'black',
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.content}>
        <h1 style={styles.h1}>PlantRX</h1>
        <p style={styles.p}>Discover the best care for your plants and grow a healthier garden!</p>
        <div className="buttons">
          <Link to="/login">
            <button 
              style={styles.button}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'white'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button 
              style={styles.button}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#8EB486'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8EB486'}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
