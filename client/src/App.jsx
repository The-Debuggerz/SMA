import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Profile from './components/Profile/profile';
import AboutPage from './components/AboutPage/AboutPage';
import Login from './components/LoginPage/Login';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<RegisterPage />} />
          <Route path="posts" element={<AboutPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
