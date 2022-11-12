import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import { followUser, unFollowUser, userprofile } from '../../Store/FollowSlice';

const UserProfile = () => {
  const {
    following,
    followers,
    followStatus,
    name,
    username,
    message,
    loading,
  } = useSelector((state) => state.follow);
  const dispatch = useDispatch();

  let { userbyname } = useParams();

  useEffect(() => {
    dispatch(userprofile(userbyname));
  }, []);

  // To follow : unfollow user (toggle) button
  let toggleBtn = () => {
    if (followStatus) {
      dispatch(unFollowUser(userbyname));
    } else {
      dispatch(followUser(userbyname));
    }
  };

  console.log('message', message);
  console.log('loading', loading);
  return (
    <>
      {message && (
        <div className='grid place-items-center h-80per'>
          <h1>{message.slice(7)}</h1>
        </div>
      )}
      {!loading && !message && (
        <div className='grid place-items-center h-full -mt-4'>
          <div className='h-4/4 w-11/12 bg-red-600 rounded-2xl py-12'>
            <div className='profile-info'>
              <div className='ml-4 flex items-center justify-evenly'>
                <div className='mr-2'>
                  <img
                    className='rounded-full w-48 h-48'
                    src='https://images.hdqwalls.com/wallpapers/harley-quinn-vector-portrait-4m.jpg'
                    alt='logo'
                  />
                </div>

                <div className='flex-col'>
                  <div className='flex items-center justify-center'>
                    <div className='text-white '>
                      <h1 className='text-4xl'>{name || 'The Debuggers'}</h1>

                      <h3 className='text-xl cursor-pointer'>
                        {'@' + username}
                      </h3>
                    </div>

                    <div className='flex ml-4 items-center justify-between mr-4'>
                      <div className='btn p-1 flex items-center justify-center mr-4'>
                        <button
                          className='ml-2 flex rounded-lg bg-yellow-400 p-2'
                          onClick={() => toggleBtn()}
                        >
                          <UserPlusIcon
                            className='h-6 w-6 mr-1'
                            aria-hidden='true'
                          />
                          {followStatus ? 'Unfollow' : 'Follow'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className='flex mt-4'>
                    <div className='flex items-center justify-center'>
                      <button className='flex'>
                        <span className='text-xl'>
                          <b>0 </b>Post
                        </span>
                      </button>
                    </div>

                    <div className='flex items-center justify-center ml-8'>
                      <button className='flex'>
                        <span className='text-xl'>
                          <b>{following?.length || 0} </b>Following
                        </span>
                      </button>
                    </div>

                    <div className='items-center justify-center ml-8'>
                      <button className='flex'>
                        <span className='text-xl'>
                          <b>{followers?.length || 0} </b>Followers
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='h-auto w-5/6 bg-red-600 rounded-2xl py-12'>
            <h1 className='text-center text-4xl'>No Post Found</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
