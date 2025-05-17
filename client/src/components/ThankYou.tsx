import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
      color: 'white',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Thank You!</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          We'll keep you updated on our progress.
        </p>
        <Link 
          to="/"
          style={{
            color: '#4a9eff',
            textDecoration: 'none',
            fontSize: '1.1rem',
          }}
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYou;