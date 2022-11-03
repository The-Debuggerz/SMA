import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

const PrivateRoute = () => {
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

  return <Outlet />;
};

export default PrivateRoute;
