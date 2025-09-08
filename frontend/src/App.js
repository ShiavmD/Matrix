import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Plan from './Plan';
import Checklist from './Checklist';
import Payment from './Payment';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/plan">Plan</Link> |{' '}
        <Link to="/checklist">Checklist</Link> |{' '}
        <Link to="/payment">Payment</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
