import { useEffect } from 'react';
import { userLogout } from '../../store/auth-slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userLogout()).then(() => {
      navigate('/login');
    });
    // console.count('gg-logout');
  }, []);

  return <h1>Logout</h1>;
};

export default Logout;
