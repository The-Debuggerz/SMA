import React from 'react';
import logo from '../Logo/logo.png';

const Settings = () => {
  return (
    <div className='flex justify-center mt-12 mb-12'>
      <form className='w-full max-w-lg'>
        <div className='flex justify-center pb-5 text-3xl'>
          <h2>General User Information</h2>
        </div>
        <div className='mb-10'>
          <img className='mx-auto h-12 w-auto' src={logo} alt='SMA Logo' />
        </div>

        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-base font-bold mb-2'
              fillRule='grid-setting-email'
            >
              Email
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-setting-email'
              type='email'
              placeholder='Jhon@github.com'
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-base font-bold mb-2'
              fillRule='grid-setting-username'
            >
              Username
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-setting-username'
              type='text'
              placeholder='JohnDoe'
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-base font-bold mb-2'
              fillRule='grid-setting-password'
            >
              Password
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-setting-password'
              type='password'
              placeholder='******************'
            />
            <p className='text-gray-600 text-xs italic'>
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className='flex mt-10 justify-center '>
          <div className='p-2'>
            <button
              type='button'
              className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            >
              Update Profile
            </button>
          </div>

          <div className='p-2'>
            <button
              type='button'
              className='inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out'
            >
              Delete Account
            </button>
          </div>
        </div>
        <div className='flex justify-center'>
          <button className='inline-flex items-center  px-4 py-2 bg- bg-green-700 hover:bg text-white text-sm font-medium rounded-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6 mr-1.5'
            >
              <path d='M10.5 18a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z' />
              <path
                fillRule='evenodd'
                d='M7.125 1.5A3.375 3.375 0 003.75 4.875v14.25A3.375 3.375 0 007.125 22.5h9.75a3.375 3.375 0 003.375-3.375V4.875A3.375 3.375 0 0016.875 1.5h-9.75zM6 4.875c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125h-9.75A1.125 1.125 0 016 19.125V4.875z'
                clipRule='evenodd'
              />
            </svg>
            Active
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
