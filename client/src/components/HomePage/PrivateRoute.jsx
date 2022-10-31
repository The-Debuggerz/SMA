import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import Loader from '../Navbar/Loader';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, loading]);

  if (loading || isLoggedIn === false) {
    return <Loader />;
  }

  // return isLoggedIn === true ? <Outlet /> : <Navigate to='/login' replace />;
  return <Outlet />;
};

export default PrivateRoute;
