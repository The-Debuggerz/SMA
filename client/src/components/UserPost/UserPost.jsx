import React, { useState } from 'react';
import './UserPost.css';

const UserPost = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleClick = () => {
    // console.log('🚀', e.target.id);
    setShowDropDown((current) => !current);
  };

  return (
    <>
      <div className='container' key={props.id}>
        <div className='feed'>
          <div className='profile'>
            <div className='profile-feed'>
              <div className='profile-info'>
                <div className='profile-img'>
                  <img src='' alt='' />
                </div>

                <div className='profile-name'>
                  <a href={`/profile/${props.username}`}>
                    <h3>{props.name}</h3>
                  </a>
                  <h6>{props.time}</h6>
                </div>
              </div>

              <div className='dropdownmenu' onClick={handleClick}>
                <svg
                  id={props.id}
                  className='dropbutton p-4'
                  viewBox='0 0 22 6'
                  preserveAspectRatio='xMinYMin meet'
                >
                  <path d='M19,6c-1.657,0-3-1.344-3-3c0-1.656,1.343-3,3-3s3,1.344,3,3C22,4.656,20.657,6,19,6z M19,2c-0.553,0-1,0.447-1,1c0,0.552,0.447,1,1,1c0.552,0,1-0.449,1-1C20,2.447,19.552,2,19,2z M11,6C9.343,6,8,4.656,8,3c0-1.656,1.343-3,3-3s3,1.344,3,3C14,4.656,12.657,6,11,6z M11,2c-0.553,0-1,0.447-1,1c0,0.552,0.447,1,1,1c0.552,0,1-0.449,1-1C12,2.447,11.552,2,11,2z M3,6C1.343,6,0,4.656,0,3c0-1.656,1.343-3,3-3c1.656,0,3,1.344,3,3C6,4.656,4.656,6,3,6z M3,2C2.447,2,2,2.447,2,3c0,0.552,0.447,1,1,1c0.552,0,1-0.449,1-1C4,2.447,3.552,2,3,2z'></path>
                </svg>

                {showDropDown && (
                  <div id='Dropdown' className='dropdownmenu-content p-3'>
                    <a href='/edit-post/posts._id?edit=true'>Edit Post</a>
                    <form className='ml-3' action='/delete-post' method='POST'>
                      <input type='hidden' value='posts._id' name='postId' />
                      <button className='btn' type='submit'>
                        Delete
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
            <div className='content'>
              <h1>{props.text}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPost;
