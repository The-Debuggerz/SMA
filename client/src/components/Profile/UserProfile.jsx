import React from 'react';
import { useSelector } from 'react-redux';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';

import {
  useGetProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../../Store/rtk';
import Loader from '../Loader/Loader';
import UserPost from '../UserPost/UserPost';

const UserProfile = () => {
  let { userbyname } = useParams();
  const { username: currentUser } = useSelector((state) => state.auth);

  const { data, error, isLoading, refetch } = useGetProfileQuery(userbyname);
  const [followUser] = useFollowUserMutation(userbyname);
  const [unfollowUser] = useUnfollowUserMutation(userbyname);

  const updateFollowHandler = async () => {
    await followUser(userbyname);
  };

  const updateUnFollowHandler = async () => {
    await unfollowUser(userbyname);
  };

  // To follow : unfollow user (toggle) button
  let toggleBtn = async () => {
    // console.log('🚀 data.followStatus', data.followStatus);
    if (data.followStatus) {
      await updateUnFollowHandler();
    } else {
      await updateFollowHandler();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className='text-center h-screen grid place-items-center'>
        <h1 className='text-4xl'>{error.data.message}</h1>
      </div>
    );
  }
  // console.log('data', data);

  return (
    <>
      {!isLoading && !error && (
        <div className='grid place-items-center'>
          <div className='h-4/4 w-11/12 bg-red-600 rounded-2xl py-12 my-12'>
            <div className='ml-4 flex items-center justify-evenly'>
              <div className='mr-2'>
                <img
                  className='rounded-full w-48 h-48'
                  src='https://images.hdqwalls.com/wallpapers/harley-quinn-vector-portrait-4m.jpg'
                  alt='logo'
                />
              </div>

              <div className='flex-col'>
                <div className='flex items-center'>
                  <div className='text-white '>
                    <h1 className='text-4xl'>
                      {data.user.name || 'The Debuggers'}
                    </h1>

                    <h3 className='text-xl cursor-pointer'>
                      {'@' + data.user.username}
                    </h3>
                  </div>

                  {data.user.username !== currentUser && (
                    <div className='flex ml-4 items-center justify-between mr-4'>
                      <div className='p-1 flex items-center justify-center mr-4'>
                        <button
                          className='ml-2 flex rounded-lg bg-yellow-400 p-2'
                          onClick={toggleBtn}
                        >
                          <UserPlusIcon
                            className='h-6 w-6 mr-1'
                            aria-hidden='true'
                          />
                          {data.followStatus ? 'Unfollow' : 'Follow'}
                        </button>
                      </div>
                    </div>
                  )}
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
                        <b>{data.user.following?.length || 0} </b>
                        Following
                      </span>
                    </button>
                  </div>

                  <div className='items-center justify-center ml-8'>
                    <button className='flex'>
                      <span className='text-xl'>
                        <b>{data.user.followers?.length || 0} </b>Followers
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='h-auto w-5/6 bg-red-600 rounded-2xl py-12 my-12'>
            {data?.postData?.length > 0 ? (
              data.postData.map((post) => {
                return (
                  <UserPost
                    key={post._doc._id}
                    id={post._doc._id}
                    name={data.user.name}
                    username={data.user.username}
                    text={post._doc.text}
                    time={post.time}
                  />
                );
              })
            ) : (
              <h1 className='text-center text-4xl'>No Post Found</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
