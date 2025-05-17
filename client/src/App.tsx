import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComingSoon from './components/ComingSoon';
import SignupForm from './components/SignupForm';
import ThankYou from './components/ThankYou';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signup/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
