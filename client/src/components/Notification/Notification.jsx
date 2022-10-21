import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';

const Notification = () => {
  const avatarImg = 'https://card.thomasdaubenton.com/img/photo.jpg';
  return (
    <Transition
      as={Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      <Menu.Items className='absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 '>
        <Menu.Item>
          {({ active }) => (
            <div className='divide-y divide-gray-100 dark:divide-gray-700 '>
              <a href='#' className='flex py-3 px-4 hover:bg-gray-100 '>
                <div className='flex-shrink-0'>
                  <img
                    className='w-11 h-11 rounded-full'
                    src={avatarImg}
                    alt='Jese image'
                  />
                  <div className='flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800'>
                    <svg
                      className='w-3 h-3 text-white'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z'></path>
                      <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z'></path>
                    </svg>
                  </div>
                </div>
                <div className='pl-3 w-full'>
                  <div className='text-gray-500  mb-1.5 dark:text-gray-400 text-base'>
                    New message from{' '}
                    <span className='font-semibold text-gray-900 text-sm'>
                      Jese Leos
                    </span>
                    : "Hey, what's up? All set for the presentation?"
                  </div>
                  <div className='text-xs text-blue-600 dark:text-blue-500'>
                    a few moments ago
                  </div>
                </div>
              </a>
              <a href='#' className='flex py-3 px-4 hover:bg-gray-100 '>
                <div className='flex-shrink-0'>
                  <img
                    className='w-11 h-11 rounded-full'
                    src={avatarImg}
                    alt='Jese image'
                  />
                  <div className='flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800'>
                    <svg
                      className='w-3 h-3 text-white'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z'></path>
                      <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z'></path>
                    </svg>
                  </div>
                </div>
                <div className='pl-3 w-full'>
                  <div className='text-gray-500  mb-1.5 dark:text-gray-400 text-base'>
                    New message from{' '}
                    <span className='font-semibold text-gray-900 text-sm'>
                      Jese Leos
                    </span>
                    : "Hey, what's up? All set for the presentation?"
                  </div>
                  <div className='text-xs text-blue-600 dark:text-blue-500'>
                    a few moments ago
                  </div>
                </div>
              </a>
              <a href='#' className='flex py-3 px-4 hover:bg-gray-100 '>
                <div className='flex-shrink-0'>
                  <img
                    className='w-11 h-11 rounded-full'
                    src={avatarImg}
                    alt='Jese image'
                  />
                  <div className='flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800'>
                    <svg
                      className='w-3 h-3 text-white'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z'></path>
                      <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z'></path>
                    </svg>
                  </div>
                </div>
                <div className='pl-3 w-full'>
                  <div className='text-gray-500  mb-1.5 dark:text-gray-400 text-base'>
                    New message from{' '}
                    <span className='font-semibold text-gray-900 text-sm'>
                      Jese Leos
                    </span>
                    : "Hey, what's up? All set for the presentation?"
                  </div>
                  <div className='text-xs text-blue-600 dark:text-blue-500'>
                    a few moments ago
                  </div>
                </div>
              </a>
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
};

export default Notification;
