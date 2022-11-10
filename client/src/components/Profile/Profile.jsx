import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const userProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await res.json();
        // console.log(data);
        setUserData(data);

        if (res.status === 401) {
          throw new Error(res.error);
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };
    userProfile();
  }, []);

  return (
    <Fragment>
      <div className='main-profile grid place-items-center h-80vh'>
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
                <div className='profile-details flex items-center'>
                  <div className='profile-name text-white '>
                    <h1 className='text-4xl'>
                      {userData ? userData.name : 'The Debuggers'}
                    </h1>
                    <h3 className='text-xl cursor-pointer'>
                      {userData ? '@' + userData.username : 'The Debuggers'}
                    </h3>
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
                        <b>{userData.following?.length || 0} </b>Following
                      </span>
                    </button>
                  </div>

                  <div className='btnflex items-center justify-center ml-8'>
                    <button className='flex'>
                      <span className='text-xl'>
                        <b>{userData.followers?.length || 0} </b>Followers
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
