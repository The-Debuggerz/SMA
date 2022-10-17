import React, { Fragment, useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const [count, setCount] = useState(0);

  const incCount = () => setCount((prev) => prev + 1);
  return (
    <Fragment>
      <div className='main-profile grid place-items-center'>
        <div className='user-profile h-4/4 m-4  w-11/12 bg-red-600 rounded-2xl py-12'>
          <div className='profile-info'>
            <div className='profile-info-2 ml-4 mt-4 flex items-center justify-evenly'>
              <div className='profile-img mr-2'>
                <img
                  className='rounded-full w-48 h-48'
                  src='https://images.hdqwalls.com/wallpapers/harley-quinn-vector-portrait-4m.jpg'
                  alt='logo'
                />
              </div>

              <div className='mujib flex-col'>
                <div className='profile-details flex items-center justify-center'>
                  <div className='profile-name text-white '>
                    <h1 className='text-4xl'>The Debuggers</h1>
                    <h3 className='text-xl'>CEO / Founder</h3>
                  </div>

                  <div className='user-options flex ml-4 items-center justify-between mr-4'>
                    <div className='btn p-1flex items-center justify-center mr-4'>
                      <button
                        onClick={incCount}
                        className='ml-2 flex rounded-lg bg-yellow-400 p-2'
                      >
                        <UserPlusIcon
                          className='h-6 w-6 mr-1'
                          aria-hidden='true'
                        />
                        Follow
                      </button>
                    </div>
                  </div>
                </div>

                <div className='profile-items flex mt-4'>
                  <div className='btn flex items-center justify-center'>
                    <button className='flex'>
                      <span className='text-xl'>
                        <b>0 </b>Post
                      </span>
                    </button>
                  </div>

                  <div className='btn flex items-center justify-center ml-8'>
                    <button className='flex'>
                      <span className='text-xl'>
                        <b>0 </b>Following
                      </span>
                    </button>
                  </div>

                  <div className='btnflex items-center justify-center ml-8'>
                    <button className='flex'>
                      <span className='text-xl'>
                        <b>{count} </b>Followers
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='user-profile-posts h-auto w-5/6 bg-red-600 rounded-2xl py-12'>
          <h1 className='text-center text-4xl'>No Post Found</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
