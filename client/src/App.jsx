import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLoggedIn } from './Store/AuthSlice';

import AboutPage from './components/AboutPage/AboutPage';
import AdminDashBoard from './components/AdminDashboard/AdminDashBoard';
import ChatPage from './components/ChatPage/ChatPage';
import Error404 from './components/ErrorPages/404';
import Error500 from './components/ErrorPages/500';
import FooterPage from './components/FooterPage/FooterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage/ForgotPasswordPage';
import HomePage from './components/HomePage/HomePage';
import Loader from './components/Loader/Loader';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Navbar from './components/Navbar/Navbar';
import Notification from './components/Notification/Notification';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Settings from './components/Settings/Settings';
import SignUp from './components/SignUp/SignUp';
import UserProfile from './components/Profile/UserProfile';
import EditPost from './components/EditPost/EditPost';
import SinglePost from './components/SinglePost/SinglePost';

import './App.css';

function App() {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(userLoggedIn());
  }, []);

  if (loading) return <Loader />;

  // console.log(isLoggedIn);

  return (
    <div className='conatainer min-h-screen mx-auto'>
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
          <Route path='profile/:userbyname' element={<UserProfile />} />
          <Route path='chatPage' element={<ChatPage />} />
          <Route path='logout' element={<Logout />} />
          <Route path='profile/settings' element={<Settings />} />
          <Route path='notification' element={<Notification />} />
          <Route path='edit-post/:postID' element={<EditPost />} />
          <Route path='post/:postID' element={<SinglePost />} />
        </Route>

        <Route path='/f' element={<Error500 />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
      {!loading && pathname !== '/' && <FooterPage />}
    </div>
  );
}

export default App;
