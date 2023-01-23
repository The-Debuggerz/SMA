import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../Store/AuthSlice';

function LoginCallback() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(userLoggedIn());
      document.cookie = `jwtoken=${token}; max-age=36000; path=/`;
      navigate('/');
    }
  }, [token]);

  return <div>Loading...</div>;
}

export default LoginCallback;
