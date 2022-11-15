import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLoggedIn } from './Store/AuthSlice';
import { useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Profile from './components/Profile/Profile';
import UserProfile from './components/Profile/UserProfile';
import ChatPage from './components/ChatPage/ChatPage';
import AboutPage from './components/AboutPage/AboutPage';
import AdminDashBoard from './components/AdminDashboard/AdminDashBoard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Logout from './components/Logout/Logout';
import ForgotPasswordPage from './components/ForgotPasswordPage/ForgotPasswordPage';
import Settings from './components/Settings/Settings';
import Notification from './components/Notification/Notification';
import FooterPage from './components/FooterPage/FooterPage';

import Error404 from './components/ErrorPages/404';
import Error500 from './components/ErrorPages/500';

import './App.css';

function App() {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const { userProfileLoading } = useSelector((state) => state.follow);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(userLoggedIn());
  }, []);

  // console.log(isLoggedIn);

  return (
    <>
      <section className='App h-full'>
        <Navbar />
        <Routes>
          <Route
            path='login'
            element={isLoggedIn ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='signup'
            element={isLoggedIn ? <Navigate to='/' /> : <SignUp />}
          />
          <Route
            path='forgotPassword'
            element={isLoggedIn ? <Navigate to='/' /> : <ForgotPasswordPage />}
          />
          <Route path='about' element={<AboutPage />} />

          <Route element={<PrivateRoute />}>
            <Route index element={<HomePage />} />
            <Route path='admin' element={<AdminDashBoard />} />
            <Route path='profile' exact element={<Profile />} />
            <Route path='profile/:userbyname' element={<UserProfile />} />
            <Route path='chatPage' element={<ChatPage />} />
            <Route path='logout' element={<Logout />} />
            <Route path='settings' element={<Settings />} />
            <Route path='notification' element={<Notification />} />
          </Route>

          <Route path='/f' element={<Error500 />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
        {!loading && !userProfileLoading && pathname !== '/' && <FooterPage />}
      </section>
    </>
  );
}

export default App;
