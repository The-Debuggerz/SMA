import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Profile from './components/Profile/Profile';
import AboutPage from './components/AboutPage/AboutPage';
import Login from './components/LoginPage/Login';
import AdminDashBoard from './components/AdminDashboard/AdminDashBoard';
import ChatPage from './components/ChatPage/ChatPage';
import ForgotPasswordPage from './components/ForgotPasswordPage/ForgotPasswordPage';
import './App.css';
import Settings from './components/Settings/Settings';
import Notification from './components/Notification/Notification';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<RegisterPage />} />
          {/* <Route path='posts' element={< />} /> */}
          <Route path='about' element={<AboutPage />} />
          <Route path='admin' element={<AdminDashBoard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='chatPage' element={<ChatPage />} />
          <Route path='forgotPassword' element={<ForgotPasswordPage />} />
          <Route path='settings' element={<Settings />} />
          <Route path='notification' element={<Notification />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
