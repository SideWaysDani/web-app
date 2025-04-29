import { motion } from 'framer-motion';
import React from 'react';
import TradingBackground from './TradingBackground';

const ComingSoon: React.FC = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <TradingBackground />
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ 
          fontSize: '4rem', 
          marginBottom: '1rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        QuietAlpha
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        We are coming soon
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          fontSize: '1rem',
          color: '#a0a0a0',
          textAlign: 'center',
          maxWidth: '600px',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        Something amazing is in the works. We're working hard to bring you
        a new experience. Stay tuned!
      </motion.div>
    </div>
  );
};

export default ComingSoon;