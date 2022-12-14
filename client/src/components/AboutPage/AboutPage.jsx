import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <>
      <section className='text-gray-400 bg-gray-900 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-col text-center w-full mb-20'>
            <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-white'>
              Our Team
            </h1>
          </div>
          <div className='flex flex-wrap -m-2'>
            <div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
              <div className='h-full flex items-center border-gray-800 border p-4 rounded-lg'>
                <img
                  alt='team'
                  className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
                  src='https://avatars.githubusercontent.com/u/63368252?v=4'
                />
                <div className='flex-grow'>
                  <h2 className='text-white title-font font-medium'>
                    <a
                      href='https://github.com/mujibsayyad'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Mujib Sayyad
                    </a>
                  </h2>

                  <p className='text-gray-600'>Full-Stack Developer</p>
                </div>
              </div>
            </div>
            <div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
              <div className='h-full flex items-center border-gray-800 border p-4 rounded-lg'>
                <img
                  alt='team'
                  className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
                  src='https://avatars.githubusercontent.com/u/58269749?v=4'
                />
                <div className='flex-grow'>
                  <h2 className='text-white title-font font-medium'>
                    <a
                      href='https://github.com/BhavyaCodes'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Bhavya Tomar
                    </a>
                  </h2>
                  <p className='text-gray-600'>Full-Stack Developer</p>
                </div>
              </div>
            </div>
            <div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
              <div className='h-full flex items-center border-gray-800 border p-4 rounded-lg'>
                <img
                  alt='team'
                  className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
                  src='https://avatars.githubusercontent.com/u/54439226?v=4'
                />
                <div className='flex-grow'>
                  <h2 className='text-white title-font font-medium'>
                    <a
                      href='https://github.com/J4Web'
                      target='_blank'
                      rel='noreferrer'
                    >
                      JsEnthusiast
                    </a>
                  </h2>
                  <p className='text-gray-600'>Front-End Developer</p>
                </div>
              </div>
            </div>
            <div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
              <div className='h-full flex items-center border-gray-800 border p-4 rounded-lg'>
                <img
                  alt='team'
                  className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
                  src='https://avatars.githubusercontent.com/u/86143326?v=4'
                />
                <div className='flex-grow'>
                  <h2 className='text-white title-font font-medium'>
                    <a
                      href='https://github.com/The-flaSK'
                      target='_blank'
                      rel='noreferrer'
                    >
                      The_flaSK
                    </a>
                  </h2>
                  <p className='text-gray-600'>Back-End Developer</p>
                </div>
              </div>
            </div>
            <div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
              <div className='h-full flex items-center border-gray-800 border p-4 rounded-lg'>
                <img
                  alt='team'
                  className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
                  src='https://avatars.githubusercontent.com/u/68771813?v=4'
                />
                <div className='flex-grow'>
                  <h2 className='text-white title-font font-medium'>
                    <a
                      href='https://github.com/sailingwithsandeep'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Sandeep Parmar
                    </a>
                  </h2>
                  <p className='text-gray-600'>Back-End Developer</p>
                </div>
              </div>
            </div>
            <div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
              <div className='h-full flex items-center border-gray-800 border p-4 rounded-lg'>
                <img
                  alt='team'
                  className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
                  src='https://avatars.githubusercontent.com/u/41836849?v=4'
                />
                <div className='flex-grow'>
                  <h2 className='text-white title-font font-medium'>
                    <a
                      href='https://github.com/Deep-Ramani'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Deep Ramani
                    </a>
                  </h2>
                  <p className='text-gray-600'>Front-End Developer</p>
                </div>
              </div>
            </div>
            <div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
              <div className='h-full flex items-center border-gray-800 border p-4 rounded-lg'>
                <img
                  alt='team'
                  className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
                  src='https://dummyimage.com/100x90'
                />
                <div className='flex-grow'>
                  <h2 className='text-white title-font font-medium'>Unknown</h2>
                  <p className='text-gray-600'>QA Engineer</p>
                </div>
              </div>
            </div>
            <div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
              <div className='h-full flex items-center border-gray-800 border p-4 rounded-lg'>
                <img
                  alt='team'
                  className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
                  src='https://dummyimage.com/104x94'
                />
                <div className='flex-grow'>
                  <h2 className='text-white title-font font-medium'>Unknown</h2>
                  <p className='text-gray-600'>System</p>
                </div>
              </div>
            </div>
            <div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
              <div className='h-full flex items-center border-gray-800 border p-4 rounded-lg'>
                <img
                  alt='team'
                  className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
                  src='https://dummyimage.com/108x98'
                />
                <div className='flex-grow'>
                  <h2 className='text-white title-font font-medium'>Unknown</h2>
                  <p className='text-gray-600'>Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
