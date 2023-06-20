import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';

import Notification from '../Notification/Notification';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import Logout from '../Logout/Logout';
import logo from '../Logo/logo.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  let { isLoggedIn, username, picture } = useSelector((state) => state.auth);

  const userLogout = () => {
    <Logout />;
  };

  return (
    <>
      <Disclosure as='nav' className='bg-gray-800'>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
              <div className='relative flex h-16 items-center justify-between'>
                {isLoggedIn && (
                  <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                    <Link className='nav__item' to='/'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-8 h-8 text-white'
                      >
                        <path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z' />
                        <path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z' />
                      </svg>
                    </Link>
                  </div>
                )}
                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                  {/* <div className='flex flex-shrink-0 items-center'>
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
                  </div> */}
                  <div className='sm:ml-6'>
                    <div className='flex justify-start space-x-4 text-white'>
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
                          <Link
                            className='nav__item'
                            to={`/profile/${username}`}
                          >
                            <span className='nav__itemLineTwo'>Profile</span>
                          </Link>

                          <Link className='nav__item' to='/all-posts'>
                            <span className='nav__itemLineTwo'>All Posts</span>
                          </Link>
                          {/* <Link className='nav__item' to='/admin'>
                            <span className='nav__itemLineTwo'>Admin</span>
                          </Link> */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {isLoggedIn && (
                  <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                    {/* {
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
                    </Menu> */}
                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <span className='sr-only'>Open user menu</span>
                        {picture ? (
                          <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                            <img
                              className='h-8 w-8 rounded-full'
                              src={picture && picture}
                              alt=''
                            />
                          </Menu.Button>
                        ) : (
                          <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='currentColor'
                              className='w-8 h-8 text-white'
                            >
                              <path
                                fillRule='evenodd'
                                d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </Menu.Button>
                        )}
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
                              <Link
                                to={`/profile/${username}`}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='profile/settings'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/logout'
                                onClick={userLogout}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Logout
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
                <Link className='-mr-32 ml-8 text-white' to='/about'>
                  <span className='nav__itemLineTwo'>About Us</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </Disclosure>
      <Outlet />
    </>
  );
};

export default Navbar;
