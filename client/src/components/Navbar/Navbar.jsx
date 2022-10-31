import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Notification from '../Notification/Notification';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import Logout from '../LoginPage/Logout';
import logo from '../Logo/logo.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const userLogout = () => {
    <Logout />;
  };
  // console.log('islogin-navbar:', isLoggedIn);
  return (
    <>
      <Disclosure as='nav' className='bg-gray-800'>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
              <div className='relative flex h-16 items-center justify-between'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex flex-shrink-0 items-center'>
                    <img
                      className='block h-8 w-auto lg:hidden'
                      src={logo}
                      alt='SMA'
                    />
                    <img
                      className='hidden h-8 w-auto lg:block'
                      src={logo}
                      alt='SMA'
                    />
                  </div>
                  <div className='hidden sm:ml-6 sm:block'>
                    <div className='flex space-x-4 text-white'>
                      <Link className='nav__item' to='/loader'>
                        <span className='nav__itemLineTwo'>Loader</span>
                      </Link>
                      {!isLoggedIn && (
                        <>
                          <Link className='nav__item' to='/login'>
                            <span className='nav__itemLineTwo'>Login</span>
                          </Link>
                          <Link className='nav__item' to='/signup'>
                            <span className='nav__itemLineTwo'>SignUp</span>
                          </Link>
                        </>
                      )}

                      {isLoggedIn && (
                        <>
                          <Link className='nav__item' to='/'>
                            <span className='nav__itemLineTwo'>Home</span>
                          </Link>
                          <Link className='nav__item' to='/profile'>
                            <span className='nav__itemLineTwo'>Profile</span>
                          </Link>
                          <Link className='nav__item' to='/admin'>
                            <span className='nav__itemLineTwo'>Admin</span>
                          </Link>
                          <Link
                            className='nav__item'
                            to='/logout'
                            onClick={userLogout}
                          >
                            <span className='nav__itemLineTwo'>Logout</span>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  {
                    <button
                      type='button'
                      className='rounded-full mr-2 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                    >
                      <span className='sr-only'>Chat</span>

                      <Link to={'chatPage'}>
                        <ChatBubbleOvalLeftEllipsisIcon
                          className='h-6 w-6'
                          aria-hidden='true'
                        />
                      </Link>
                    </button>
                  }
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex rounded-full text-sm'>
                        <svg
                          className='w-6 h-6'
                          aria-hidden='true'
                          fill='grey'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z'></path>
                        </svg>
                        <div className='flex relative'>
                          <div className='inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900'></div>
                        </div>
                      </Menu.Button>
                    </div>
                    <Notification />
                  </Menu>
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                          alt=''
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='/profile'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='/settings'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
      <Outlet />
    </>
  );
}
