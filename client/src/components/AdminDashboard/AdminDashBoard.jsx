import React from 'react';

const AdminDashBoard = () => {
  return (
    <>
      <section className='text-gray-400 bg-gray-900 body-font grid place-items-center'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-col text-center w-full mb-20'>
            <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-white'>
              User Statistics
            </h1>
          </div>
          <div className='flex flex-wrap -m-4 text-center w-2/4'>
            <div className='p-4 md:w-2/4 sm:w-1/2 w-full'>
              <div className='border-2 border-gray-800 px-4 py-6 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  stroke='currentColor'
                  className='text-indigo-400 w-12 h-12 mb-3 inline-block'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
                  />
                </svg>

                <h2 className='title-font font-medium text-3xl text-white'>
                  0
                </h2>
                <p className='leading-relaxed'>New Users</p>
              </div>
            </div>
            <div className='p-4 md:w-2/4 sm:w-1/2 w-full'>
              <div className='border-2 border-gray-800 px-4 py-6 rounded-lg'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='text-indigo-400 w-12 h-12 mb-3 inline-block'
                  viewBox='0 0 24 24'
                >
                  <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2'></path>
                  <circle cx='9' cy='7' r='4'></circle>
                  <path d='M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75'></path>
                </svg>
                <h2 className='title-font font-medium text-3xl text-white'>
                  0
                </h2>
                <p className='leading-relaxed'>Total Users</p>
              </div>
            </div>
            <div className='p-4 md:w-2/4 sm:w-1/2 w-full'>
              <div className='border-2 border-gray-800 px-4 py-6 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  className='text-indigo-400 w-12 h-12 mb-3 inline-block'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'
                  />
                </svg>

                <h2 className='title-font font-medium text-3xl text-white'>
                  0
                </h2>
                <p className='leading-relaxed'>Posts</p>
              </div>
            </div>
            <div className='p-4 md:w-2/4 sm:w-1/2 w-full'>
              <div className='border-2 border-gray-800 px-4 py-6 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  stroke='currentColor'
                  className='text-indigo-400 w-12 h-12 mb-3 inline-block'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                  />
                </svg>

                <h2 className='title-font font-medium text-3xl text-white'>
                  0
                </h2>
                <p className='leading-relaxed'>Photos</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashBoard;
