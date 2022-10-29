import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './auth-slice';

const UserLoggedIn = async () => {
  const dispatch = useDispatch();

  let res = await fetch('/api/isLoggedIn', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let data = await res.json();
  console.log('UserLoggedIn:dispatchData', data);

  dispatch(authActions.login(data));
};

export default UserLoggedIn;
