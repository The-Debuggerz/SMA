import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import logo from '../Logo/logo.png';

import GoogleLogin from '../GoogleLogin/GoogleButton';

const defaultFormFields = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState('');

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, username, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formFields),
      });

      const data = await res.json();

      if (res.status === 422) {
        setMessage(data.message);
      } else {
        window.alert('Successfull Registration');
        navigate('/');
      }

      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='px-5 py-8 mx-auto flex flex-wrap justify-center flex-col items-center'>
          <div className='flex flex-col justify-center items-center lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'>
            <img className='mx-auto h-12 w-auto' src={logo} alt='SMA Logo' />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-white'>
              Create an account
            </h2>
          </div>

          <GoogleLogin text={'Sign up with Google'} />

          <div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10'>
            <h1 className='text-xl text-center text-red-600'>{message}</h1>
            <form className='mt-8 space-y-6' method='POST' onSubmit={postData}>
              <input type='hidden' name='remember' defaultValue='true' />
              <div className='-space-y-px rounded-md shadow-sm'>
                <div className='py-2'>
                  <label htmlFor='text' className='sr-only'>
                    Name
                  </label>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    autoComplete='name'
                    value={name}
                    onChange={handleChange}
                    required
                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    placeholder='Full Name'
                  />
                </div>
                <div className='py-2'>
                  <label htmlFor='text' className='sr-only'>
                    Username
                  </label>
                  <input
                    id='Username'
                    name='username'
                    type='text'
                    autoComplete='Username'
                    value={username}
                    onChange={handleChange}
                    required
                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    placeholder='Username'
                  />
                </div>
                <div className='py-2'>
                  <label htmlFor='email-address' className='sr-only'>
                    Email address
                  </label>
                  <input
                    id='email-address'
                    name='email'
                    type='email'
                    autoComplete='email'
                    value={email}
                    onChange={handleChange}
                    required
                    className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    placeholder='Email address'
                  />
                </div>
                <div className='py-2'>
                  <label htmlFor='password' className='sr-only'>
                    Password
                  </label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={handleChange}
                    required
                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    placeholder='Password'
                  />
                </div>
                <div className='py-2'>
                  <label htmlFor='password' className='sr-only'>
                    Confirm-Password
                  </label>
                  <input
                    id='confirm-password'
                    name='confirmPassword'
                    type='password'
                    autoComplete='confirm-password'
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    placeholder='Confirm Password'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='rememberMe'
                    // onChange={handleChange}
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-900'
                  >
                    I accept the Terms and Conditions
                  </label>
                </div>

                <div className='text-sm'></div>
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
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
