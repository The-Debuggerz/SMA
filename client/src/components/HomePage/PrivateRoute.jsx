import { useSelector } from 'react-redux';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, loading]);

  if (loading || isLoggedIn === false) {
    return <h1>Loading...</h1>;
  }

  return <Outlet />;
};

export default PrivateRoute;
