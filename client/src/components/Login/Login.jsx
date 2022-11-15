import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LockClosedIcon } from '@heroicons/react/20/solid';

import { authActions } from '../../Store/AuthSlice';
import logo from '../Logo/logo.png';

import GoogleLogin from '../GoogleLogin/GoogleButton';

const Login = () => {
  const auth = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      Authorization: `Bearer ${auth}`,
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    // console.log('login-data:', data);

    if (res.status === 400 || !data) {
      window.alert(data.message);
    } else {
      window.alert(data.message);
    }
    // console.log('data-login', data);
    dispatch(authActions.login(data));
    navigate('/');
  };

  console.log('auth:', auth);

  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='px-5 py-24 mx-auto flex flex-wrap justify-center flex-col items-center'>
          <div className='lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'>
            <img className='mx-auto h-12 w-auto' src={logo} alt='SMA Logo' />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Sign in to your account
            </h2>
          </div>

          <GoogleLogin text={'Sign in with Google'} />

          <div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-8'>
            <form className='mt-8 space-y-6' method='POST' onSubmit={loginUser}>
              <input type='hidden' name='remember' defaultValue='true' />
              <div className='-space-y-px rounded-md shadow-sm'>
                <div>
                  <label
                    htmlFor='email-address or Username'
                    className='sr-only'
                  >
                    Email address or Username
                  </label>
                  <input
                    id='email-address'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    placeholder='Email or Username'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor='password' className='sr-only'>
                    Password
                  </label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-900'
                  >
                    Remember me
                  </label>
                </div>

                <div className='text-sm'>
                  <a
                    href='/forgotPassword'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot your password?
                  </a>
                  &nbsp;
                </div>
              </div>
              <div className='ml-2 block text-sm text-gray-900'>
                Don't have an account? &nbsp;
                <Link
                  to='/signup'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Sign up
                </Link>
              </div>
              <div>
                <button
                  type='submit'
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                    <LockClosedIcon
                      className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                      aria-hidden='true'
                    />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
